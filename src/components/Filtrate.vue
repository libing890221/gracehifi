<template>
  <div class="filtrate-box">
    <div class="filtrate-rank">
      <div class="choose-all choose-item">
        <input id="chooseAll" type="checkbox" :checked="isCheckAll" @click="checkAll()">
        <label for="chooseAll">全选</label>
      </div>
      <div class="choose-all choose-item">
        <button @click="caseDelet()">删除商品</button>
        <button @click="runRouter('')">添加商品</button>
      </div>
      <div class="choose-search choose-item">
        <input type="text" placeholder="请输入关键字" v-model="SearchValue">
        <button type="button" @click="caseSearch">查询</button>
      </div>

    </div>
    <div class="uesrShop-list">
      <div class="uesrShop-list-item" v-for="(item,index) in caseData" :key="index" :class="{pending : item.ischeck=='N'}">
        <span class="pending-msg">等待审核</span>
        <div class="uesrShop-item-title"><input type="checkbox" :value="item.id" v-model="checkedNames"><span>商品编号：{{item.updataTime}}{{item.id}}</span></div>
        <div class="uesrShop-image"><img :src="item.introduceImg" alt=""></div>
        <div class="uesrShop-property">

          <h2>{{item.name}}</h2>
          <span>型号：{{item.brand}}</span>
          <span>分类：{{item.model}}</span>
          <p>
            <u v-if="item.ifUsed">二手</u>
            <u v-if="item.level">{{item.level}}</u>
            <u v-if="item.newComer">新品</u>
          </p>
        </div>
          <div class="uesrShop-price">
            <span>商品价格</span>
            <span>{{item.price}}元</span>
          </div>
          <div class="uesrShop-compile">
            <span @click="runRouter(item.id)">编辑商品</span>
            <span @click="goodsDelate(item.id)">删除商品</span>
          </div>

      </div>
    </div>
  </div>
</template>

<script>
  import "./../assets/css/filtrate.css"
  import axios from "axios"

  export default {
    name: "Filtrate",
    data() {
      return {
        caseShopId: this.shopId,
        userkey: localStorage.getItem("author"),
        SearchValue: "",
        arrangementModel: "",
        //arrangements: ["时间升序", "时间降序", "价格降序", "价格升序"],// 排序选项
        caseData: [],
        isCheckAll: false,
        checkedNames:[],
        DeleteId:[]
      }
    },
    props: {
      shopId: {
        type: String
      }
    },
    mounted() {
      this.getData();
    },
    watch: {
      shopId(val) {
        this.caseShopId = val;
      }
    },
    methods: {
      runRouter:function(id){
        localStorage.setItem("EditID",id);
        this.$router.push({'name':'userEdit'});
  },
      goodsDelate: function(id){
        let idArr = [];
        idArr.push(id);
        this.DeleteSub(idArr);
      },
      caseDelet: function(){
        this.DeleteSub(this.checkedNames);
      },
      caseAdd: function(){

      },
      DeleteSub: function(DeleteId){
        let self = this;
        this.DeleteId = DeleteId;

        axios({
          url:"/HtmlInter.do",
          method: 'post',
          data:{
            act: "delCase",
            ids: this.DeleteId,
            userkey:this.userkey
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
        }).then(function(res){
          alert(res.data.message);
          self.getData();
        })
      },
      checkAll: function(){
        this.isCheckAll = !this.isCheckAll;
        if(this.isCheckAll){
          this.checkedNames = [];
          this.caseData.forEach(function (fruit) {
            this.checkedNames.push(fruit.id);
          }, this);
        }else{
          this.checkedNames = [];
        }
      },
      caseSearch: function () {
        let self = this;
        axios({
          url: "/HtmlInter.do",
          method: 'post',
          data: {
            act: "case_list",
            shopId: this.caseShopId,
            userkey: this.userkey,
            caseKeyword: this.SearchValue
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
          self.caseData = res.data.resultList;
        })
      },
      getData: function () {
        let self = this;
        axios({
          url: "/HtmlInter.do",
          method: 'post',
          data: {
            act: "case_list",
            shopId: this.caseShopId,
            userkey: this.userkey
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
          self.caseData = res.data.resultList;
        })
      }
    }
  }
</script>

<style scoped>

</style>
