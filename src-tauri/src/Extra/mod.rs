pub mod App;
pub mod Serve;
pub mod Setup;
pub mod Singleton;
pub mod Tray;
pub mod Window;

#[derive(Clone, serde::Serialize)]
pub struct TauriSendRendererPayload {
    pub event: String,
    pub extra: serde_json::Value,
}
