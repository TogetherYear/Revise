use serde::{Deserialize, Serialize};

use tauri::command;

use enigo::{Enigo, KeyboardControllable, MouseControllable};

#[command]
pub fn GetMousePosition() -> Point {
    let e = Enigo::new();
    let t = e.mouse_location();
    Point::New(t.0, t.1)
}

#[command]
pub fn SetMousePosition(x: i32, y: i32) {
    let mut e = Enigo::new();
    e.mouse_move_to(x, y);
}

#[command]
pub fn SetButtonClick(button: u32) {
    let mut e = Enigo::new();
    match button {
        0 => e.mouse_click(enigo::MouseButton::Left),
        1 => e.mouse_click(enigo::MouseButton::Middle),
        _ => e.mouse_click(enigo::MouseButton::Right),
    }
}

#[command]
pub fn SetButtonToggle(button: u32, down: bool) {
    let mut e = Enigo::new();
    let target = match button {
        0 => enigo::MouseButton::Left,
        1 => enigo::MouseButton::Middle,
        _ => enigo::MouseButton::Right,
    };
    match down {
        true => e.mouse_down(target),
        false => e.mouse_up(target),
    }
}

#[command]
pub fn SetMouseScroll(direction: u32, clicks: i32) {
    let mut e = Enigo::new();
    match direction {
        0 => e.mouse_scroll_y(clicks),
        _ => e.mouse_scroll_y(-clicks),
    }
}

#[command]
pub fn GetColorFromPosition(x: i32, y: i32) -> Color {
    let monitor = xcap::Monitor::from_point(x, y).unwrap();
    let capture = monitor.capture_image().unwrap();
    let pixel = capture.get_pixel_checked(
        ((x as i32) - monitor.x()) as u32,
        ((y as i32) - monitor.y()) as u32,
    );
    match pixel {
        Some(color) => Color::New(color.0[0], color.0[1], color.0[2], color.0[3]),
        None => Color::Default(),
    }
}

#[command]
pub fn GetCurrentPositionColor() -> Color {
    let e = Enigo::new();
    let point = e.mouse_location();
    GetColorFromPosition(point.0, point.1)
}

#[command]
pub fn WriteText(content: String, paste: bool) {
    let mut e = Enigo::new();
    match paste {
        true => {
            e.key_down(enigo::Key::Control);
            e.key_click(enigo::Key::V);
            e.key_up(enigo::Key::Control);
        }
        false => e.key_sequence(content.as_str()),
    }
}

#[command]
pub fn SetKeysToggle(toggleKeys: Vec<ToggleKey>) {
    let mut e = Enigo::new();
    for toggleKey in toggleKeys {
        match toggleKey.down {
            true => e.key_down(TransformKey(toggleKey.key)),
            false => e.key_up(TransformKey(toggleKey.key)),
        }
    }
}

#[command]
pub fn SetKeysClick(keys: Vec<u32>) {
    let mut e = Enigo::new();
    for key in keys {
        e.key_click(TransformKey(key));
    }
}

fn TransformKey(key: u32) -> enigo::Key {
    match key {
        0 => enigo::Key::Num0,
        1 => enigo::Key::Num1,
        2 => enigo::Key::Num2,
        3 => enigo::Key::Num3,
        4 => enigo::Key::Num4,
        5 => enigo::Key::Num5,
        6 => enigo::Key::Num6,
        7 => enigo::Key::Num7,
        8 => enigo::Key::Num8,
        9 => enigo::Key::Num9,
        10 => enigo::Key::A,
        11 => enigo::Key::B,
        12 => enigo::Key::C,
        13 => enigo::Key::D,
        14 => enigo::Key::E,
        15 => enigo::Key::F,
        16 => enigo::Key::G,
        17 => enigo::Key::H,
        18 => enigo::Key::I,
        19 => enigo::Key::J,
        20 => enigo::Key::K,
        21 => enigo::Key::L,
        22 => enigo::Key::M,
        23 => enigo::Key::N,
        24 => enigo::Key::O,
        25 => enigo::Key::P,
        26 => enigo::Key::Q,
        27 => enigo::Key::R,
        28 => enigo::Key::S,
        29 => enigo::Key::T,
        30 => enigo::Key::U,
        31 => enigo::Key::V,
        32 => enigo::Key::W,
        33 => enigo::Key::X,
        34 => enigo::Key::Y,
        35 => enigo::Key::Z,
        36 => enigo::Key::Add,
        37 => enigo::Key::Subtract,
        38 => enigo::Key::Multiply,
        39 => enigo::Key::Divide,
        40 => enigo::Key::OEM2,
        41 => enigo::Key::Tab,
        42 => enigo::Key::CapsLock,
        43 => enigo::Key::Shift,
        44 => enigo::Key::Control,
        45 => enigo::Key::Alt,
        46 => enigo::Key::Space,
        47 => enigo::Key::Backspace,
        48 => enigo::Key::Return,
        49 => enigo::Key::Escape,
        50 => enigo::Key::UpArrow,
        51 => enigo::Key::DownArrow,
        52 => enigo::Key::LeftArrow,
        53 => enigo::Key::RightArrow,
        _ => enigo::Key::T,
    }
}

#[derive(Clone, serde::Serialize)]
pub struct Point {
    pub x: i32,
    pub y: i32,
}

impl Point {
    pub fn New(x: i32, y: i32) -> Point {
        Point { x, y }
    }
}

#[derive(Clone, serde::Serialize)]
pub struct Color {
    r: u8,
    g: u8,
    b: u8,
    a: u8,
}

impl Color {
    pub fn New(r: u8, g: u8, b: u8, a: u8) -> Color {
        Color { r, g, b, a }
    }

    pub fn Default() -> Color {
        Color {
            r: 0,
            g: 0,
            b: 0,
            a: 0,
        }
    }
}

#[derive(Serialize, Deserialize)]
pub struct ToggleKey {
    key: u32,
    down: bool,
}
