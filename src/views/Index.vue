<template>
  <div>
    <nav-header></nav-header>
    <article class="wrap home">

      <section class="home-banner">
        <slide-banner :bannerdata='bannerColumn'></slide-banner>
      </section>
      <section>
        <div class="item-2-box">
          <div class="item-2-bg"></div>
          <div class="slide-2-box">
            <div id="J-slide-pro" class="swiper-container item-2-slide-box">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(caseItem,index) in caseData" :key="index" @click="RunGoods(caseItem.id)">

                    <h1>New Arrival</h1>
                    <div class="img-box"><img :src="caseItem.introduceImg"></div>
                    <div class="cover">
                      <div class="img-box"><img :src="caseItem.introduceImg"></div>
                      <span>QUICK VIEW</span>
                    </div>
                    <hgroup>
                      <h3>{{caseItem.name}}</h3>
                      <h4>产品价格：{{caseItem.price}} 元</h4>
                    </hgroup>

                </div>
                <!--/ .swiper-slide -->
              </div>
              <!--/ .swiper-wrapper -->
            </div>
            <!--/ .swiper-container -->
            <div class="swiper-button-prev home-goods-prev"></div>
            <div class="swiper-button-next home-goods-next"></div>
          </div>
          <!--/ .slide-2-box -->
        </div>
      </section>
      <section class="section-3">
        <div class="width">
          <div class="hot-goods">
            <h2><span>热门商品</span>

              <a @click="runCaseHot()">more</a>
            </h2>
            <dl class="images-list">
              <dd v-if="caseHotData" v-for="(caseHotItem,index) in caseHotData" :key="index"   @click="RunGoods(caseHotItem.id)">

                <div class="img-box"><img alt="" v-lazy="caseHotItem.introduceImg"></div>
                <h3>{{caseHotItem.name}}</h3>
                <span>产品价格：{{caseHotItem.price}}元</span>

              </dd>
            </dl>
          </div>
          <div class="source-goods">
            <h2><span>音源商品</span><a @click="runCase()">more</a></h2>
            <dl>
              <dd v-if="goodsData" v-for="(goods,index) in goodsData" :key="index"   @click="RunGoods(goods.id)">

                <div class="img-box"><img alt="" v-lazy="goods.introduceImg"></div>
                <span>{{goods.name}}</span>

              </dd>
              <dd v-for="(item,index) in this.flexSupplement(goodsData.length,6)"></dd>
            </dl>
          </div>
          <div class="viewpoint-goods">
            <h2><span>本站原创</span><router-link :to="{name:'news',params:{id: 'news6'}}">more</router-link></h2>
            <dl class="text-list">
              <dd v-if="standpointData" v-for="(standpointItem,index) in standpointData" :key="index"  @click="runPage(standpointItem.id)">

                   <p>{{standpointItem.title}}</p>

              </dd>
            </dl>
          </div>
        </div>
      </section>

      <section class="section-4">

        <div class="width">
          <div class="skill-up">

            <h2><span>技能提升</span><router-link :to="{name:'news',params:{id: 'news3'}}">more</router-link></h2>
            <dl class="text-list">
              <dd v-if="skillUpData" v-for="(skillUpItem,index) in skillUpData" :key="index"  @click="runPage(skillUpItem.id)">

                  <p>{{skillUpItem.title}}</p>

              </dd>
            </dl>

          </div>
          <!--/ .skill-up  [技能提升] -->

          <div class="valve">

            <h2><span>真空管专栏</span><router-link :to="{name:'news',params:{id: 'news5'}}">more</router-link></h2>
            <dl class="text-list">
              <dd v-if="valveData" v-for="(valveItem,index) in valveData" :key="index"  @click="runPage(valveItem.id)">

                <p>{{valveItem.title}}</p>

              </dd>
            </dl>

          </div>
          <!--/ .valve  [真空管] -->

          <div class="parts-parsing">
            <h2><span>零件解析</span><router-link :to="{name:'news',params:{id: 'news7'}}">more</router-link></h2>
            <dl class="images-list">
              <dd v-if="partsData" v-for="(parts,index) in partsData" :key="index" @click="runPage(parts.id)">

                <div class="img-box"><img v-lazy="parts.news_pic"></div>
                <h3>{{parts.title}}</h3>
                <p>{{parts.content}}</p>

              </dd>
            </dl>

          </div>
          <!--/ .parts-parsing  [零件解析] -->

        </div>

      </section>

      <section class="section-5">
        <div class="width">
          <div class="news-tab-box">
            <div class="news-tab-btn">
              <h3 v-for="(TabBtnItem,index) in TabBtn" :key="index" @mouseover="newsTab(index)" @click="newsTabRun(TabBtnItem)">
                <span>{{TabBtnItem}}</span></h3>
            </div>
            <div class="news-tab  swiper-wrapper">
              <div class="news-tab-con swiper-slide">
                <dl>
                  <dd v-if="hifiShowData" v-for="(hifiShowGoods,index) in hifiShowData" :key="index" @click="runPage(hifiShowGoods.id)">

                    <div class="img-box"><img v-lazy="hifiShowGoods.news_pic" alt=""></div>
                    <h3>{{hifiShowGoods.title}}</h3>

                  </dd>
                  <dd v-for="(item,index) in this.flexSupplement(this.hifiShowData.length,6)"></dd>
                </dl>
              </div>
              <div class="news-tab-con swiper-slide">
                <dl>
                  <dd v-if="hifiCollectData" v-for="(hifiCollect,index) in hifiCollectData"
                      :key="index" @click="runPage(hifiCollect.id)">

                    <div class="img-box"><img v-lazy="hifiCollect.news_pic" alt=""></div>
                    <h3>{{hifiCollect.title}}</h3>

                  </dd>
                  <dd v-for="(item,index) in this.flexSupplement(hifiCollectData.length,6)"></dd>
                </dl>
              </div>
              <div class="news-tab-con swiper-slide">
                <dl>
                  <dd v-if="OldClassicData" v-for="(OldClassic,index) in OldClassicData" :key="index" @click="runPage(OldClassic.id)">

                    <div class="img-box"><img v-lazy="OldClassic.news_pic" alt=""></div>
                    <h3>{{OldClassic.title}}</h3>

                  </dd>
                  <dd v-for="(item,index) in this.flexSupplement(OldClassicData.length,6)"></dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="hifi-news">
            <h2><span>音频新闻</span> <router-link :to="{name:'news',params:{id: 'audionews1'}}">more</router-link></h2>
            <dl class="text-list">
              <dd v-if="hifiNewsData" v-for="(hifiNewsItem,index) in hifiNewsData" :key="index" @click="runPage(hifiNewsItem.id)">

                <p>{{hifiNewsItem.title}}</p>

              </dd>
            </dl>
          </div>
        </div>
      </section>
      <!--/ .section-5 -->

    </article>
    <!--/ .wrap -->
    <nav-footer></nav-footer>

  </div>
