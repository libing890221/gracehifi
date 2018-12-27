<template>
  <div>
    <nav-header></nav-header>
    <slide-banner :bannerdata='bannerColumn'></slide-banner>
    <div class="width news">
      <classify-menu :menuData="this.menuData" :menuTitle="this.menuTitle" @activeType="routerColumn"></classify-menu>
      <div id="list" class="case-list">
        <div class="case-title">{{columnName}}</div>
        <div class="case-choose">
          <div class="choose-search">
            <button type="button" @click="NewsSearch"><img src="static/images/newsfind.png" alt=""></button>
            <input type="text" placeholder="请输入关键字" v-model="keyWorld">
          </div>
        </div>
        <div v-if="this.noData">{{this.dataMsg}}</div>
        <div v-if="!this.noData">
          <transition-group name="flip-list " tag="div" class="list-box style1Box">
            <div class="case-item style1" v-if="ShowDate" v-for="(newsItem,index) in caseNumbers" :key="index">
              <div @click="runRouterintroduce(newsItem.id)" style="overflow: hidden;">
                <div class="case-img"><img :src="newsItem.news_pic"></div>
                <div class="case-text">
                  <strong>{{newsItem.title}}</strong>
                  <p>{{newsItem.content}}</p>
                </div>
              </div>
            </div>
          </transition-group>
          <mo-paging
            :page-index="currentPage"
            :total="ShowDateLength"
            :pageSize="parseInt(this.showRowsnum)"
            @change="pageChange">
          </mo-paging>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import '@/assets/css/caseList.css'
  import NavHeader from "@/components/NavHeader.vue"
  import NavFooter from "@/components/NavFooter.vue"
  import ClassifyMenu from "@/components/ClassifyMenu.vue"
  import SlideBanner from "@/components/SlideBanner.vue"
  import MoPaging from "@/components/MoPaging.vue"
  import axios from "axios"

  export default {
    name: "caselist",
    data() {
      return {
        bannerColumn: this.$route.params.id,
        noData: false,
        dataMsg: "暂无新闻",
        showRowsnum: 5,//默认显示个数
        showRows: 6, // 显示选项
        ShowDateLength: 0,
        currentPage: 1, //当前页码
        ShowDate: [""],
        keyWorld: "",
        menuData: ["音频新闻", "技能提升", "真空管专栏", "零件解析", "独家原创", "HIFI-SHOW", "HIFI收藏品", "往日经典"],
        menuTitle: '新闻分类'
      }
    },
    mounted() {
      this.getNewsData();
    },
    computed: {
      columnName: function () {
        let ca = this.$route.params.id;
        let columnName = "信息分类";
        switch (ca) {
          case "news1":
            columnName = '往日经典';
            break;
          case "news2":
            columnName = 'HIFI收藏品';
            break;
          case "news3":
            columnName = '技能提升';
            break;
          case "news4":
            columnName = 'HIFI-SHOW';
            break;
          case "news5":
            columnName = '真空管专栏';
            break;
          case "news6":
            columnName = '独家原创';
            break;
          case "news7":
            columnName = '零件解析';
            break;
          case "audionews1":
            columnName = '音频新闻';
            break;
        }
        return columnName;
      },
      caseNumbers: function () {
        if (this.ShowDateLength > 0) {
          this.currentPage = Number(localStorage.getItem("PageIndex") || 1);
          if ((this.currentPage - 1) * this.showRowsnum >= this.ShowDate.length) {
            var pageslicedown = (this.currentPage - 1) * this.showRowsnum;
          } else {
            var pageslicedown = (this.currentPage - 1) * this.showRowsnum;
          }
          var pagesliceup = this.currentPage * this.showRowsnum > this.ShowDate.length ? this.ShowDate.length : this.currentPage * this.showRowsnum;
          return this.ShowDate.slice(pageslicedown, pagesliceup);
        }
      }
    },
    watch: {
      $route(to, from) {
        this.keyWorld = "";
        this.getNewsData();
      }
    },
    methods: {
      Datamatching: function (val) {
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
        localStorage.setItem("column", column);
        this.$router.push({"name": 'news', params: {"id": column}});
      },
      runRouterintroduce: function (id) {
        //this.$router.push({name: "NewsContent", params: {"id": id}})
        window.location.href = 'http://new.gracehifi.com/shownews/'+id
      },
      routerColumn: function (msg) {
        this.Datamatching(msg);
        localStorage.setItem("PageIndex", 1);
        this.getNewsData();
      },
      NewsSearch: function () {

        let self = this;
        let ca = this.$route.params.id;
        let newsKeyword = this.keyWorld;

        axios({
          url: '/HtmlInter.do',
          method: 'post',
          data: {
            act: 'newsList',
            ca: ca,
            newsKeyword: newsKeyword
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
          self.noData = !res.data.result;
          if (res.data.result) {

            localStorage.setItem("PageIndex", "1");

            self.ShowDate = res.data.resultList;
            self.ShowDateLength = res.data.resultList.length;

          }

        }, function (res) {

        });

      },

      getNewsData: function () {
        let self = this;
        //let ca = localStorage.getItem("column")||"";
        let ca = this.$route.params.id;
        axios({
          url: '/HtmlInter.do',
          method: 'post',
          data: {
            act: 'newsList',
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
          self.noData = !res.data.result;
          if (res.data.result) {
            self.ShowDate = res.data.resultList;
            self.ShowDateLength = res.data.resultList.length;
          }

        }, function (res) {

        });

      },
      pageChange(page) {
        this.currentPage = page;
        localStorage.setItem("PageIndex", page);
        this.getNewsData();
      }
    },
    components: {
      NavHeader,
      NavFooter,
      ClassifyMenu,
      SlideBanner,
      MoPaging
    }
  }
</script>

<style scoped>
  .case-choose {
    height: 90px;

  }

  .case-list .choose-search {
    width: 740px;
    border: none;
    border-bottom: 1px solid #ccc;
    border-radius: 0;
  }

  .case-list .choose-search {
    height: 46px;
  }

  .case-list .choose-search input {
    height: 46px;
    line-height: 46px;
  }

  .case-list .choose-search button {
    float: left;
    border: none;
    width: 46px;
    height: 46px;
    line-height: 46px;
    text-align: center;
    background: none;
  }
  @media only screen and (max-width: 640px) {
    .case-list .choose-search input {
      width: 600px;
    }

    .case-list .choose-search {
      width: 90%;
      display: block;
    }

    .case-list .choose-search input {
      width: 100%;
    }
    .case-list .choose-search {
      margin-left: 5%;
    }
  }

</style>
