#import <Capacitor/Capacitor.h>

CAP_PLUGIN(SiriShortcutsPlugin, "SiriShortcuts",
    CAP_PLUGIN_METHOD(donateShortcut, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(presentShortcut, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(getVoiceShortcuts, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(deleteShortcut, CAPPluginReturnPromise);
)
