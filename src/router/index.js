import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Home from '../views/Home.vue'
import login from '../components/pages/login.vue'
import dashboard from '../views/dashboard.vue'
import products from '../components/products.vue'
import Orderlist from '../views/Orderlist.vue'
import Productsingle from '../views/Product_single.vue'
import Store from '../views/Store.vue'
import About from '../views/About.vue'
import Customerorder from '../views/Customerorder.vue'
import Customercheckout from '../views/Customercheckout.vue'

Vue.use(VueRouter)
Vue.use(VueAxios, axios)

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/',
    redirect: '/about',
    name: 'Home',
    component: Home,   
    children: [
      {
        path: '/about',
        name: 'About',
        component : About
      },
      {
        path: '/store',
        name: 'Store',
        component : Store
      },
      {
        path: '/productsingle/:productId',
        name: 'Productsingle',
        component : Productsingle
      },
      {
        path: '/customerorder',
        name: 'Customerorder',
        component : Customerorder
      },
      {
        path: '/customercheckout/:orderId',
        name: 'Customercheckout',
        component : Customercheckout
      },
      {
        path: '/login',
        name: 'Login',
        component: login
      },
    ],
  }, 
  {
    path: '/admin',
    name: 'Dashboard',
    component: dashboard,
    children: [
      {
        path: 'products',
        name: 'Products',
        component: products,
        meta: { requiresAuth: true },
      },
      {
        path: 'orderlist',
        name: 'Orderlist',
        component: Orderlist,
        meta: { requiresAuth: true }
      }
    ],
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  // console.log( 'to:', to, 'from: ', from, 'next: ', next);
  if(to.meta.requiresAuth){
    // console.log("需要驗證");
    const api = 'https://vue-course-api.hexschool.io/api/user/check' //檢查用戶是否仍持續登入
    axios.post(api).then(response => {
        console.log(response.data);
        if(response.data.success){
          // console.log('1231')
          next();         
        }
        else{
          next({
            path: '/login'
          })
        }
    });
  }
  else{
    next();
  }
  
});

export default router
