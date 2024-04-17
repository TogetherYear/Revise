use tauri::command;

#[command]
pub fn GetWallpaper() -> String {
    wallpaper::get().unwrap()
}

#[command]
pub fn SetWallpaper(path: String, mode: u32) {
    wallpaper::set_from_path(path.as_str()).unwrap();
    wallpaper::set_mode(TransformMode(mode)).unwrap();
}

fn TransformMode(mode: u32) -> wallpaper::Mode {
    match mode {
        0 => wallpaper::Mode::Center,
        1 => wallpaper::Mode::Crop,
        2 => wallpaper::Mode::Fit,
        3 => wallpaper::Mode::Span,
        4 => wallpaper::Mode::Stretch,
        5 => wallpaper::Mode::Tile,
        _ => wallpaper::Mode::Crop,
    }
}
