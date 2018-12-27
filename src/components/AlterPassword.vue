<template>
  <div class="regist-sub alter-password">
    <div class="form-group" :class="{'error': $v.user.oldPassword.$error}">
      <span class="message" v-if="!$v.user.oldPassword.required">旧密码不能为空</span>
      <input
        placeholder="请输入旧密码"
        v-model.trim="user.oldPassword"
        @blur="$v.user.oldPassword.$touch()"
        type="password"
      >
    </div>
    <!--用户名-->

    <div class="form-group" :class="{'error': $v.user.newPassword.$error}">
      <span class="message" v-if="!$v.user.newPassword.required">新密码不能为空</span>
      <input
        placeholder="请输入新密码"
        v-model.trim="user.newPassword"
        @blur="$v.user.newPassword.$touch()"
        type="password"
      >
    </div>
    <!--密码-->

    <div class="form-group" :class="{'error': $v.user.confirmPassword.$error}">
      <span class="message" v-if="!$v.user.confirmPassword.sameAsPassword">两次输入的密码不一样</span>
      <div class="auth-password">
        <input type="password" placeholder="确认密码"
               v-model.trim="user.confirmPassword"
               @blur="$v.user.confirmPassword.$touch()"
               @keyup.enter="register" ref="password2">
      </div>
    </div>
    <!--确认密码-->

    <drag-verify
      :conSuccess="this.conSuccess"
      @confirmSuccess="this.registSubmit"
    >
    </drag-verify>
  </div>
</template>

<script>
  import axios from "axios"
  import {required,minLength, maxLength, sameAs} from 'vuelidate/lib/validators'
  import dragVerify from "@/components/dragVerify.vue"

  export default {
    name: "AlterPassword",
    data(){
      return{
        user: {
          caseShopId: this.shopId,
          oldPassword: '',
          newPassword: '',
          confirmPassword:""
        },
        conSuccess: false
      }
    },
    props:{
      shopId:{
        type: String
      }
    },
    watch:{
      shopId(val){
        this.caseShopId = val
      }
    },
    inject:["reload"],
    validations: {
      user: {
        oldPassword: {
          required
        },
        newPassword: {
          required,
          minLength: minLength(8),
          maxLength: maxLength(32)
        },
        confirmPassword: {
          sameAsPassword: sameAs('newPassword')
        },
      }
    },
    components: {
      dragVerify
    },
    methods: {
      axiosSubPost: function () {
        let self = this;
        axios({
          url: '/HtmlInter.do',
          method: 'post',
          data: {
            act: 'updloginpwd_web',
            shopId: this.caseShopId,
            oldpwd: this.user.oldPassword,
            newpwd: this.user.newPassword
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
          self.reload();

        }, function (res) {
          alert("修改数据失败！");
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
  .alter-password .drag {
    width: 300px; }
</style>
