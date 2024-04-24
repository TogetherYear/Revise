use serde_json::json;

use tauri::{AppHandle, Manager};

use super::TauriSendRendererPayload;

pub fn OnSecondInstance(app: &AppHandle, _argv: Vec<String>, _cwd: String) {
    app.emit_all(
        "tauri://tauri",
        TauriSendRendererPayload {
            event: String::from("SecondInstance"),
            extra: json!({}),
        },
    )
    .unwrap();
}
