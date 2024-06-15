import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import MainLayout from '../Layouts/mainLayout.vue'
import Albums from '../components/Albums.vue'
import AlbumPhotos from '../components/AlbumPhotos.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        component: Home,
      },
      {
        path: 'albums',
        component: Albums,
      },
      {
        path: 'albums/:id',
        component: AlbumPhotos,
        props: true,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router