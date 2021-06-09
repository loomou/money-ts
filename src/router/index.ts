import Vue from 'vue';
import VueRouter from 'vue-router';
import Detailed from '../views/Detailed.vue';
import Statistics from '../views/Statistics.vue';
import My from '../views/My.vue';
import NotFound from '../views/NotFound.vue';
import SetUp from '../views/SetUp.vue';
import Label from '../views/Label.vue';
import EditLabel from '../views/EditLabel.vue';
import EditRecord from '../views/EditRecord.vue';

Vue.use(VueRouter);

const routes = [
  {path: '/', redirect: '/detailed'},
  {path: '/detailed', component: Detailed},
  {path: '/statistics', component: Statistics},
  {path: '/my', component: My},
  {path: '/setup', component: SetUp},
  {path: '/label', component: Label},
  {path: '/label/edit/:id', component: EditLabel},
  {path: '/detailed/edit/:id', component: EditRecord},
  {path: '*', component: NotFound}
];

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
});

export default router;
