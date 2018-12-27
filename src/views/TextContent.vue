<template>
<div>
  <nav-header></nav-header>
  <div class="width text-content-box">

      <div class="content-title">
        {{dataTitle}}
      </div>
      <div class="text-content" v-html="ContentData">

      </div>

  </div>
  <nav-footer></nav-footer>
</div>
</template>

<script>
  import NavHeader from "@/components/NavHeader.vue"
  import NavFooter from "@/components/NavFooter.vue"
  import  axios from 'axios'
    export default {
      name: "TextContent",
      data(){
          return{
            dataTitle:'',
            ContentData:[]
          }
      },
      watch:{
        $route(to,from){
          this.getData();
        }
      },
      mounted(){
        this.getData()
      },
      methods:{
        getData: function () {
          let self = this;
          let ca = this.$route.params.id;

          switch (ca){
            case 'gywm':
              this.dataTitle ="服务项目"
              break;
            case 'lxwm':
              this.dataTitle ="联 络"
              break;
          }

          axios({
            url: '/HtmlInter.do',
            method: 'post',
            data: {
              act: 'show_contactus',
              ca: ca
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

            self.ContentData = res.data.content

          }, function (res) {

          });
        }
      },
      components: {
        NavHeader,
        NavFooter
      }
    }
</script>

<style scoped>
.content-title {
  font-size: 24px;
  color: #238a34;
  font-weight: 700;
  width: 100%;
  margin-top: 60px;
  text-align: center;
}
  .text-content {
    margin: 60px auto;
    width: 80%;
  }
</style>
