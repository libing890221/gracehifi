<template>
  <div class="regist-sub">
    <div class="croppa-box" v-show="this.croppaShow">

      <div class="croppa">
        <croppa v-model="myCroppa"
                accept="image/png,image/gif,image/jpeg"
                :width="600"
                :height="458"
                placeholder="选择文件"
                :placeholder-font-size="14"
                canvas-color="transparent"
                :show-remove-button="true"
                remove-button-color="black"
                :zoom-speed="10"
                initial-size="contain"
                :show-loading="false"
                :loading-size="50"
                @new-image-drawn="onNewImage"
                @zoom="onZoom"
        ></croppa>
        <div class="croppa-range-box">
          <span>缩放调整：</span><input class="croppa-range" type="range" @input="onSliderChange" :min="sliderMin"
                                   :max="sliderMax" step=".001" v-model="sliderVal"> {{sliderVal}}
        </div>
        <div class="btns">
          <button><img src="../assets/images/move.png"></button>
          <button @click="myCroppa.rotate()"><img src="../assets/images/clockwise.png"></button>
          <button @click="myCroppa.rotate(-1)"><img src="../assets/images/anticlockwise.png"></button>
          <button @click="myCroppa.flipX()"><img src="../assets/images/flip-horizontal.png" alt=""></button>
          <button @click="myCroppa.flipY()"><img src="../assets/images/flip-vertical.png" alt=""></button>
          <button @click="myCroppa.remove()">重置</button>
          <button @click="uploadCroppedImage('image/png')">上传</button>
          <button @click="croppaChange()">关闭</button>
        </div>
      </div>
    </div>
    <div class="shop-msg-sub">
      <div class="form-group">
        <label>店铺名称：</label>
        <input
          disabled="disabled"
          v-model.trim="user.loginName"
          type="text"
        >
      </div>
      <!--店铺名-->
      <div class="form-group form-group-logo">
        <label>店铺logo：</label>
        <span @click="croppaChange()"><i v-show="!this.user.photoThumb">请上传图片</i><img v-show="this.user.photoThumb"
                                                                                      :src="this.user.photoThumb"
                                                                                      alt=""></span>
      </div>
      <!--图标-->
      <div class="form-group" :class="{'error': $v.user.mobileTel.$error}">
        <label>电话：</label>
        <span class="message" v-if="!$v.user.mobileTel.required">电话不能为空</span>
        <span class="message" v-if="!$v.user.mobileTel.phoneType">请填写正确的手机号</span>
        <input
          placeholder="请输入电话"
          v-model.trim="user.mobileTel"
          @blur="$v.user.mobileTel.$touch()"
          type="text"
        >
      </div>
      <!--电话-->

      <div class="form-group" :class="{'error': $v.user.userEmail.$error}">
        <label>邮箱：</label>
        <span class="message" v-if="!$v.user.userEmail.required">邮箱不能为空</span>
        <span class="message" v-if="!$v.user.userEmail.email">请填写正确的邮箱</span>
        <input
          placeholder="请输入邮箱"
          v-model.trim="user.userEmail"
          @blur="$v.user.userEmail.$touch()"
          type="text"
        >
      </div>
      <!--邮箱-->

      <div class="form-group" :class="{'error': $v.user.userAddress.$error}">
        <label>地址：</label>
        <span class="message" v-if="!$v.user.userAddress.required">地址不能为空</span>
        <input
          placeholder="请输入地址"
          v-model.trim="user.userAddress"
          @blur="$v.user.userAddress.$touch()"
          type="text"
        >
      </div>
      <!--地址-->

      <div class="form-group">
        <label>店铺简介：</label>
        <textarea
          placeholder="请输入简介"
          v-model="user.shopIntro"
          type="text"
        ></textarea>
      </div>
      <!--简介-->

      <drag-verify
        :conSuccess="this.conSuccess"
        @confirmSuccess="this.registSubmit"
      ></drag-verify>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import 'vue-croppa/dist/vue-croppa.css'
  import {required, between, email} from 'vuelidate/lib/validators'
  import dragVerify from "@/components/dragVerify.vue"

  export default {
    name: "ShopMessage",
    data() {
      return {
        user: {
          loginName: this.loginName,
          photoThumb: this.photoThumb,
          mobileTel: this.mobileTel,
          userEmail: this.userEmail,
          userAddress: this.userAddress,
          shopIntro: this.shopIntro
        },
        croppaShow: false,
        conSuccess: false,
        myCroppa: {},
        sliderVal: 0,
        sliderMin: 0,
        sliderMax: 0,
        logoSrc: ""
      }
    },
    validations: {
      user: {
        mobileTel: {
          required,
          phoneType: between(10000000000, 20000000000)
        },
        userEmail: {
          required,
          email
        },
        userAddress: {
          required
        }
      }
    },
    props: {
      shopId: {
        type: String
      },
      loginName: {
        type: String
      },
      photoThumb: {
        type: String
      },
      mobileTel: {
        type: String
      },
      userEmail: {
        type: String
      },
      userAddress: {
        type: String
      },
      shopIntro: {
        type: String
      }
    },
    watch: {
      loginName(val) {
        this.user.loginName = val;
      },
      photoThumb(val) {
        this.user.photoThumb = val;
        this.SrcJoint(val)
      },
      mobileTel(val) {
        this.user.mobileTel = val
      },
      userEmail(val) {
        this.user.userEmail = val
      },
      userAddress(val) {
        this.user.userAddress = val
      },
      shopIntro(val) {
        this.user.shopIntro = val
      }
    },
    inject: ["reload"],
    methods: {
      SrcJoint: function (val) {
        let imgUrl = val.split("/");
        imgUrl = imgUrl.slice(3, 6);
        let imgUrlJoint = [];
        imgUrl.forEach(function (val) {
          imgUrlJoint += "/" + val
        })
        this.logoSrc = imgUrlJoint;
      },
      onNewImage: function onNewImage() {
        this.sliderVal = this.myCroppa.scaleRatio;
        this.sliderMin = this.myCroppa.scaleRatio / 2;
        this.sliderMax = this.myCroppa.scaleRatio * 2;
      },
      onSliderChange: function onSliderChange(evt) {
        var increment = evt.target.value;
        this.myCroppa.scaleRatio = +increment;
      },
      onZoom: function onZoom() {
        this.sliderVal = this.myCroppa.scaleRatio;
      },
      croppaChange: function () {
        this.croppaShow = !this.croppaShow
        return this.croppaShow
      },
      uploadCroppedImage: function (type, compressionRate) {
        this.myCroppa.generateBlob((blob) => {
          let self = this;
          let file = blob;
          let filetype = file.type.split("/");
          file.name = "blob" + "." + filetype[filetype.length - 1]
          let param = new FormData() // 创建form对象
          param.append('file', file, file.name) // 通过append向form对象添加数据
          param.append('dir', 'image') // 添加form表单中其他数据
          param.append('isPortrait', 'Y') // 添加form表单中其他数据
          let config = {
            headers: {'Content-Type': 'multipart/form-data'}
          }
          // 添加请求头
          axios.post('/HtmlImgUpload.do', param, config)
            .then(response => {
              self.croppaChange();
              self.user.photoThumb = response.data.url;
              self.SrcJoint(self.user.photoThumb);
            })
        }, type, compressionRate);
      },
      axiosSubPost: function () {
        let self = this;
        axios({
          url: '/HtmlInter.do',
          method: 'post',
          data: {
            "act": 'updlogin_web',
            "userkey": this.loginName,
            "shopId": this.shopId,
            "photo_thumb": this.logoSrc,
            "mobileTel": this.user.mobileTel,
            "userEmail": this.user.userEmail,
            "userAddress": this.user.userAddress,
            "info1_cn": this.user.shopIntro
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
    },
    computed(){

    },
    components: {
      dragVerify
    }
  }
</script>

<style scoped>
  .alter-password .drag {
    width: 300px; }
</style>
