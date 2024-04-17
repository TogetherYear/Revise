use tauri::{AppHandle, RunEvent};

pub fn Run(_app: &AppHandle, event: RunEvent) {
    match event {
        RunEvent::ExitRequested { .. } => {}
        _ => {}
    }
}
