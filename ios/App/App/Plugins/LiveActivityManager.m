#import <Capacitor/Capacitor.h>

CAP_PLUGIN(LiveActivityManagerPlugin, "LiveActivityManagerPlugin",
    CAP_PLUGIN_METHOD(startCountdown, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(updateCountdown, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(stopCountdown, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(isLiveActivitySupported, CAPPluginReturnPromise);
)
