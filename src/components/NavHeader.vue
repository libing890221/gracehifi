<template>

  <header class="header swiper-slide">
    <div class="width fn-clear">
      <div class="logo">
        <router-link to="/" title="返回首页"><img class="logo-img" src="static/images/logo.png" alt="返回首页"><img
          src="static/images/logo-hover.png" alt="返回首页"></router-link>
      </div>
      <div class="nav-icon">
        <ul class="fn-clear">
          <li>
            <router-link to="/"><i></i><span class="en">Home</span><span class="zh">首 页</span></router-link>
          </li>
          <li @click="listInit">
            <router-link :to="{name:'caseList',params:{id: '音源'}}"><i></i><span class="en">Audio Product </span><span
              class="zh"> 音 频 商 品</span></router-link>
          </li>
          <li>
            <router-link :to="{name: 'TextContent',params:{id:'gywm',title:'服务项目'}}"><i></i><span
              class="en">Service</span><span class="zh">服 务 项 目</span></router-link>
          </li>
          <li>
            <router-link :to="{ name:'news',params:{id:'audionews1'}}"><i></i><span class="en">Audio News</span><span
              class="zh">音 频 新 闻</span></router-link>
          </li>
          <li>
            <router-link :to="{name: 'TextContent',params:{id:'lxwm',title:'联 络'}}"><i></i><span
              class="en">Contact</span><span class="zh">联 络</span></router-link>
          </li>
        </ul>
      </div>
      <div class="login">
        <router-link to="/login" v-if="!user.isLogin"><span><i></i></span>
          <p>登录</p></router-link>
        <router-link to="/regist" v-if="!user.isLogin"><span><i></i><i></i></span>
          <p>注册</p></router-link>
        <a @click="RouterRun" v-if="user.isLogin"><span>{{user.userName}}</span></a>
        <a v-if="user.isLogin" @click="logout"><span>注销</span></a>
      </div>
    </div>
    <!--/ .width -->
    <div class="nav-box" :class="{'slidenav-box' : this.navflag}">
      <nav>
        <ul>
          <img v-show="navflag" src="static/images/logo-mobile.png" alt="">
          <li v-for="(newsColumn,index) in newsColumnArr" :key="index" @click="RunColumn(newsColumn)"
              :class="columnFun(newsColumn) ? 'active':''">
            <span class="animate-box"><span class="front">{{newsColumn}}</span><span class="back">{{newsColumn}}</span></span>
          </li>
        </ul>
      </nav>
    </div>
    <!--/ .nav -->
    <div :class="{navflag : this.navflag}" class="mobile-btn" v-if="isMobile" @click="navflag = !navflag">
     <div class="mobile-icon">
       <span></span>
       <span></span>
       <span></span>
     </div>
    </div>

  </header>

</template>

<script>
  import "./../assets/css/navheader.css"

  export default {
    name: "Header",
    data() {
      return {
        navflag: false,
        newsColumnArr: ['往日经典', 'HIFI收藏品', '技能提升', 'HIFI-SHOW', '真空管专栏', '零件解析', '独家原创']
      }
    },
    computed: {
      user() {
        let userName = this.$store.state.user.author;
        let isLogin = userName !== "";
        return {isLogin, userName};
      }
    },
    inject: ["reload"],
    methods: {
      navFlag: function(){

      },

      isMobile: function(){
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
        return flag;
      },
      RouterRun() {
        this.$router.push({name: "userShop"});
      },
      logout() {
        this.$store.commit("isLogout");
        localStorage.setItem("userShop", '');
        this.$router.push('/')
        this.reload();
      },
      listInit: function () {
        localStorage.setItem("caseList", "音源");
        localStorage.setItem("caseType", "音源");
        localStorage.setItem("shop", "");
        localStorage.setItem("caseSearch", "");
        localStorage.setItem("PageIndex", 1);
      },
      columnFun: function (val) {
        let isAct = this.$route.params.id;
        let column = "";
        switch (val) {
          case "往日经典":
            column = 'news1';
            break;
          case "HIFI收藏品":
            column = 'news2';
            break;
          case "技能提升":
            column = 'news3';
            break;
          case "HIFI-SHOW":
            column = 'news4';
            break;
          case "真空管专栏":
            column = 'news5';
            break;
          case "独家原创":
            column = 'news6';
            break;
          case "零件解析":
            column = 'news7';
            break;
          case "音频新闻":
            column = 'audionews1';
            break;
        }

        if (isAct == column) {
          return true;
        } else {
          return false
        }
      },
      RunColumn: function (val) {
        this.navflag = !this.navflag;
        let column = "";
        switch (val) {
          case "往日经典":
            column = 'news1';
            break;
          case "HIFI收藏品":
            column = 'news2';
            break;
          case "技能提升":
            column = 'news3';
            break;
          case "HIFI-SHOW":
            column = 'news4';
            break;
          case "真空管专栏":
            column = 'news5';
            break;
          case "独家原创":
            column = 'news6';
            break;
          case "零件解析":
            column = 'news7';
            break;
          case "音频新闻":
            column = 'audionews1';
            break;
        }
        this.columnAct = val;
        localStorage.setItem("column", column);
        localStorage.setItem("PageIndex", "1");
        this.$router.push({name: "news", params: {"id": column}});
      }
    },
  }
</script>

<style scoped>

</style>
