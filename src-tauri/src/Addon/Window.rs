use image::ImageFormat;
use tauri::command;

use super::Monitor::Monitor;

#[command]
pub fn GetAllWindows() -> Vec<Window> {
    let windows = xcap::Window::all().unwrap();
    let mut ws: Vec<Window> = vec![];
    for window in windows.iter() {
        ws.push(Window::New(window));
    }
    ws
}

#[command]
pub fn CaptureWindow(id: u32, path: String) -> bool {
    let windows = xcap::Window::all().unwrap();
    for w in windows.iter() {
        if w.id() == id && !w.is_minimized() {
            let buffer = w.capture_image().unwrap();
            buffer.save_with_format(path, ImageFormat::WebP).unwrap();
            return true;
        }
    }
    false
}

#[command]
pub fn GetWindowCurrentMonitor(id: u32) -> Monitor {
    let windows = xcap::Window::all().unwrap();
    for w in windows.iter() {
        if w.id() == id {
            return Monitor::New(&w.current_monitor());
        }
    }
    Monitor::Default()
}

#[derive(Clone, serde::Serialize)]
pub struct Window {
    pub id: u32,
    pub title: String,
    pub appName: String,
    pub x: i32,
    pub y: i32,
    pub width: u32,
    pub height: u32,
    pub isMinimized: bool,
    pub isMaximized: bool,
    pub monitor: Monitor,
}

impl Window {
    pub fn New(w: &xcap::Window) -> Window {
        Window {
            id: w.id(),
            title: w.title().to_string(),
            appName: w.app_name().to_string(),
            x: w.x(),
            y: w.y(),
            width: w.width(),
            height: w.height(),
            isMinimized: w.is_minimized(),
            isMaximized: w.is_maximized(),
            monitor: Monitor::New(&w.current_monitor()),
        }
    }
}
