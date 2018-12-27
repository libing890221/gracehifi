import Vue from 'vue'
import Router from 'vue-router'
const Index = resolve => require(['@/views/Index.vue'], resolve);
const Caselist = resolve => require(['@/views/caselist.vue'], resolve);

const Login = resolve => require(['@/views/login.vue'], resolve);
const Regist = resolve => require(['@/views/regist.vue'], resolve);
const RegistSubmit = resolve => require(['@/views/regist-submit.vue'], resolve);
const UserShop = resolve => require(['@/views/userShop.vue'], resolve);
const userEdit = resolve => require(['@/views/userEdit.vue'], resolve);
const news = resolve => require(['@/views/news.vue'], resolve);
const NewsContent = resolve => require(['@/views/NewsContent.vue'], resolve);
const TextContent = resolve => require(['@/views/TextContent.vue'], resolve);


Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  //mode:'history',
  routes: [
    { path: "/", redirect: "/home" },
    {
      path: '/home',
      name: '首页',
      component: Index
    },
    {
      path: '/login',
      name: '用户注册',
      component: Login
    },
    {
      path: '/regist',
      name: '用户登录',
      component: Regist
    },
    {
      path: '/regist-submit',
      name: '注册页面',
      component: RegistSubmit
    },
    {
      path: '/caselist/:id',
      name: 'caseList',
      component: Caselist
    },
    {
      path: '/userShop/',
      name: 'userShop',
      component: UserShop
    },
    {
      path: '/userEdit/',
      name: 'userEdit',
      component: userEdit
    },
    {
      path:'/news/:id',
      name:'news',
      component: news
    },
    {
      path:'/NewsContent/:id',
      name:'NewsContent',
      component: NewsContent
    },
    {
      path:'/TextContent/:id',
      name:'TextContent',
      component: TextContent
    }
  ]
})
