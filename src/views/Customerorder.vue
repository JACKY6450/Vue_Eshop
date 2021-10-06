<template>
<div class="customerorder">
  <div class="container py-5">
    <div class="step row">
      <div class="col-md-4 ">
        <div class="bg-cyan text-white text-center px-4 py-4 " style="border-radius: 8px">
          <div class="h5">STEP1</div>
          <div class="h6 mt-3" >確認購物清單</div>
        </div>
      </div>
      <div class="col-md-4 ">
        <div class="bg-cyan text-white text-center px-4 py-4 bg-lightcyan text-dark" style="border-radius: 8px">
          <div class="h5">STEP2</div>
          <div class="h6 mt-3" >填寫購買人資訊</div>
        </div>
      </div>
      <div class="col-md-4 ">
        <div class="bg-cyan text-white text-center px-4 py-4 bg-lightcyan text-dark" style="border-radius: 8px">
          <div class="h5">STEP3</div>
          <div class="h6 mt-3" >確認訂單&付款</div>
        </div>
      </div>
    </div>
    <div class=" bg-white mt-5 px-2" style="box-shadow: 0px 5px 3px 0px #777777">
      <h4 class="py-3 px-3 mb-0 border-bottom" style="border-radius: 5px 5px 0 0">
        購買商品明細
      </h4>
      <div class="purchaseli bg-white ">
        <table class="table table-borderless px-2">
          <thead>
            <tr class="border-bottom">
                <th width = "80"></th>
                <th width = "100">產品縮圖</th>
                <th>產品名稱</th>
                <th width = "150" class="text-center">數量</th>
                <th width = "150" class="text-center">價格</th>
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
              <td class="text-right align-middle h6"> 
                  ${{item.final_total}} 
              </td>
              
            </tr>
            <tr>
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
export default {
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
  .customerorder{
    margin-top: 4rem;
  }
  .container{
    /* max-width: 1360px; */
    margin: auto;
  }
  .form-control{
    margin-bottom: 0.5rem;
  }
</style>