import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart:{
      carts:[],
    },
    isLoading: false
  },
  mutations: {
    CART(state, payload){
      state.cart = payload;
    },
    Loading(state, status){
      state.isLoading = status;
    }
  },
  actions: {
    updateloading({commit}, status){
      commit('Loading', status)
    },
    getcart({commit}){
      const api = 'https://vue-course-api.hexschool.io/api/jackyyenhan/cart'
      commit('Loading', true);
      axios.get(api).then(response => {
          if(response.data.data.carts){
            this.cart = response.data.data;
            commit('CART', response.data.data);
          }
          setTimeout(() => {
            commit('Loading', false);
          }, 500)
          console.log(response.data);
      });
    },
    removecartitem({dispatch, commit}, id){
      const api = 'https://vue-course-api.hexschool.io/api/jackyyenhan/cart/'+id
      commit('Loading', true);
      axios.delete(api).then(response => {
          console.log(response.data);
          dispatch('getcart')
          // this.$bus.$emit('messages:push', response.data.message+'此項商品', 'success');
      });
    },
    addtocart({dispatch, commit}, {id, qty}){
      let api = 'https://vue-course-api.hexschool.io/api/jackyyenhan/cart'
      commit('Loading', true);
      const item = {
          product_id: id,
          qty
      }
      axios.post(api, {data: item}).then(response => {
          console.log(response.data);
          dispatch('getcart');
          // this.products = response.data.products;
      });
    },
    addtocart1({dispatch, commit}, {cartid, id, qty}){ //先delete再add
      const api = 'https://vue-course-api.hexschool.io/api/jackyyenhan/cart/'+cartid
      commit('Loading', true);
      axios.delete(api).then(response => {
          console.log(response.data);
          dispatch('addtocart', {id, qty})
          // this.$bus.$emit('messages:push', response.data.message+'此項商品', 'success');
      });
    }
    
  },
  modules: {
  }
})
