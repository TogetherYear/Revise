use tauri::GlobalWindowEvent;

pub fn OnWindowEvent(e: GlobalWindowEvent) {
    match e.event() {
        tauri::WindowEvent::CloseRequested { .. } => {}
        _ => {}
    }
}
