<template>
  <div>
    <nav-header></nav-header>
    <div class="width regist-sub">
      <h2>注册信息</h2>

      <div class="form-group" :class="{'error': $v.Newuser.username.$error}">
        <span class="message" v-if="!$v.Newuser.username.required">用户名不能为空</span>
        <span class="message" v-if="!$v.Newuser.username.minLength">用户名过短</span>
        <span class="message" v-if="!$v.Newuser.username.maxLength">用户名过长</span>
        <input
          placeholder="请输入你的用户名"
          v-model.trim="Newuser.username"
          @blur="$v.Newuser.username.$touch()"
        >

      </div>
      <!--用户名-->

      <div class="form-group sub-merchant" :class="{'error': $v.Newuser.merchant.$error}">

        <input id="merchant-Y" checked="checked" type="radio" v-model.trim="Newuser.merchant" value="Y"><label for="merchant-Y">商家</label>
        <input id="merchant-N" type="radio" v-model.trim="Newuser.merchant" value="N"><label for="merchant-N">个人</label>
      </div>
      <!--是否商家-->

      <div class="form-group" :class="{'error': $v.Newuser.password.$error}">
        <span class="message" v-if="!$v.Newuser.password.required">密码不能为空</span>
        <span class="message"
              v-if="!$v.Newuser.password.minLength">密码不能小于{{$v.Newuser.password.$params.minLength.min}}位</span>
        <span class="message"
              v-if="!$v.Newuser.password.maxLength">密码不能大于{{$v.Newuser.password.$params.maxLength.max}}位</span>
        <div class="auth-password">
          <input type="password" placeholder="输入密码"
                 v-model.trim="Newuser.password"
                 @blur="$v.Newuser.password.$touch()" ref="password1">
        </div>
      </div>
      <!--密码-->

      <div class="form-group" :class="{'error': $v.Newuser.confirmPassword.$error}">
        <span class="message" v-if="!$v.Newuser.confirmPassword.sameAsPassword">两次输入的密码不一样</span>
        <div class="auth-password">
          <input type="password" placeholder="确认密码"
                 v-model.trim="Newuser.confirmPassword"
                 @blur="$v.Newuser.confirmPassword.$touch()"
                 @keyup.enter="register" ref="password2">
        </div>
      </div>
      <!--确认密码-->

      <div class="form-group" :class="{'error': $v.Newuser.phoneCode.$error}">
        <span class="message" v-if="!$v.Newuser.phoneCode.required">联系电话不能为空</span>

        <span class="message" v-if="!$v.Newuser.phoneCode.phoneType">请填写正确的手机号</span>
        <input
          placeholder="联系电话"
          v-model.trim="Newuser.phoneCode"
          @blur="$v.Newuser.phoneCode.$touch()"
        >

      </div>
      <!--手机号-->

      <div class="form-group" :class="{'error': $v.Newuser.email.$error}">
        <span class="message" v-if="!$v.Newuser.email.required">邮箱不能为空</span>
        <span class="message" v-if="!$v.Newuser.email.email">请填写正确的邮箱</span>
        <input
          placeholder="联系邮箱"
          v-model.trim="Newuser.email"
          @blur="$v.Newuser.email.$touch()"
        >

      </div>
      <!--邮箱-->

      <div class="form-group" :class="{'error': $v.Newuser.address.$error}">
        <span class="message" v-if="!$v.Newuser.address.required">地址不能为空</span>
        <input
          placeholder="联系地址"
          v-model.trim="Newuser.address"
          @blur="$v.Newuser.address.$touch()"
        >
      </div>
      <!--地址-->
      <drag-verify
        :conSuccess = "this.conSuccess"
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
  import {required, between, email, minLength, maxLength, sameAs} from 'vuelidate/lib/validators'
  import dragVerify from "@/components/dragVerify.vue"

  export default {
    name: "RegistSubmit",
    data() {
      return {
        Newuser: {
          username: '',
          phoneCode: '',
          email: '',
          password: '',
          merchant:'Y',
          confirmPassword: '',
          address: ''
        },
        conSuccess: false
      }
    },
    inject: ['reload'],
    validations: {
      Newuser: {
        username: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(20)
        },
        merchant: {
          required
        },
        phoneCode: {
          required,
          phoneType: between(10000000000, 20000000000)
        },
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(8),
          maxLength: maxLength(32)
        },
        confirmPassword: {
          sameAsPassword: sameAs('password')
        },
        address: {
          required
        }
      }
    },
    components: {
      NavHeader,
      NavFooter,
      dragVerify
    },
    methods: {

      axiosSubPost: function () {
        let self = this;
        axios({
          url: '/HtmlInter.do',
          method: 'post',
          data: {
            act: 'reg_web',
            uno: this.Newuser.username,
            pwd: this.Newuser.password,
            phone: this.Newuser.phoneCode,
            userEmail: this.Newuser.email,
            address: this.Newuser.address,
            merchant: this.Newuser.merchant
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
          if (res.data.result) {
            var userStoreId = res.data.storeId;
            self.$store.commit("isLogin",(self.Newuser.username));
            localStorage.setItem("userShopKey",userStoreId);
            self.$router.push({name:"userShop"});
          }
          else {
            self.reload();
          }
        }, function (res) {
          alert("注册失败！");
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
