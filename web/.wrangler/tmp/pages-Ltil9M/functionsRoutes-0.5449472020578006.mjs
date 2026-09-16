import { onRequestPost as __api_render_js_onRequestPost } from "/home/hassan/.gemini/antigravity/scratch/DARE/web/functions/api/render.js"

export const routes = [
    {
      routePath: "/api/render",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_render_js_onRequestPost],
    },
  ]