import {
    create,
    NConfigProvider,
    NMessageProvider,
    NDialogProvider,
    NNotificationProvider,
    GlobalThemeOverrides,
    darkTheme
} from 'naive-ui'

/**
 * components
 */
const naive = create({
    components: [
        NConfigProvider,
        NMessageProvider,
        NDialogProvider,
        NNotificationProvider,
    ]
})

/**
 * theme
 */
const themeOverrides: GlobalThemeOverrides = {
    common: {
        primaryColor: '#333333',
        primaryColorHover: '#333333',
        primaryColorPressed: '#333333',
    },
    Message: darkTheme.Message,
    Dialog: darkTheme.Dialog,
    Notification: darkTheme.Notification,
}

export { naive, themeOverrides }