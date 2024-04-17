use image::ImageFormat;
use tauri::command;

use super::Automatic::GetMousePosition;

#[command]
pub fn GetAllMonitors() -> Vec<Monitor> {
    let monitors = xcap::Monitor::all().unwrap();
    let mut ms: Vec<Monitor> = vec![];
    for monitor in monitors.iter() {
        ms.push(Monitor::New(monitor));
    }
    ms
}

#[command]
pub fn GetMonitorFromPoint(x: i32, y: i32) -> Monitor {
    Monitor::New(&xcap::Monitor::from_point(x, y).unwrap())
}

#[command]
pub fn GetCurrentMouseMonitor() -> Monitor {
    let point = GetMousePosition();
    Monitor::New(&xcap::Monitor::from_point(point.x as i32, point.y as i32).unwrap())
}

#[command]
pub fn GetPrimaryMonitor() -> Monitor {
    let monitors = xcap::Monitor::all().unwrap();
    for m in monitors.iter() {
        if m.is_primary() {
            return Monitor::New(m);
        }
    }
    Monitor::Default()
}

#[command]
pub fn CaptureMonitor(id: u32, path: String) -> bool {
    let monitors = xcap::Monitor::all().unwrap();
    for m in monitors.iter() {
        if m.id() == id {
            let buffer = m.capture_image().unwrap();
            buffer.save_with_format(path, ImageFormat::WebP).unwrap();
            return true;
        }
    }
    false
}

#[derive(Clone, serde::Serialize)]
pub struct Monitor {
    pub id: u32,
    pub name: String,
    pub x: i32,
    pub y: i32,
    pub width: u32,
    pub height: u32,
    pub rotation: f32,
    pub scaleFactor: f32,
    pub frequency: f32,
    pub isPrimary: bool,
}

impl Monitor {
    pub fn New(m: &xcap::Monitor) -> Monitor {
        Monitor {
            id: m.id(),
            name: m.name().to_string(),
            x: m.x(),
            y: m.y(),
            width: m.width(),
            height: m.height(),
            rotation: m.rotation(),
            scaleFactor: m.scale_factor(),
            frequency: m.frequency(),
            isPrimary: m.is_primary(),
        }
    }

    pub fn Default() -> Monitor {
        Monitor {
            id: 0,
            name: String::from(""),
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            rotation: 0.,
            scaleFactor: 0.,
            frequency: 0.,
            isPrimary: false,
        }
    }
}
