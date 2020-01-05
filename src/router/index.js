import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../home/HomePage.vue';
import RobotBuilder from '../build/RobotBuilder.vue';
import PartInfo from '../parts/PartsInfo.vue';
import BrowseParts from '../parts/BrowseParts.vue';
import BrowseArms from '../parts/RobotArms.vue';
import BrowseBases from '../parts/RobotBases.vue';
import BrowseHeads from '../parts/RobotHeads.vue';
import BrowseTorsos from '../parts/RobotTorsos.vue';
import SidebarStandard from '../sidebar/SidebarStandard.vue';
import SidebarBuild from '../sidebar/SidebarBuild.vue';
import ShoppingCart from '../cart/ShoppingCart.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Home',
    components: {
      default: HomePage,
      sidebar: SidebarStandard,
    },
  },
  {
    path: '/build',
    name: 'Build',
    components: {
      default: RobotBuilder,
      sidebar: SidebarBuild,
    },
  },
  {
    path: '/parts/browse',
    name: 'BrowseParts',
    component: BrowseParts,
    children: [
      {
        name: 'BrowseHeads',
        path: 'heads',
        component: BrowseHeads,

      },
      {
        name: 'BrowseArms',
        path: 'arms',
        component: BrowseArms,
      },
      {
        name: 'BrowseTorsos',
        path: 'torsos',
        component: BrowseTorsos,
      },
      {
        name: 'BrowseBases',
        path: 'bases',
        component: BrowseBases,
      },
    ],
  },
  {
    path: '/parts/:partType/:id',
    name: 'Parts',
    component: PartInfo,
    props: true,
    beforeEnter(to, from, next) {
      const isValidId = Number.isInteger(Number(to.params.id));
      next(isValidId);
    },
  },
  {
    path: '/cart',
    name: 'Cart',
    component: ShoppingCart,
  }],
});
