<template>
  <div>
    <nav-header></nav-header>
    <div class="width">
      <div class="usershop-title">
        <div class="shop-logo"><img :src="this.shopData.photo_thumb" alt=""></div>
        <div class="shop-intro">
          <div class="shop-name">{{this.shopData.loginName}}</div>
          <div class="shop-intro-text">{{this.shopData.info1_cn}}</div>
        </div>
      </div>
      <div class="shop-box">
        <shop-menu :menuData="this.menuData" :menuTitle="this.menuTitle" @activeType="routerRun"></shop-menu>
        <div class="user-shop">
          <div class="information-title">{{this.menuType}}</div>
          <filtrate v-if="this.menuType == '产品信息'":shopId = "this.userShop"></filtrate>
          <shop-message v-if="this.menuType == '店铺信息'"
                        :shopId = "this.userShop"
                        :loginName = "this.shopData.loginName"
                        :photoThumb="this.shopData.photo_thumb"
                        :mobileTel="this.shopData.mobileTel"
                        :userEmail="this.shopData.userEmail"
                        :userAddress="this.shopData.userAddress"
                        :shopIntro="this.shopData.info1_cn"
          ></shop-message>
          <alter-password v-if="this.menuType == '修改密码'" :shopId="this.userShop"></alter-password>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import "./../assets/css/userShop.css"
  import NavHeader from "@/components/NavHeader.vue"
  import NavFooter from "@/components/NavFooter.vue"
  import ShopMenu from "@/components/ShopMenu.vue"
  import Filtrate from "@/components/Filtrate.vue"
  import ShopMessage from "@/components/ShopMessage.vue"
  import AlterPassword from "@/components/AlterPassword.vue"
  import axios from "axios"

  export default {
    name: "user",
    data() {
      return {
        userShop: localStorage.getItem("userShopKey") || "",
        userkey:  localStorage.getItem("author"),
        menuData: ["产品信息", "店铺信息", "修改密码"],
        menuTitle: '我的店铺',
        menuType: localStorage.getItem("shopMenu") || "产品信息",
        shopData: []
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
      routerRun: function (runAdd) {
        this.menuType = runAdd;
        localStorage.setItem("shopMenu", runAdd);
      },
      getData: function () {
        let self = this;
        let isPortrait ="Y";

        axios({
          url: '/HtmlInter.do',
          method: 'post',
          data: {
            act: 'login_message',
            shopId: this.userShop,
            userkey: this.userkey
          },
          transformRequest: [function (data) {
            let ret = '';
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(function (res) {
          self.shopData = res.data;
        }, function (res) {

        });
      }
    }
    ,
    components: {
      NavHeader,
      NavFooter,
      Filtrate,
      AlterPassword,
      ShopMessage,
      ShopMenu
    }
  }
</script>

<style scoped>
  .alter-password .drag {
    width: 300px;
  }
</style>
