<template>
  <div>
    <nav-header></nav-header>
    <slide-banner :bannerdata='bannerColumn'></slide-banner>
    <div class="width">
      <classify-menu :menuData="this.menuData" :menuTitle="this.menuTitle" @activeType="reloadForType"></classify-menu>
      <div id="list" class="case-list">
        <div class="case-title">{{this.pageTitle}}</div>
        <div class="case-choose">
          <div class="choose-item choose-item-1">
            <i></i>
            <select v-model="arrangementModel" @click="sort">
              <option v-for="arrangement in arrangements">{{arrangement}}</option>
            </select>
          </div>
          <div class="choose-item choose-item-2" @click="changeShowNum">
            <select v-model="showRowsnum">
              <option v-for="showNum in showRows">{{showNum}}</option>
            </select>
            <i></i>
          </div>
          <div class="choose-item choose-item-3">
                    <span :class="{active: Style}" @click="changeStyle">
                      <i></i>
                      <i></i>
                      <i></i>
                    </span>
            <span :class="{active: !Style}" @click="changeStyle">
                      <i></i>
                      <i></i>
                      <i></i>
                      <i></i>
                    </span>
          </div>
          <div class="choose-item choose-item-4">
            <span @click="listInit('new')">最新商品</span>
            <span @click="listInit('hot')">热门商品</span>
          </div>
          <div class="choose-search">
            <button type="button" @click="caseSearch"><img src="static/images/newsfind.png" alt=""></button>
            <input type="text" placeholder="请输入关键字" v-model="SearchValue">
          </div>

        </div>
        <div v-if="!this.noData">{{this.dataMsg}}</div>
        <div v-if="this.noData">

          <transition-group name="flip-list" tag="div" class="list-box" :class="{style1Box: Style}">
            <div class="case-item" :class="{style1: Style}" v-for="caseitem in caseNumbers" v-bind:key="caseitem.id">
              <div @click="runRouterintroduce(caseitem.id)">
                <div class="case-img"><img :src=caseitem.introduceImg></div>
                <div class="sign">
                  <u v-if="caseitem.newComer">新售</u>
                  <u v-if="caseitem.sellOut">售完</u>
                  <u class="case-sign-depreciate" v-if="caseitem.depreciate">降价</u>
                </div>
                <div class="case-text">
                  <h2>{{caseitem.name}}</h2>
                  <span>{{caseitem.brand}}</span>
                  <strong>{{caseitem.name}}</strong>
                  <span>{{caseitem.model}}</span>
                  <h3>{{caseitem.store}}</h3>
                  <h4>{{caseitem.price}}<i>元</i></h4>
                </div>
                <div class="case-level" v-if=Style>
                  <h2>中古品</h2>
                  <span>{{caseitem.level}}</span>
                </div>
              </div>
            </div>
          </transition-group>
          <mo-paging
            :page-index="currentPage"
            :total="this.caseDataLength"
            :pageSize="parseInt(this.showRowsnum)"
            @change="pageChange">
          </mo-paging>
        </div>
        <case-history @routerReturn="runRouterintroduce"></case-history>
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
  import CaseHistory from "@/components/CaseHistory.vue"
  import axios from "axios"

  export default {
    name: "caselist",
    data() {
      return {
        pageTitle: "最新商品",
        Shopid: localStorage.getItem("shop") || "",
        bannerColumn: localStorage.getItem("caseList"),
        caseType: this.$route.params.id,
        Style: false, //默认列表样式
        noData: false,
        dataMsg: "",
        SearchValue: "",
        showRowsnum: Number(localStorage.getItem("showRowsnum") || 6), //默认显示个数
        arrangementModel: "时间降序", // 默认排序
        showRows: [6, 9, 12, 15], // 显示选项
        caseDataLength: 0,
        currentPage: 1, //当前页码
        arrangements: ["时间升序", "时间降序", "价格降序", "价格升序"], // 排序选项
        caseShowDate: [""],
        ishot: "N",
        menuData: ["音源", "功放", "音箱", "真空管放大器", "黑胶唱机", "西电专区", "耳机专区", "其他"],
        menuTitle: '产品分类'
      }
    },
    mounted() {
      this.getGoodsList();
    },
    watch: {
      $route(to, from) {
        //this.caseType = ;
        this.getGoodsList();
      }
    },
    computed: {
      caseNumbers: function () {
        if (this.caseShowDate.length >0) {
          switch (this.arrangementModel) {
            case "价格升序":
              var caseData = this.caseShowDate.sort((a, b) => a.price - b.price);
              break;
            case "价格降序":
              var caseData = this.caseShowDate.sort((a, b) => b.price - a.price);
              break;
            case "时间升序":
              var caseData = this.caseShowDate.sort((a, b) => a.updataTime - b.updataTime);
              break;
            case "时间降序":
              var caseData = this.caseShowDate.sort((a, b) => b.updataTime - a.updataTime);
              break;
          };
          this.currentPage = Number(localStorage.getItem("PageIndex") || 1);
          if ((this.currentPage - 1) * this.showRowsnum >= caseData.length) {
            var pageslicedown = (this.currentPage - 1) * this.showRowsnum;
          } else {
            var pageslicedown = (this.currentPage - 1) * this.showRowsnum;
          }
          var pagesliceup = this.currentPage * this.showRowsnum > caseData.length ? caseData.length : this.currentPage * this.showRowsnum;
          return caseData.slice(pageslicedown, pagesliceup);
      }else{

      }
      }
    },
    inject: ['reload'],
    methods: {
      runRouterintroduce: function(id){
        //this.$router.push({name:"CaseIntroduce",params:{"id": id} })
        window.location.href = 'http://new.gracehifi.com/showcase/'+id
      },
      reloadForType: function (msg) {
        localStorage.setItem("caseSearch", "");
        localStorage.setItem("PageIndex", 1);
        this.caseType = msg;
      },
      listInit: function (val) {
        localStorage.setItem("caseList",(val));
        this.caseType = '音源';
        this.$router.push({name:'caseList',params:{id: '音源'}});
        localStorage.setItem("shop", "");
        localStorage.setItem("caseSearch", "");
        localStorage.setItem("PageIndex", 1);
        this.reload();
      },
      caseSearch: function () {
        localStorage.setItem("caseSearch", (this.SearchValue));
        this.getGoodsList();
      },
      getGoodsList: function () {

        let self = this;
        let caseColumn =  localStorage.getItem("caseList");
        this.ishot = caseColumn == "hot" ? 'Y' : 'N';
        this.pageTitle = this.ishot == 'Y'? "热门商品":"最新商品";

        let caseType =this.caseType;
        let caseKeyword = localStorage.getItem("caseSearch") || "";
        //let userkey = localStorage.getItem("author") || "";

        axios({
          url: '/HtmlInter.do',
          method: 'post',
          data: {
            act: 'case_list',
            shopId: this.Shopid,
            caseType: caseType,
            caseKeyword: caseKeyword,
            ishot: this.ishot
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
          self.noData = res.data.result;
          self.dataMsg = res.data.message;
          if (res.data.result) {
            self.caseShowDate = res.data.resultList;
            self.caseDataLength = res.data.resultList.length || 1;
            if (self.Shopid != "") {
              self.pageTitle = res.data.resultList[0].store;
            }
          } else {
            self.caseShowDate = [];
          }

        }, function (res) {

        })
      },
      changeStyle: function (index) {
        this.Style = !this.Style;
      },
      sort: function () {
        this.currentPage = 1;
        localStorage.setItem("PageIndex", 1);
      },
      changeShowNum: function () {
        localStorage.setItem("showRowsnum", (this.showRowsnum));
        localStorage.setItem("PageIndex", 1);
      },
      pageChange(page) {
        this.currentPage = page;
        localStorage.setItem("PageIndex", page);
        this.getGoodsList();
      }
    },
    components: {
      NavHeader,
      NavFooter,
      ClassifyMenu,
      SlideBanner,
      MoPaging,
      CaseHistory
    }
  }
</script>

<style scoped>
  @media only screen and (max-width: 640px) {
    .case-item.style1 {
      height: auto;
      margin-top: 20px;
    }
    .case-item.style1 .case-text {
      margin-top: 5px;
      width: 100%;
    }
    .case-level {
      width: 59%;
      top: 50px;
      height: 40px;
    }
    .case-level h2,
    .case-level span{
      float: left;
    }
    .case-item.style1 .case-text h2 {
      display: none;
    }
    .case-item.style1 .case-text h4 {
      width: 100%;
    }
    .case-item.style1 .case-text span {
      display: none;
    }
  }
</style>
