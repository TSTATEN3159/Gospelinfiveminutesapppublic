import Foundation
import StoreKit
import Capacitor

@objc(StoreKitBridge)
public class StoreKitBridge: CAPPlugin {

  private var products: [Product] = []

  @objc func loadProducts(_ call: CAPPluginCall) {
    guard let ids = call.getArray("productIds", String.self), !ids.isEmpty else {
      call.reject("Missing productIds"); return
    }
    Task {
      do {
        let fetched = try await Product.products(for: ids)
        self.products = fetched
        let result = fetched.map { p in [
          "id": p.id,
          "displayName": p.displayName,
          "description": p.description,
          "price": p.displayPrice,
          "type": p.type == .autoRenewable ? "autoRenewable" :
                   (p.type == .nonConsumable ? "nonConsumable" :
                    (p.type == .nonRenewable ? "nonRenewable" : "consumable"))
        ] }
        call.resolve(["products": result])
      } catch {
        call.reject("loadProducts failed: \(error.localizedDescription)")
      }
    }
  }

  @objc func purchase(_ call: CAPPluginCall) {
    let productId = call.getString("productId") ?? ""
    guard let product = products.first(where: { $0.id == productId }) else {
      call.reject("Unknown productId \(productId). Call loadProducts first."); return
    }
    Task {
      do {
        let result = try await product.purchase()
        switch result {
        case .success(let verification):
          let transaction = try self.verify(verification)
          await transaction.finish()
          call.resolve(["status": "success", "productId": productId])
        case .userCancelled:
          call.resolve(["status": "cancelled"])
        case .pending:
          call.resolve(["status": "pending"])
        @unknown default:
          call.resolve(["status": "unknown"])
        }
      } catch {
        call.reject("purchase failed: \(error.localizedDescription)")
      }
    }
  }

  @objc func restore(_ call: CAPPluginCall) {
    Task {
      do {
        try await AppStore.sync()
        let active = try await self.currentEntitlements()
        call.resolve(["entitlements": active])
      } catch {
        call.reject("restore failed: \(error.localizedDescription)")
      }
    }
  }

  @objc func getEntitlements(_ call: CAPPluginCall) {
    Task {
      do {
        let active = try await self.currentEntitlements()
        call.resolve(["entitlements": active])
      } catch {
        call.reject("getEntitlements failed: \(error.localizedDescription)")
      }
    }
  }

  // MARK: helpers

  private func verify<T>(_ result: VerificationResult<T>) throws -> T {
    switch result {
    case .unverified(_, let error): throw error
    case .verified(let safe): return safe
    }
  }

  private func currentEntitlements() async throws -> [[String: Any]] {
    var out: [[String: Any]] = []
    for await ent in Transaction.currentEntitlements {
      let t = try verify(ent)
      out.append([
        "productId": t.productID,
        "revocationDate": t.revocationDate?.timeIntervalSince1970 as Any,
        "expirationDate": t.expirationDate?.timeIntervalSince1970 as Any,
        "isUpgraded": t.isUpgraded,
        "ownershipType": t.ownershipType == .familyShared ? "familyShared" : "purchased"
      ])
    }
    return out
  }

  public override func load() {
    Task.detached { [weak self] in
      for await update in Transaction.updates {
        do {
          let t = try self?.verify(update)
          await t?.finish()
        } catch { /* ignore */ }
      }
    }
  }
}
