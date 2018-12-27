import Vue from 'vue'
import "babel-polyfill"
import vuex from 'vuex'

Vue.use(vuex);

export default new vuex.Store({
  state: {
    user : {
      author:""
    }
  },
  mutations: {
    isLogin(state,msg){
      state.user.author =msg;
      localStorage.setItem("author",msg);
    },
    isLogout(state,msg){
      state.user.author ="";
      localStorage.setItem("author","");
    }
  }
})
