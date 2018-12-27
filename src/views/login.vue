<template>
  <div>
    <nav-header></nav-header>
    <div class="width regist-sub">
      <h2>用户登录</h2>
      <div class="form-group" :class="{'error': $v.user.username.$error}">
        <span class="message" v-if="!$v.user.username.required">用户名不能为空</span>
        <input
          placeholder="请输入您的用户名"
          v-model.trim="user.username"
          @blur="$v.user.username.$touch()"
        >
      </div>
      <!--用户名-->

      <div class="form-group" :class="{'error': $v.user.password.$error}">
        <span class="message" v-if="!$v.user.password.required">密码不能为空</span>
        <input
          placeholder="请输入您的密码"
          v-model.trim="user.password"
          @blur="$v.user.password.$touch()"
          type="password"
        >

      </div>
      <!--密码-->
      <drag-verify
        :conSuccess="this.conSuccess"
        @confirmSuccess="this.registSubmit"
      >
      </drag-verify>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import axios from "axios"
  import NavHeader from "@/components/NavHeader.vue"
  import NavFooter from "@/components/NavFooter.vue"
  import "@/assets/css/base.css"
  import "@/assets/css/regist.css"
  import {required} from 'vuelidate/lib/validators'
  import dragVerify from "@/components/dragVerify.vue"

  export default {
    name: "login",
    data() {
      return {
        user: {
          username: '',
          password: ''
        },
        conSuccess: false
      }
    },
    validations: {
      user: {
        username: {
          required
        },
        password: {
          required
        },
      }
    },
    components: {
      NavHeader,
      NavFooter,
      dragVerify
    },
    inject: ['reload'],
    methods: {
      axiosSubPost: function () {
        let self = this;
        axios({
          url: '/HtmlInter.do',
          method: 'post',
          data: {
            act: 'login_web',
            uno: this.user.username,
            pwd: this.user.password
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
          alert(res.data.message);
          if (res.data.result) {
            var userStoreId = res.data.storeId;
            self.$store.commit("isLogin",(self.user.username));
            localStorage.setItem("userShopKey",userStoreId);
            self.$router.push({name:"userShop"});
          }
          else {
            self.reload();
          }
        }, function (res) {
          alert("登录失败！");
          self.reload();
        })
      },

      registSubmit: function () {
        this.$v.$touch()
        if (this.$v.$invalid) {
          this.conSuccess = false;
          alert("信息有误，请核对后重新提交")
        } else {
          this.conSuccess = true;
          this.axiosSubPost();
        }
      }
    }
  }
</script>

<style scoped>

</style>
