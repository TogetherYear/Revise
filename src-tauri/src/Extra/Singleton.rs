use serde_json::json;

use tauri::{AppHandle, Manager};

use super::TauriSendRendererPayload;

pub fn OnSecondInstance(app: &AppHandle, _argv: Vec<String>, _cwd: String) {
    let window = app.get_window("Application").unwrap();
    if window.is_minimized().unwrap() {
        window.unminimize().unwrap();
    } else {
        window.show().unwrap();
    }
    window.set_focus().unwrap();
    app.emit_all(
        "tauri://tauri",
        TauriSendRendererPayload {
            event: String::from("SecondInstance"),
            extra: json!({}),
        },
    )
    .unwrap();
}
