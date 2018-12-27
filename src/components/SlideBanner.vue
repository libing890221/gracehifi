<template>
  <div>

    <swiper :options="swiperOption" ref="mySwiper" class="slide-banner"  v-if="IsbannerDataImg">

      <swiper-slide v-for="(bannerImg,index) in bannerDataImg" :key="index"><a
        :href="bannerImg.collink"><img :src="bannerImg.colpic"></a></swiper-slide>

      <div v-if="bannerDataImg.length>2 || isState" class="swiper-pagination" slot="pagination"></div>
      <div v-if="bannerDataImg.length>2 || isState" class="swiper-button-prev" slot="button-prev"></div>
      <div v-if="bannerDataImg.length>2 || isState" class="swiper-button-next" slot="button-next"></div>

    </swiper>

  </div>
</template>

<script>
  require('swiper/dist/css/swiper.css')
  import "./../assets/css/slidebanner.css"
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import axios from 'axios'

  export default {
    name: "slide-banner",
    data() {
      return {
        swiperOption: {
          notNextTick: true,
          autoplay: 3000,
          effect: "coverflow",
          loop: true,
          grabCursor: false,
          setWrapperSize: true,
          observeParents: true,
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          pagination: '.swiper-pagination',
          paginationClickable: true
        },
        bannerDataImg: [],
        IsbannerDataImg: false,
        isState: false
      }
    },
    props: {
      bannerdata: {
        type: String
      }
    },
    mounted() {
      this.getBanner();
    },

    methods: {
      getBanner: function () {
        let self = this;
        let bannerColumn = this.$route.params.id;
        let column = this.bannerdata;
        if (column != 'home') {
          this.isState = false;

          switch (column) {

            case "news1":
              bannerColumn = '往日经典';
              break;
            case "news2":
              bannerColumn = 'HIFI收藏品';
              break;
            case "news3":
              bannerColumn = '技能提升';
              break;
            case "news4":
              bannerColumn = 'HIFI-SHOW';
              break;
            case "news5":
              bannerColumn = '真空管专栏';
              break;
            case "news6":
              bannerColumn = '独家原创';
              break;
            case "news7":
              bannerColumn = '零件解析';
              break;
            case "audionews1":
              bannerColumn = '音频新闻';
              break;
          }
          axios({
            url: '/HtmlInter.do',
            method: 'post',
            data: {
              act: 'col_pic',
              ca: bannerColumn
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
            self.bannerDataImg = res.data.resultList;
            if( self.bannerDataImg){
              self.IsbannerDataImg = true;
            }


          }, function (res) {

          })
        } else {
          this.IsbannerDataImg = true;
          this.isState = true;
          this.bannerDataImg = [
            {
              colpic: "static/images/home-banner-1.png",
              collink: '#'
            }
          ]

        }
      }

    },
    components: {
      swiper,
      swiperSlide
    }
  }

</script>

<style scoped>

</style>
