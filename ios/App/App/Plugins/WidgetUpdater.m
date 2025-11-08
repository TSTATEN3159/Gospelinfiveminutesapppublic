#import <Capacitor/Capacitor.h>

CAP_PLUGIN(WidgetUpdaterPlugin, "WidgetUpdaterPlugin",
    CAP_PLUGIN_METHOD(updateDailyVerse, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(scheduleNextUpdate, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(getWidgetData, CAPPluginReturnPromise);
)
