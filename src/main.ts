import { createApp } from 'vue'

import AppVue from './App.vue'

import router from './router'

import { naive } from './naive'

import { Debug } from './plugins/Debug'
Debug.Instance.Run()

import { FieldObserver } from './plugins/FieldObserver'
FieldObserver.Instance.Run()

import { Renderer } from './plugins/Renderer'
await Renderer.Instance.Run()

createApp(AppVue)
  .use(router)
  .use(naive)
  .mount('#app')
