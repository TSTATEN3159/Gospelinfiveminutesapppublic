#import <Capacitor/Capacitor.h>

CAP_PLUGIN(iCloudSyncPlugin, "iCloudSync",
    CAP_PLUGIN_METHOD(isAvailable, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(saveData, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(loadData, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(deleteData, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(syncAll, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(getLastSyncTime, CAPPluginReturnPromise);
)
