<template>
  <div>
    <nav-header></nav-header>

    <div class="width news">
      <classify-menu :menuData="this.menuData" :menuTitle="this.menuTitle" @activeType="routerColumn"></classify-menu>
      <div class="news-content-box">
        <div class="title">
          <h2>{{newsData.title}}</h2>
          <time>{{newsData.datetime}}</time>
        </div>
        <div class="news-content" v-html="newsData.content">

        </div>

      </div>

    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import NavHeader from "@/components/NavHeader.vue"
  import NavFooter from "@/components/NavFooter.vue"
  import ClassifyMenu from "@/components/ClassifyMenu.vue"
  import  axios from 'axios'
  export default {
    name: "NewsContent",
    data() {
      return {
        menuData: ["音频新闻", "技能提升", "真空管专栏", "零件解析", "独家原创","HIFI-SHOW","HIFI收藏品","往日经典"],
        menuTitle: '新闻分类',
        newsData:[]
      }
    },
    mounted(){
      this.getNewsData();
    },
    methods: {
      Datamatching: function(val){
        let column ="";
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
        localStorage.setItem("column",column);
        this.$router.push({"name":'news',params:{"id":column}});
      },
      routerColumn: function (msg) {
        this.Datamatching(msg);
        localStorage.setItem("PageIndex", 1);
        this.getNewsData();
      },
      getNewsData: function () {

        let self = this;
        let newId = this.$route.params.id;
        axios({
          url: '/HtmlInter.do',
          method: 'post',
          data: {
            act: 'newContent',
            newId: newId
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
         self.newsData = res.data
        }, function (res) {

        });

      }

    },
    components: {
      NavHeader,
      NavFooter,
      ClassifyMenu
    }
  }
</script>

<style scoped>
.news-content-box {
  float: right;
  width:  780px;
  margin-top: 40px;
}
.news-content-box .title {
  margin-bottom: 40px;
}
.news-content-box .title h2 {
  display: block;
  margin: 20px 0;
  font-size: 22px;
  text-align: center;
}
.news-content-box .title time {
  display: block;
  padding-right: 20px;
  text-align: right;
  font-size: 14px;
  color: #cccccc;;
  font-style: italic;
}
  .news-content {
    padding-bottom: 60px;
    font-size: 14px;
    line-height: 22px;
    color: #0b0b0b;
  }
</style>