</template>

<script>
  import './../assets/css/base.css'
  import './../assets/css/home.css'
  import './../assets/css/swiper-3.4.2.min.css'
  import Swiper from 'swiper'
  import NavHeader from '@/components/NavHeader.vue'
  import NavFooter from "@/components/NavFooter.vue"
  import SlideBanner from "@/components/SlideBanner.vue"
  import axios from 'axios'

  export default {
    name: "index",

    data() {
      return {
        pageName: "恩典音响",
        bannerColumn: "home",
        TabBtn: ["HIFI-SHOW", "HIFI收藏品", "往日经典"],
        caseData: [],
        caseHotData: [],
        standpointData: [],
        goodsData: [],
        skillUpData: [],
        valveData: [],
        partsData: [],
        hifiNewsData: [],
        hifiShowData: [],
        hifiCollectData: [],
        OldClassicData: [],
        user: {
          "name": "",
          "email": "",
          "subject": "",
          "message": ""
        },
        conSuccess: false
      }
    },
    metaInfo() {
      return {
        title: this.pageName,
        meta: [{
          name: 'keyWords',
          content: '恩典音响，音响，唱机，黑胶，音响网站，音响门户'
        }, {
          name: 'description',
          content: '恩典音响'
        }
        ]
      }
    },
    components: {
      SlideBanner,
      NavHeader,
      NavFooter
    },
    mounted() {
      this.getData()
    },
    methods: {
      newsTabRun: function(val){
        let add = "";
        switch (val){
          case 'HIFI-SHOW':
            add = 'news4';
            break;
          case 'HIFI收藏品':
            add = 'news2';
            break;
          case '往日经典':
            add = 'news1';
            break;
        }

        this.$router.push({name:'news',params:{id:add}});
      },
      detailRun: function(name,val){
        this.$router.push({name:name,params:{id:val}});
      },
      flexSupplement: function (leg, val) {
        let dataEmpty = [];
        let d = val - leg;
        for (let i = 0; i < d; i++) {
          dataEmpty.push(i)
        }
        return dataEmpty;
      },
      newsTab: function (val) {
        $(".news-tab-btn h3").removeClass("active");
        $(".news-tab-btn h3").eq(val).addClass("active");
        $(".news-tab-con").hide();
        $(".news-tab-con").eq(val).show()
      },
      RunGoods: function(id){
        window.location.href='http://new.gracehifi.com/showcase/'+id
      },
      runCaseHot: function(){
        localStorage.setItem("caseList",('hot'));
        this.$router.push({name:'caseList',params:{id: '音源'}})
      },
      runCase: function(){
        localStorage.setItem("caseList",('new'));
        this.$router.push({name:'caseList',params:{id: '音源'}})
      },
      runPage: function(id){
        window.location.href='http://new.gracehifi.com/shownews/'+id
      },
      getData: function () {
        let self = this;
        //最新商品
        axios.get('/HtmlInter.do', {params: {"act": 'case_index'}}).then(function (res) {
          if (res.data.result) {
            self.caseData = res.data.resultList;
            if (res.data.resultList.length > 3) {
              self.$nextTick(function () {

                function slide(){

                  var w = $(window).width();

                  if(w<640){
                    var swiper2 = new Swiper('#J-slide-pro', {
                      autoHeight: true,
                      loop: true,
                      slidesPerView: 1,
                      speed: 600,
                      spaceBetween: 10,
                      nextButton: '.home-goods-next',
                      prevButton: '.home-goods-prev',
                    });

                    $(".news-tab-con").show();
                    $(".news-tab-btn h3").first().addClass('active')

                    var tabsSwiper = new Swiper('.news-tab-box',{
                      speed:500,
                      onSlideChangeStart: function(){
                        $(".news-tab-btn .active").removeClass('active')
                        $(".news-tab-btn h3").eq(tabsSwiper.activeIndex).addClass('active')
                      }
                    })

                  }else{

                    var swiper2 = new Swiper('#J-slide-pro', {
                      autoHeight: true,
                      loop: true,
                      slidesPerView: 3,
                      speed: 600,
                      spaceBetween: 10,
                      nextButton: '.home-goods-next',
                      prevButton: '.home-goods-prev',
                    });
                  }

                };slide()

                $(window).resize(function () {

                  slide()

                })

              })
            }
          }
        }, function (res) {

        });

        //热门商品
        axios.get('/HtmlInter.do', {params: {"act": 'case_hot'}}).then(function (res) {
          if (res.data.result) {
            self.caseHotData = res.data.resultList;
          }
        }, function (res) {

        });

        //观点
        axios.get('/HtmlInter.do', {
          params: {
            "act": 'newsList',
            "ca": "news6",
            "cont": "10"
          }
        }).then(function (res) {
          if (res.data.result) {
            self.standpointData = res.data.resultList;
          }
        }, function (res) {

        });

        //音源商品
        axios.get('/HtmlInter.do', {params: {"act": 'case_video_index'}}).then(function (res) {
          if (res.data.result) {
            self.goodsData = res.data.resultList;
          }
        }, function (res) {

        });

        //技能提升
        axios.get('/HtmlInter.do', {
          params: {
            "act": 'newsList',
            "ca": "news3",
            "cont": "10"
          }
        }).then(function (res) {
          if (res.data.result) {
            self.skillUpData = res.data.resultList;
          }
        }, function (res) {

        });

        //真空管
        axios.get('/HtmlInter.do', {
          params: {
            "act": 'newsList',
            "ca": "news5",
            "cont": "10"
          }
        }).then(function (res) {
          if (res.data.result) {
            self.valveData = res.data.resultList;
          }
        }, function (res) {

        });

        //零件解析
        axios.get('/HtmlInter.do', {
          params: {
            "act": 'newsList',
            "ca": "news7",
            "cont": "3"
          }
        }).then(function (res) {
          if (res.data.result) {
            self.partsData = res.data.resultList;
          }
        }, function (res) {

        });

        //音频新闻
        axios.get('/HtmlInter.do', {
          params: {
            "act": 'newsList',
            "ca": "audionews1",
            "cont": "13"
          }
        }).then(function (res) {
          if (res.data.result) {
            self.hifiNewsData = res.data.resultList;
          }
        }, function (res) {

        });

        //HiFI-Show
        axios.get('/HtmlInter.do', {
          params: {
            "act": 'newsList',
            "ca": "news4",
            "cont": "6"
          }
        }).then(function (res) {
          if (res.data.result) {
            self.hifiShowData = res.data.resultList;
          }
        }, function (res) {

        });

        // HIFI收藏品
        axios.get('/HtmlInter.do', {
          params: {
            "act": 'newsList',
            "ca": "news2",
            "cont": "6"
          }
        }).then(function (res) {
          if (res.data.result) {
            self.hifiCollectData = res.data.resultList;
          }
        }, function (res) {

        });

        // 往日经典
        axios.get('/HtmlInter.do', {
          params: {
            "act": 'newsList',
            "ca": "news1",
            "cont": "6"
          }
        }).then(function (res) {
          if (res.data.result) {
            self.OldClassicData = res.data.resultList;
          }
        }, function (res) {

        });

      }
    }
  }

</script>

<style scoped>

</style>
