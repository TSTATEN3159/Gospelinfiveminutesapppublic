import Foundation
import Capacitor

@objc(TestFlightFlag)
public class TestFlightFlag: CAPPlugin {
  @objc func isTestFlight(_ call: CAPPluginCall) {
    let isTF = Bundle.main.appStoreReceiptURL?.lastPathComponent == "sandboxReceipt"
    call.resolve(["isTestFlight": isTF])
  }
}
