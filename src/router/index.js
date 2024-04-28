import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CurriculumView from '../views/CurriculumView.vue';
import LoginView from '../views/LoginView.vue';
import HomeUserView from '@/views/User/HomeView.vue';
import CvManagementView from '@/views/User/ManagementView';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/view/:id',
    name: 'viewCurriculum',
    component: CurriculumView
  },
  {
    path: '/login',
    name: 'loginView',
    component: LoginView
  },
  {
    path: '/user/home',
    name: 'HomeView',
    component: HomeUserView
  },
  {
    path: '/user/management',
    name: 'ManagementView',
    component: CvManagementView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
