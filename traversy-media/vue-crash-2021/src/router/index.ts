import { createRouter, createWebHistory } from "vue-router"

import Home from "../views/Home.vue"
import About from "../views/About.vue"

const routes = [
  { path: "/about", name: "about", component: About },
  { path: "/",      name: "home",  component: Home  }
]

const history = createWebHistory()

const router = createRouter({ history, routes })

export default router
