import Foundation
import StoreKit
import Capacitor

@objc(StoreKitBridge)
public class StoreKitBridge: CAPPlugin {

  private var products: [Product] = []

  // MARK: - JS API

  // loadProducts({ productIds: string[] })
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

  // purchase({ productId: string })
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
          let transaction: Transaction = try verify(verification)
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

  // restore()
  @objc func restore(_ call: CAPPluginCall) {
    Task {
      do {
        try await AppStore.sync()
        let active = try await currentEntitlements()
        call.resolve(["entitlements": active])
      } catch {
        call.reject("restore failed: \(error.localizedDescription)")
      }
    }
  }

  // getEntitlements()
  @objc func getEntitlements(_ call: CAPPluginCall) {
    Task {
      do {
        let active = try await currentEntitlements()
        call.resolve(["entitlements": active])
      } catch {
        call.reject("getEntitlements failed: \(error.localizedDescription)")
      }
    }
  }

  // presentOfferCodeRedemption()
  @objc func presentOfferCodeRedemption(_ call: CAPPluginCall) {
    DispatchQueue.main.async {
      if #available(iOS 16.0, *) {
        Task {
          do {
            guard let scene = UIApplication.shared.connectedScenes.first as? UIWindowScene else {
              call.reject("No window scene available")
              return
            }
            try await AppStore.presentOfferCodeRedeemSheet(in: scene)
            call.resolve(["status": "presented"])
          } catch {
            call.reject("presentOfferCodeRedemption failed: \(error.localizedDescription)")
          }
        }
      } else if #available(iOS 14.0, *) {
        SKPaymentQueue.default().presentCodeRedemptionSheet()
        call.resolve(["status": "presented"])
      } else {
        call.reject("Offer code redemption requires iOS 14.0 or later")
      }
    }
  }

  // MARK: - Helpers

  /// Verifies a StoreKit 2 VerificationResult and returns the verified payload or throws.
  private func verify<T>(_ result: VerificationResult<T>) throws -> T {
    switch result {
    case .unverified(_, let error):
      throw error
    case .verified(let safe):
      return safe
    }
  }

  /// Returns an array of currently active entitlements (transactions),
  /// including expiration and revocation metadata where applicable.
  private func currentEntitlements() async throws -> [[String: Any]] {
    var out: [[String: Any]] = []
    for await ent in Transaction.currentEntitlements {
      let t: Transaction = try verify(ent)
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

  // Listen for new transactions and finish them so your JS can re-fetch entitlements
  public override func load() {
    Task.detached { [weak self] in
      for await update in Transaction.updates {
        do {
          let t: Transaction = try self?.verify(update) ?? { throw NSError(domain: "verifyNil", code: -1) }()
          await t.finish()
          // If you want, you can notify JS here:
          // self?.notifyListeners("storekitUpdate", data: ["productId": t.productID])
        } catch {
          // swallow; JS will call getEntitlements() on next app resume or UI action
        }
      }
    }
  }
}
