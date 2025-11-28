import Capacitor
import CloudKit

@objc(iCloudSyncPlugin)
public class iCloudSyncPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "iCloudSyncPlugin"
    public let jsName = "iCloudSync"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "isAvailable", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "saveData", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "loadData", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "deleteData", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "syncAll", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getLastSyncTime", returnType: CAPPluginReturnPromise)
    ]
    
    private let container = CKContainer(identifier: "iCloud.com.gospelapp.shared")
    private let recordType = "UserData"
    
    // MARK: - Check iCloud Availability
    @objc func isAvailable(_ call: CAPPluginCall) {
        container.accountStatus { status, error in
            if let error = error {
                call.reject("iCloud error: \(error.localizedDescription)")
                return
            }
            
            let available = status == .available
            call.resolve([
                "available": available,
                "status": self.accountStatusString(status)
            ])
        }
    }
    
    // MARK: - Save Data to iCloud
    @objc func saveData(_ call: CAPPluginCall) {
        guard let key = call.getString("key"),
              let value = call.getString("value") else {
            call.reject("Missing key or value")
            return
        }
        
        let database = container.privateCloudDatabase
        let recordID = CKRecord.ID(recordName: key)
        
        // Fetch existing record or create new
        database.fetch(withRecordID: recordID) { [weak self] existingRecord, error in
            let record: CKRecord
            if let existing = existingRecord {
                record = existing
            } else {
                record = CKRecord(recordType: self?.recordType ?? "UserData", recordID: recordID)
            }
            
            record["data"] = value as CKRecordValue
            record["lastModified"] = Date() as CKRecordValue
            record["deviceId"] = UIDevice.current.identifierForVendor?.uuidString as CKRecordValue?
            
            database.save(record) { savedRecord, saveError in
                if let saveError = saveError {
                    call.reject("Save failed: \(saveError.localizedDescription)")
                    return
                }
                
                // Update last sync time
                UserDefaults.standard.set(Date().timeIntervalSince1970, forKey: "lastICloudSync")
                
                call.resolve([
                    "success": true,
                    "key": key,
                    "timestamp": Date().timeIntervalSince1970
                ])
            }
        }
    }
    
    // MARK: - Load Data from iCloud
    @objc func loadData(_ call: CAPPluginCall) {
        guard let key = call.getString("key") else {
            call.reject("Missing key")
            return
        }
        
        let database = container.privateCloudDatabase
        let recordID = CKRecord.ID(recordName: key)
        
        database.fetch(withRecordID: recordID) { record, error in
            if let error = error as? CKError, error.code == .unknownItem {
                // Record doesn't exist
                call.resolve([
                    "found": false,
                    "key": key
                ])
                return
            }
            
            if let error = error {
                call.reject("Load failed: \(error.localizedDescription)")
                return
            }
            
            guard let record = record,
                  let data = record["data"] as? String else {
                call.resolve([
                    "found": false,
                    "key": key
                ])
                return
            }
            
            let lastModified = (record["lastModified"] as? Date)?.timeIntervalSince1970 ?? 0
            
            call.resolve([
                "found": true,
                "key": key,
                "value": data,
                "lastModified": lastModified
            ])
        }
    }
    
    // MARK: - Delete Data from iCloud
    @objc func deleteData(_ call: CAPPluginCall) {
        guard let key = call.getString("key") else {
            call.reject("Missing key")
            return
        }
        
        let database = container.privateCloudDatabase
        let recordID = CKRecord.ID(recordName: key)
        
        database.delete(withRecordID: recordID) { deletedRecordID, error in
            if let error = error as? CKError, error.code == .unknownItem {
                // Already deleted
                call.resolve(["success": true, "key": key])
                return
            }
            
            if let error = error {
                call.reject("Delete failed: \(error.localizedDescription)")
                return
            }
            
            call.resolve(["success": true, "key": key])
        }
    }
    
    // MARK: - Sync All Data
    @objc func syncAll(_ call: CAPPluginCall) {
        // Keys to sync
        let syncKeys = ["bookmarks", "notes", "readingProgress", "settings", "streakData", "triviaStats"]
        
        let database = container.privateCloudDatabase
        var results: [[String: Any]] = []
        let dispatchGroup = DispatchGroup()
        
        for key in syncKeys {
            dispatchGroup.enter()
            
            let recordID = CKRecord.ID(recordName: key)
            database.fetch(withRecordID: recordID) { record, error in
                if let record = record, let data = record["data"] as? String {
                    let lastModified = (record["lastModified"] as? Date)?.timeIntervalSince1970 ?? 0
                    results.append([
                        "key": key,
                        "found": true,
                        "value": data,
                        "lastModified": lastModified
                    ])
                } else {
                    results.append([
                        "key": key,
                        "found": false
                    ])
                }
                dispatchGroup.leave()
            }
        }
        
        dispatchGroup.notify(queue: .main) {
            UserDefaults.standard.set(Date().timeIntervalSince1970, forKey: "lastICloudSync")
            
            call.resolve([
                "success": true,
                "data": results,
                "timestamp": Date().timeIntervalSince1970
            ])
        }
    }
    
    // MARK: - Get Last Sync Time
    @objc func getLastSyncTime(_ call: CAPPluginCall) {
        let lastSync = UserDefaults.standard.double(forKey: "lastICloudSync")
        call.resolve([
            "timestamp": lastSync,
            "hasSync": lastSync > 0
        ])
    }
    
    // MARK: - Helpers
    private func accountStatusString(_ status: CKAccountStatus) -> String {
        switch status {
        case .available: return "available"
        case .noAccount: return "noAccount"
        case .restricted: return "restricted"
        case .couldNotDetermine: return "couldNotDetermine"
        case .temporarilyUnavailable: return "temporarilyUnavailable"
        @unknown default: return "unknown"
        }
    }
}
