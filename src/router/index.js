import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/MainView.vue'
import {Main} from "element-ui";
import Home from "@/views/Home";
import MainView from "@/views/MainView";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Person from "@/views/Person";
import Password from "@/views/Password";
import About from "@/views/About";
import OpenSource from "@/views/OpenSource";
import RoboCompetition from "@/views/RoboCompetition";
import JoinUs from "@/views/JoinUs";
import MemberCenter from "@/views/MemberCenter";
import CenterHome from "@/views/MemberCenter/CenterHome";
import Apply from "@/views/MemberCenter/Apply";
import Materials from "@/views/MemberCenter/Materials";
import Manage from "@/views/MemberCenter/Manage";
import UserManage from "@/views/Manage/UserManage";
import ApplyManage from "@/views/Manage/ApplyManage";
import NotFound from "@/views/NotFound";
import Auth from "@/views/Auth";
import Designing from "@/views/Designing";
import Brief from "@/views/About/Brief";
import Culture from "@/views/About/Culture";
import History from "@/views/About/History";
import Resp from "@/views/About/Resp";
import Honor from "@/views/About/Honor";
import Team from "@/views/About/Team";
import NewsDetail from '@/views/News/NewsDetail.vue';
import NewsList from '@/views/News/NewsList.vue'; 

Vue.use(VueRouter)


const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'main',
    redirect:'/home',
    component: MainView,
    children:[
      {path:'manage',name: 'manage',component: Manage,
        redirect:'/manage/userManage',
      children: [
        {path: 'userManage',name: 'userManage',component: UserManage},
        {path: 'applyManage',name: 'applyManage',component: ApplyManage}
      ]
      },
      {path:'home',name: 'home',component: Home},
      {path:'designing',name: 'designing',component: Designing},
      {path:'about',name: 'about',component: About,
        redirect: '/about/brief',
      children: [
        {path:'brief',name: 'brief',meta:{name:'简介'},component: Brief},
        {path:'culture',name: 'culture',meta:{name:'文化'},component: Culture},
        {path:'history',name: 'history',meta:{name:'历史'},component: History},
        {path:'honor',name: 'honor',meta:{name:'荣誉'},component: Honor},
        {path:'resp',name: 'resp',meta:{name:'历任负责人'},component: Resp},
        {path:'team',name: 'team',meta:{name:'团队成员'},component: Team},
      ]},
      {path:'openSource',name: 'openSource',component: OpenSource},
      {path:'roboCompetition',name: 'roboCompetition',component: RoboCompetition},
      {path:'joinUs',name: 'joinUs',component: JoinUs},
      {path:'person',name: 'person',component: Person},
      {path:'password',name: 'password',component: Password},
      {path:'memberCenter',name: 'memberCenter',component: MemberCenter,
        redirect: '/memberCenter/centerHome',
      children:[
        {path:'centerHome',name: 'centerHome',component: CenterHome},
        {path:'apply',name: 'apply',component: Apply},
        {path:'materials',name: 'materials',component: Materials},
        {path:'home',name: 'home',component: Home},
      ]
      },
    ]
  },
  {
    path:'/login',
    name: 'login',
    component: Login
  },
  {
    path:'/register',
    name: 'register',
    component: Register
  },
  {
    path:'*',
    name: '404',
    component: NotFound
  },
  {path:'403',name:'Auth',meta:{name:'无权限'}, component:Auth},
  // {
  //   path: '/news',
  //   name: 'NewsList',
  //   component: NewsList
  // },
  {
    path: '/news/:id',
    name: 'NewsDetail',
    component: NewsDetail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  //to:请求的页面路由
  //from:开源的路由信息
  //next:跳转路由的函数
  let adminPath=['/manage','/manage/applyManage','/manage/applyManage']//管理员才能访问的路由
  let memberPath=['/memberCenter','/memberCenter/centerHome']  //成员才能访问的页面
  let designingPath=['/openSource','/roboCompetition',"/joinUs"]  //待开发页面

  let user =JSON.parse(localStorage.getItem('INVC-user')||'{}')//获取用户信息

  if(user.role !=='实验室负责人'&& adminPath.includes(to.path)){
    next('/403')//如果不是管理员，并且要访问的页面是管理员才能访问的页面，就跳转无权访问的页面
  }
  else {
    next()
  }
  if(!user&& memberPath.includes(to.path)){
    this.$message.warning('请登录')
    next('/login')//如果不是管理员，并且要访问的页面是管理员才能访问的页面，就跳转无权访问的页面
  }
  else {
    next()
  }

  if(designingPath.includes(to.path)){
    next('/designing')//如果不是管理员，并且要访问的页面是管理员才能访问的页面，就跳转无权访问的页面
  }
  else {
    next()
  }
})

export default router
