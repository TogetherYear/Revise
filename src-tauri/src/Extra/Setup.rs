use tauri::App;

use super::Serve;

pub fn Init(app: &mut App) -> Result<(), Box<dyn std::error::Error>> {
    Serve::CreateStaticFileServe(app);
    Ok(())
}
