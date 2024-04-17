use crate::Addon::Automatic::GetMousePosition;
use image;
use tauri::{command, AppHandle, Icon, Manager, PhysicalPosition, SystemTray, SystemTrayEvent};

pub fn Build() -> SystemTray {
    SystemTray::new().with_tooltip("去码头整点薯条")
}

pub fn OnEvent(app: &AppHandle, event: SystemTrayEvent) {
    match event {
        SystemTrayEvent::DoubleClick {
            position: _,
            size: _,
            ..
        } => {
            let window = app.get_window("Application").unwrap();
            if window.is_minimized().unwrap() {
                window.unminimize().unwrap();
            } else {
                window.show().unwrap();
            }
            window.set_focus().unwrap();
        }
        SystemTrayEvent::RightClick {
            position: _,
            size: _,
            ..
        } => {
            let window = app.get_window("Tray").unwrap();
            let point = GetMousePosition();
            let size = window.inner_size().unwrap();
            window
                .set_position(PhysicalPosition::new(
                    (point.x as u32) - size.width + 2,
                    (point.y as u32) - size.height + 2,
                ))
                .unwrap();
            window.set_always_on_top(true).unwrap();
            window.show().unwrap();
            window.set_focus().unwrap();
        }
        _ => {}
    }
}

#[command]
pub fn SetTrayIcon(icon: String, app_handle: tauri::AppHandle) {
    let r = image::open(icon).unwrap();
    app_handle
        .tray_handle()
        .set_icon(Icon::Rgba {
            rgba: r.as_rgba8().unwrap().to_vec(),
            width: r.width(),
            height: r.height(),
        })
        .unwrap();
}

#[command]
pub fn SetTrayTooltip(tooltip: String, app_handle: tauri::AppHandle) {
    app_handle
        .tray_handle()
        .set_tooltip(tooltip.as_str())
        .unwrap();
}
