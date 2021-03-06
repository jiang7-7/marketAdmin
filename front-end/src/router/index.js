import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'
import Mainmall from '../views/market/mainmall'

const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
export const constantRouterMap = [
  {path: '/login', component: _import('login/index'), hidden: true},
  {path: '/404', component: _import('404'), hidden: true},
  {path: '/jump', component: _import('login/jump'),hidden: true},
  {path: '/maml', component: Mainmall, hidden: true},
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{
      path: 'dashboard', component: _import('dashboard/index')
    }]
  }
]
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
export const asyncRouterMap = [
  {
    path: '/system',
    component: Layout,
    redirect: '/system/order',
    name: '订单模块',
    meta: {title: '订单模块', icon: 'tree'},
    children: [
      {
        path: 'order',
        name: '订单管理',
        component: _import('order/order'),
        meta: {title: '订单', icon: 'example'},
        menu: 'order'
      },
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/',
    name: '',
    meta: {title: '用户权限', icon: 'table'},
    children: [
      {
        path: '', name: '用户列表', component: _import('user/user'), meta: {title: '用户列表', icon: 'user'}, menu: 'user'
      },
      {
        path: 'role',
        name: '权限管理',
        component: _import('user/role'),
        meta: {title: '权限管理', icon: 'password'},
        menu: 'role'
      },
    ]
  },
  {path: '*', redirect: '/404', hidden: true}//访问system下路径之外的路径都会重定向到404
]
