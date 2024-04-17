/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  /**
   * 项目名称
   */
  readonly VITE_APP_NAME: string
  /**
   * 服务器端端口
   */
  readonly VITE_APP_SERVER_PORT: string
  /**
   * 服务器WebSocket端口
   */
  readonly VITE_APP_SERVER_WS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}