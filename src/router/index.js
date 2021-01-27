import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login'

async function guard(to, from, next){
  let token = localStorage.getItem('_accessToken');
  await axios.get('check-auth', {
    headers: {
      Authorization: token ? token : null
    }
  }).then(res => null)
    .catch(e => {
      if(e.response.statusText == 'Unauthorized'){
        localStorage.removeItem('_accessToken')
        localStorage.removeItem('_userData');
        token = null;
      }
    })

  if(token === null || token === 'null' || token == undefined || token == '') {
    next({ name: 'Login' })
  } 
  else next()
}

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    beforeEnter: guard,
    component: () => import(/* webpackChunkName: "layout" */ '../layouts/Default.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
      },
      {
        path: '/product',
        name: 'Product',
        component: () => import(/* webpackChunkName: "product" */ '../views/Product.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
