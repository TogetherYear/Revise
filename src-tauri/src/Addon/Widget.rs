use tauri::command;
use window_shadows::set_shadow;

#[command]
pub fn SetShadow(window: tauri::Window, enable: bool) {
    set_shadow(&window, enable).unwrap();
}
