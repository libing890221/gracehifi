<template>
  <div class="drag">
    <div class="drag_bg"></div>
    <div class="drag_text">{{dragWorld}}</div>
    <div @mousedown="mousedownFn($event)" @touchstart="touchdownFn($event)" class="handler handler_bg"></div>
  </div>
</template>

<script>
  export default {
    name: "dragVerify",
    data() {
      return {
        beginClientX: 0,
        dragWorld: "滑动提交信息",
        maxwidth: 260,
        mouseMoveStata: false,
        confirmSuccess: false,
        conSuc: this.conSuccess
      }
    },
    methods: {
      mousedownFn: function (e) {
        this.mouseMoveStata = true;
        this.beginClientX = e.clientX;
      },
      touchdownFn: function (e) {
        this.mouseMoveStata = true;
        this.beginClientX = 0;
      },
      dragMouseup: function () {
        $('body').on('mouseup', (e) => {
          this.mouseMoveStata = false;
          var width = e.clientX - this.beginClientX;
          if (width < this.maxwidth) {
            $(".handler").css({'left': 0});
            $(".drag_bg").css({'width': 0});
          }
        })
      },
      dragMousemove: function () {

        if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
          $('.drag').on('touchmove', (e) => {

            if (this.mouseMoveStata) {
              var width = e.changedTouches[0].clientX - this.beginClientX;
              if (width > 0 && width <= this.maxwidth) {
                $(".handler").css({'left': width});
                $(".drag_bg").css({'width': width});
              } else if (width > this.maxwidth) {
                this.successFunction(e);
              }
            }
          })
        }

        else {
          $('.drag').on('mousemove', (e) => {
            if (this.mouseMoveStata) {
              var width = e.clientX - this.beginClientX;
              if (width > 0 && width <= this.maxwidth) {
                $(".handler").css({'left': width});
                $(".drag_bg").css({'width': width});
              } else if (width > this.maxwidth) {
                this.successFunction(e);
              }
            }
          })
        }

      },
      successFunction(e) {
        this.mouseMoveStata = false;
        if(this.conSuc){
          $(".handler").removeClass('handler_bg').addClass('handler_ok_bg');
          this.dragWorld = '信息提交中...'
          $(".drag").css({'color': '#fff'});
          $(".handler").css({'left': this.maxwidth});
          $(".drag_bg").css({'width': this.maxwidth});
          $('.drag').unbind('mousemove');
          $('body').unbind('mouseup');
          this.confirmSuccess = true;
        }else{
          $('.drag').on('mousedown',(e)=>{
            this.mouseMoveStata = true;
          });
          var width = e.clientX - this.beginClientX;
          $(".handler").css({'left': 0});
          $(".drag_bg").css({'width': 0});
          this.confirmSuccess = false;
        }
        this.$emit('confirmSuccess');

      }
    },
    props: {
      conSuccess: {
        type: Boolean,
        default:
          false
      }
    },
    mounted() {
      this.dragMousemove();
      this.dragMouseup();
      this.touchdownFn();
    },
    watch: {
      conSuccess (val) {
          this.conSuc = val;
          if(val){
            $(".handler").removeClass('handler_bg').addClass('handler_ok_bg');
            this.dragWorld = '信息提交中...'
            $(".drag").css({'color': '#fff'});
            $(".handler").css({'left': this.maxwidth});
            $(".drag_bg").css({'width': this.maxwidth});
            $('.drag').unbind('mousemove');
            $('body').unbind('mouseup');
            this.confirmSuccess = true;
          }
      }
    }


  }
</script>

<style scoped>
  .drag {
    position: relative;
    background-color: #e8e8e8;
    width: 300px;
    height: 44px;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 60px;
    line-height: 34px;
    text-align: center;
    border-radius: 21px;
  }

  .handler {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 42px;
    height: 42px;
    border: 1px solid #ccc;
    border-radius: 21px;
    cursor: move;
  }

  .handler_bg {
    background: #fff url("./../../static/images/regist-slide-icon.png");
  }

  .handler_ok_bg {
    background: #fff url("./../../static/images/regist-icon.png");
  }

  .drag_bg {
    border-radius: 21px;
    background-color: #238a34;
    padding-left: 44px;
    height: 44px;
    width: 0px;
  }

  .drag_text {
    position: absolute;
    line-height: 44px;
    top: 0px;
    width: 300px;
    font-size: 14px;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    -o-user-select: none;
    -ms-user-select: none;
  }
</style>
