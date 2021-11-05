<template>
<div class="customerorder">
  <div class="container py-5">
    <Payprocedure :step = "currentstep"/>
    <div class=" bg-white mt-5 px-2" style="box-shadow: 0px 5px 3px 0px #777777">
      <h4 class="py-3 px-3 mb-0 border-bottom" >
        <i class="fas fa-shopping-cart text-dark" ></i>
        購物車明細
      </h4>
      <div class="purchaseli bg-white ">
        <table class="table table-borderless px-2">
          <thead>
            <tr class="border-bottom">
                <th width = "80"></th>
                <th width = "100">商品縮圖</th>
                <th>商品名稱</th>
                <th width = "100" class="text-center">數量</th>
                <th with = "80" class="text-center">單位</th>
                <th width = "150" >價格</th>
            </tr>
          </thead>
          <tbody >
            <tr class="border-bottom" v-for = " item in cart.carts" :key = "item.id">
              <td class="text-center align-middle">
                <button class="btn btn-outline-danger btn-sm " @click = "removecartitem(item.id)">
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
              </td>
              <td> 
                  <img :src= "item.product.imageUrl" alt="" width="100" height="100">
              </td>
              <td class="align-middle h5"> 
                  {{item.product.title}} 
              </td>
              <td class="text-center align-middle h6 text-center">
                  {{item.qty}} 
              </td>
              <td class="text-center align-middle h6 text-center">
                  {{item.product.unit}} 
              </td>
              <td class="text-right align-middle h6"> 
                  ${{item.total}} 
              </td>
              
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td class="text-right h5">總計:</td>
              <td class="text-right h5">{{cart.total}} 元</td>
            </tr>
          </tbody>
        </table>
        <div class="text-right px-3 py-2">
          <button class="btn btn-cyan btn-lg h5" @click = "gotoinformation()">下一步填寫資料</button>
        </div>
      </div>
    </div>
  </div>
</div>
  
</template>

<script>
import Payprocedure from '../components/Payprocedure.vue'
export default {
  components: {
    Payprocedure
  },
  data(){
    return{
      form: {
        user:{
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: ''
      },
      currentstep: {
        step1: true,
        step2: false,
        step3: false
      }
    }
  },
  computed:{
    cart(){
        return this.$store.state.cart;
    },  
  }, 
  methods:{
    // getcart(){
    //   this.$store.dispatch('getcart');
    // },
    removecartitem(id){
      this.$store.dispatch('removecartitem', id);
    },
    gotoinformation(){
      this.$router.push('/Customerinformation')
    },
  },
  created(){
    // this.getcart();
  }
}
</script>

<style scoped>
  .container{
    /* max-width: 1360px; */
    margin: auto;
  }
  .form-control{
    margin-bottom: 0.5rem;
  }
</style>