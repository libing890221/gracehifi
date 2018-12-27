<template>
  <div>
    <nav-header></nav-header>
    <div class="width">
      <div class="image-upload-wrap" v-show="ShowUploadBox">
        <div class="image-upload-box">
          <vueCropper
            ref="cropperImages"
            :img="uploadImageOption.img"
            :outputSize="uploadImageOption.size"
            :outputType="uploadImageOption.outputType"
            :info="uploadImageOption.info"
            :canScale="uploadImageOption.canScale"
            :autoCrop="uploadImageOption.autoCrop"
            :autoCropWidth="uploadImageOption.autoCropWidth"
            :autoCropHeight="uploadImageOption.autoCropHeight"
            :fixed="uploadImageOption.fixed"
          ></vueCropper>
          <input type="file" id="imagesUploads" accept="image/png, image/jpeg, image/gif, image/jpg"
                 @change="uploadImg($event,1)">
          <button @click="SubmitImg">确定上传</button>
          <button @click="CloseUploadImg">取消</button>
        </div>
      </div>
      <!--/ 图片上传 -->
      <div class="user-edit-box">
        <div class="user-edit-title"><span>请填写商品信息</span><span>* 表示该项必填</span></div>
        <div class="user-edit">
          <div class="user-edit-item user-edit-item-1">
            <h1>1.商品基本信息</h1>

            <div class="edit-item">
              <label for="" style="float: left;">商品类型：</label>
              <div class="edit-item-select">
                <select name="" id="" v-model="caseData.model">
                  <option v-for="(item,index) in typeData" :key="index">{{item}}</option>
                </select>
              </div>
              <i>*</i>
            </div>
            <div class="edit-item" :class="{'error': $v.caseData.name.$error}">
              <label for="">商品名称：</label>
              <input type="text" v-model.trim="caseData.name" @blur="$v.caseData.name.$touch()">
              <span class="message" v-if="!$v.caseData.name.required">商品名不能为空</span>
              <i>*</i>

            </div>
            <div class="edit-item">
              <label for="">商品价格：</label>
              <input type="text" v-model="caseData.price">
            </div>
            <div class="edit-item">
              <label for="" style="float: left;">商品上传日期：</label>
              <datepicker class="edit-date" v-model="caseData.updataTime" :language="timeoption.zh"
                          :format="timeoption.format"></datepicker>
              <i>*</i>
            </div>
            <div class="edit-item">
              <label for="">商品品牌：</label>
              <input type="text" v-model="caseData.propinpai">
            </div>
            <div class="edit-item">
              <label for="">商品型号：</label>
              <input type="text" v-model="caseData.brand">
            </div>
            <div class="edit-item">
              <label for="">商品品相：</label>
              <input type="text" v-model="caseData.level">
            </div>
            <div class="edit-item">
              <label for="">商品保修时间：</label>
              <input type="text" v-model="caseData.warranty">
            </div>
            <div class="edit-item"></div>
            <div class="edit-item edit-item-checkbox">
              <label for="">是否包装：</label>
              <input type="checkbox" v-model="caseData.ispackage">
            </div>
            <div class="edit-item edit-item-checkbox">
              <label for="">是否二手：</label>
              <input type="checkbox" v-model="caseData.ifUsed">
            </div>
            <div class="edit-item edit-item-checkbox">
              <label for="">是否降价：</label>
              <input type="checkbox" v-model="caseData.depreciate">
            </div>
            <div class="edit-item edit-item-checkbox">
              <label for="">是否售完：</label>
              <input type="checkbox" v-model="caseData.sellOut">
            </div>
            <div class="edit-item edit-item-textarea">
              <label for="">商品关键词：</label>
              <textarea type="text" v-model="caseData.keywords"></textarea>
              <span><i>多个以","间隔</i></span>
            </div>
            <div class="edit-item edit-item-textarea">
              <label for="">商品摘要：</label>
              <textarea type="text" v-model="caseData.description"></textarea>
            </div>
            <div class="edit-item edit-item-textarea">
              <label for="">商品附件：</label>
              <textarea type="text" wrap="hard" cols="20" v-model="caseData.annex">{{caseData.annex}}</textarea>
              <span><i>(回车或输入“&lt;br/&lg;”换行)</i></span>
            </div>

          </div>
          <div class="user-edit-item user-edit-item-2">
            <h1>2.商品图片 <span>(拖动图片改变先后顺序)</span></h1>
            <div class="image-upload">
              <div class="image-upload-item" v-for="(imageItem,index) in imagesUploadsData"
                   v-dragging="{ item: imageItem, list: imagesUploadsData, group: 'imageItem'}" :key="index">
                <img :src="imageItem" alt="">
                <span @click="editImage(index)" class="edit-img">点击编辑</span>
                <span @click="removeImage(index)" class="removeImage"></span>
              </div>
              <div class="image-upload-item" v-if="imagesUploadsData.length<5" @click="AddImages()">添加产品图片</div>
              <span v-if="imagesUploadsData.length<1">(请最少添加一张图片)</span>
            </div>

          </div>
          <div class="user-edit-item user-edit-item-3">
            <h1>3.商品详情 </h1>
            <div class="goodsEdit-box">
              <editor id="editor_id" class="goodsEditer" height="600px" width="800px"
                      :content="editorText"
                      uploadJson="/HtmlImgUpload.do"
                      @on-content-change="onContentChange"
              ></editor>
            </div>
          </div>
          <div class="user-edit-sub">
            <button @click="editSubmit">提交</button>
          </div>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import "../assets/css/userEdit.css"
  import axios from "axios"
  import Datepicker from 'vuejs-datepicker'
  import VueCropper from 'vue-cropper'
  import VueKindEditor from 'vue-kindeditor'
  import {required} from 'vuelidate/lib/validators'
  import {zh} from 'vuejs-datepicker/dist/locale'
  import NavHeader from "@/components/NavHeader.vue"
  import NavFooter from '@/components/NavFooter.vue'

  export default {
    name: "userEdit",
    data() {
      return {
        caseId: localStorage.getItem("EditID") || "",
        typeData: ["音源", "功放", "音箱", "真空管放大器", "黑胶唱机", "西电专区", "耳机专区", "其他"],
        caseData: {
          model: "音源",
          updataTime: this.getTime(),
          store: localStorage.getItem("author"),
          name: "",
          storeId: localStorage.getItem("userShopKey"),
          propinpai: "",
          brand: "",
          keywords: "",
          description: "",
          warranty: "",
          level: "",
          price: "",
          annex: "",
          content: "",
          ifUsed: "",
          sellOut: "",
          ispackage: "",
          depreciate: "",
        },
        timeoption: {
          zh: zh,
          format: 'yyyy-MM-dd',
        },
        imagesUploadsData: [],
        imagesEdit: "",
        ShowUploadBox: false,
        waterMarkCan: "",
        uploadImageOption: {
          img: '',
          info: true,
          size: 1,
          outputType: 'jpeg',
          canScale: false,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          autoCropWidth: 400,
          autoCropHeight: 350,
          // 开启宽度和高度比例
          fixed: false,
          //fixedNumber: [4, 3]
        },
        editorText: '',
      }
    },
    validations: {
      caseData: {
        name: {
          required,
        }
      }
    },
    computed: {
      subAct() {
        let subAct = "";
        if (this.caseId != "") {
          subAct = "upd_case";
        } else {
          subAct = "insertCase";
        }
        return subAct;
      }

    },
    mounted() {
      this.getData();
    },
    methods: {
      SrcJoint(val) {
        if (val) {
          let imgUrl = val.split("/");
          imgUrl = imgUrl.slice(3, 6);
          let imgUrlJoint = [];
          imgUrl.forEach(function (val) {
            imgUrlJoint += "/" + val
          })
          return imgUrlJoint;

        } else {
          return "";
        }

      },
      changeCheckBox: function (val) {
        if (val == 'Y') {
          return true;
        } else {
          return false;
        }
      },
      subCheckBox: function (val) {
        if (val) {
          return 'Y';
        } else {
          return 'N';
        }
      },
      getTime: function () {
        let time = new Date()
        let year = time.getFullYear();
        let month = time.getMonth();
        let date = time.getDate();
        let timedate = year + "-" + (month + 1) + "-" + date;
        return timedate;
      },
      formatSolution: function (s) {
        if (s) {
          return s.replace(/\s/g, '<br/>')
        } else return ''
      },
      editImage: function (index) {
        this.CloseUploadImg();
        this.imagesEdit = index;
        let val = this.imagesUploadsData[index]
        let imgUrl = val.split("/");
        imgUrl = imgUrl.slice(3, 6);
        let imgUrlJoint = [];
        imgUrl.forEach(function (val) {
          imgUrlJoint += "/" + val
        })

        this.uploadImageOption.img = imgUrlJoint
      },
      AddImages: function () {
        this.imagesEdit = ""
        this.ShowUploadBox = !this.ShowUploadBox;
        this.uploadImageOption.img = "./assets/images/uploadimg-bg.png"
      },
      removeImage: function (index) {
        this.imagesUploadsData.splice(index, 1)
      },
      SubmitImg: function () {
        this.$refs.cropperImages.getCropBlob((data) => {
          let self = this;
          let file = data;
          let filetype = file.type.split("/");
          file.name = "image" + "." + filetype[filetype.length - 1]
          let param = new FormData() // 创建form对象
          param.append('file', file, file.name) // 通过append向form对象添加数据
          param.append('dir', 'image') // 添加form表单中其他数据
          let config = {
            headers: {'Content-Type': 'multipart/form-data'}
          }
          // 添加请求头
          axios.post('/HtmlImgUpload.do', param, config).then(response => {
            let imgUrl = response.data.url;
            self.CloseUploadImg();
            if (self.imagesEdit != "") {
              self.imagesUploadsData[self.imagesEdit] = imgUrl;
            } else {
              self.imagesUploadsData.push(imgUrl);
            }
          })
        })
      },
      CloseUploadImg: function () {
        this.ShowUploadBox = !this.ShowUploadBox;
      },
      format: function (time, format) {
        var t = new Date(time);
        var tf = function (i) {
          return (i < 10 ? '0' : '') + i
        };
        return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
          switch (a) {
            case 'yyyy':
              return tf(t.getFullYear());
              break;
            case 'MM':
              return tf(t.getMonth() + 1);
              break;
            case 'mm':
              return tf(t.getMinutes());
              break;
            case 'dd':
              return tf(t.getDate());
              break;
            case 'HH':
              return tf(t.getHours());
              break;
            case 'ss':
              return tf(t.getSeconds());
              break;
          }
        })
      },
      uploadImg: function (e, num) {

        //上传图片
        //this.uploadImageOption.img
        var file = e.target.files[0]
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          return false
        }
        var reader = new FileReader();
        reader.onload = (e) => {
          let data
          if (typeof e.target.result === 'object') {
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target.result
          }
          if (num === 1) {
            this.uploadImageOption.img = data
          } else if (num === 2) {
            this.cropperImages.img = data
          }
        }
        reader.readAsDataURL(file);
      },
      onContentChange: function (val) {
        this.editorText = val
      },
      editSubmit: function () {
        let self = this;
        let act = this.subAct;
        let updataTime = this.caseData.updataTime;

        let newDate = this.format(updataTime, 'yyyy-MM-dd')
        //let newDate = /\d{4}-\d{1,2}-\d{1,2}/g.exec(updataTime);
        let hasImages = this.imagesUploadsData.length <= 0;


        if (this.$v.$invalid || hasImages) {
          alert("信息有误，请核对后重新提交")
        } else {
          axios({
            url: "/HtmlInter.do",
            method: 'post',
            data: {
              act: act,
              userkey: this.caseData.store,
              id: this.caseId,
              store: this.caseData.store,
              storeId: this.caseData.storeId,
              model: this.caseData.model,
              name: this.caseData.name,
              propinpai: this.caseData.propinpai,
              brand: this.caseData.brand,
              keywords: this.caseData.keywords,
              description: this.caseData.description,
              warranty: this.caseData.warranty,
              level: this.caseData.level,
              updataTime: newDate,
              price: this.caseData.price,
              annex: this.caseData.annex,
              content: this.caseData.content,
              ifUsed: this.subCheckBox(this.ifUsed),
              sellOut: this.subCheckBox(this.sellOut),
              ispackage: this.subCheckBox(this.ispackage),
              depreciate: this.subCheckBox(this.depreciate),
              propic: this.SrcJoint(this.imagesUploadsData[0]),
              propic2: this.SrcJoint(this.imagesUploadsData[1]),
              propic3: this.SrcJoint(this.imagesUploadsData[2]),
              propic4: this.SrcJoint(this.imagesUploadsData[3]),
              propic5: this.SrcJoint(this.imagesUploadsData[4])
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
              alert(res.data.message)

            }
          )
        }

      },
      getData: function () {
        if (this.caseId != "") {
          let self = this;
          axios({
            url: "/HtmlInter.do",
            method: 'post',
            data: {
              act: "case_ShowDate",
              id: this.caseId
            },
            transformRequest: [function (data) {
              let ret = "";
              for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret;
            }],
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function (res) {
            self.caseData = res.data;
            self.imagesUploadsData = res.data.imgList;
            self.caseData.depreciate = self.changeCheckBox(self.caseData.depreciate);
            self.caseData.ifUsed = self.changeCheckBox(self.caseData.ifUsed);
            self.caseData.ispackage = self.changeCheckBox(self.caseData.ispackage);
            self.caseData.sellOut = self.changeCheckBox(self.caseData.sellOut);

          })
        }
      }
    },
    components: {
      NavHeader,
      NavFooter,
      Datepicker,
      VueCropper,
      VueKindEditor
    }
  }
</script>

<style scoped>

</style>
