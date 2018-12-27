<template>
  <div class="history" >
    <div class="history-title">
      <h2>浏览过的商品</h2>
    </div>
    <div class="swiper-history">
      <div id="swiperhistory" class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(historyitem,index) in this.historyData" :key="index">
            <div @click="routerRun(historyitem.id)">
              <div class="history-img" :style="{ 'background-image': 'url(' + historyitem.introduceImg + ')' }"></div>
              <span>{{historyitem.name}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </div>
  </div>
</template>

<script>

  import Swiper from 'swiper'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  require('swiper/dist/css/swiper.css')
  import "./../assets/css/swiper-history.css"

  import axios from "axios"

  export default {
    name: "history",
    data() {
      return {
        hasHistory: true,
        historyData: ["assets/images/default-case.jpg", "assets/images/default-case.jpg", "assets/images/default-case.jpg", "assets/images/default-case.jpg", "assets/images/default-case.jpg"]
      }
    },
    computed: {
      swiperhistory() {
        return this.$refs.swiperhistory.swiper;
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
      routerRun: function (id) {
        let caseId = id;
        this.$emit('routerReturn', caseId);
      },
      getData: function () {
        let self = this;
        let dataId =  JSON.parse(localStorage.getItem('historyID'));

        axios({
          url: '/HtmlInter.do',
          method: 'post',
          data: {
            act: 'case_history',
            caseHistoryId: dataId
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
            self.historyData = res.data.resultList;
            if (res.data.resultList.length > 3) {
              self.$nextTick(function () {
                var swiperhistory = new Swiper("#swiperhistory", {
                  init: true,
                  slidesPerView: 4,
                  spaceBetween: 30,
                  loop: true,
                  loopedSlides: 4,
                  nextButton: '.swiper-button-next',
                  prevButton: '.swiper-button-prev',
                  observer: true,
                  observeParents: true
                })
                /*self.swiperhistory.init();
                self.reload();*/
              })
            }

          } else {
            self.hasHistory = false;
          }
        }, function (res) {

        });
      }
    },
    watch:{

    },
    components: {
      swiper,
      swiperSlide
    }
  }
</script>

<style scoped>

</style>
