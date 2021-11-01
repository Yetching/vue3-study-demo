import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'

// createApp(App).mount('#app')

async function bootstrap() {
  const app = createApp(App)

  setupRouter(app)

  app.mount('#app')
}

bootstrap()