import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {path: '/', redirect: '/sign'},
  {path: '/detailed', component: () => import('../views/Detailed.vue')},
  {path: '/statistics', component: () => import('../views/Statistics.vue')},
  {path: '/my', component: () => import('../views/My.vue')},
  {path: '/setup', component: () => import('../views/SetUp.vue')},
  {path: '/label', component: () => import('../views/Label.vue')},
  {path: '/label/edit/:id', component: () => import('../views/EditLabel.vue')},
  {path: '/detailed/edit/:id', component: () => import('../views/EditRecord.vue')},
  {path: '/sign', component: () => import('../views/Sign.vue')},
  {path: '*', component: () => import('../views/NotFound.vue')},
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('AuthToken');
  if (to.path === '/sign') {
    if (token) {
      next('/detailed');
    }
    next();
  } else {
    if (!token) {
      next('/sign');
    } else {
      next();
    }
  }
});

export default router;
