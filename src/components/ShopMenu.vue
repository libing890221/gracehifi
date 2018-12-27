<template>
  <div>
  <div id="category" class="case-category">
    <div class="category-title"><a href="#">{{this.menuTitle}}</a></div>
    <div class="category-triangle"></div>

    <div class="category-item" v-for="categoryItem in categoryData" :class="{active: isActive(categoryItem) }">
      <div class="category-subclass-1" @click="linkRun(categoryItem)">
        <ul>
          <li><i></i><span>{{ categoryItem }}</span></li>
        </ul>
      </div>

    </div>
  </div>
  </div>
</template>

<script>
    import "./../assets/css/classify.css"
    import axios from "axios"
    export default {
        name: "classifymenu",
       data(){
          return {
            activeType: this.$route.params.id,
            Typecoding: this.$route.params.id,
            categoryData: this.menuData
          }
       },
      mounted(){
        this.activeType = this.$route.params.id;
        this.Typecoding = this.$route.params.id;
      },
      props:{
        menuData:{
          type: Array,
          default: []
        },
        menuTitle:{
          type: String,
          default: ""
        }
      },
      watch: {
        $route(to, from) {
          let typeTitle =  this.$route.params.id;
          switch (typeTitle) {
            case "news1":
              this.Typecoding = '往日经典';
              break;
            case "news2":
              this.Typecoding = 'HIFI收藏品';
              break;
            case "news3":
              this.Typecoding = '技能提升';
              break;
            case "news4":
              this.Typecoding = 'HIFI-SHOW';
              break;
            case "news5":
              this.Typecoding = '真空管专栏';
              break;
            case "news6":
              this.Typecoding = '独家原创';
              break;
            case "news7":
              this.Typecoding = '零件解析';
              break;
            case "audionews1":
              this.Typecoding = '音频新闻';
              break;
          }
        }
      },
      methods:{
          isActive: function(val){
            let typeTitle =  this.$route.params.id;
            switch (typeTitle) {
              case "news1":
                this.activeType = '往日经典';
                break;
              case "news2":
                this.activeType = 'HIFI收藏品';
                break;
              case "news3":
                this.activeType = '技能提升';
                break;
              case "news4":
                this.activeType = 'HIFI-SHOW';
                break;
              case "news5":
                this.activeType = '真空管专栏';
                break;
              case "news6":
                this.activeType = '独家原创';
                break;
              case "news7":
                this.activeType = '零件解析';
                break;
              case "audionews1":
                this.activeType = '音频新闻';
                break;
              case "new":
                this.activeType = '音源';
                break;
            }

            if(val == this.activeType){
              return true;
            }
          },
          linkRun: function (msg){
            this.activeType = msg;
            //localStorage.setItem("shopMenu",msg)
            this.$emit('activeType',(msg));
          }
      }
    }
</script>

<style scoped>

</style>
