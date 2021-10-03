<template>
<div class="customerorder">
  <div class="container row py-5">
    <div class=" col-md-7">
      <h4 class="my-2 font-weight-bold">購買品項</h4>
      <div class="purchaseli p-5 bg-lightcyan " style="border-radius: 10px">
         <table class="table ">
          <thead>
            <tr>
                <th width = "80">產品縮圖</th>
                <th>產品名稱</th>
                <th width = "60" class="text-center">數量</th>
                <th width = "100" class="text-center">價格</th>
                <th width = "60"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for = " item in cart.carts" :key = "item.id">
              <td> 
                  <img :src= "item.product.imageUrl" alt="" width="80" height="80">
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
              <td class="text-center align-middle">
                  <button class="btn btn-outline-danger btn-sm " @click = "removecartitem(item.id)">
                      <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td class="h5">
                總計
                </td>
              <td class="h5">
                {{cart.total}}
              </td>
            </tr>
          </tbody>
      </table>
      </div>
     
    </div>
    <div class="purchaserdata col-md-5">
        <h4 class="font-weight-bold my-2">請填寫購買人資訊</h4>
        <form class="mt-4" @submit.prevent = "createorder()">
          <div class="form-group">
            <label for="useremail">Email</label>
            <input type="email" class="form-control" name="email" id="useremail"
              :class = "{ 'is-invalid' : errors.has('email') }"
              v-model="form.user.email" v-validate = "'required|email'" 
              placeholder="請輸入 Email" >
            <span class="text-danger" v-if= "errors.has('email')">
              <!-- {{ errors.first('email') }} -->
              Email 須為有效的電子信箱
            </span>
          </div>
        
          <div class="form-group">
            <label for="username">收件人姓名</label>
            <input type="text" class="form-control" name="name" id="username"
              :class = "{ 'is-invalid' : errors.has('name') }"
              v-model="form.user.name" v-validate = "'required'" placeholder="輸入姓名">
            <span class="text-danger" v-if= "errors.has('name')">
              姓名必須輸入
            </span>
          </div>
        
          <div class="form-group">
            <label for="usertel">收件人電話</label>
            <input type="tel" class="form-control" id="usertel" v-model="form.user.tel" placeholder="請輸入電話">
          </div>
        
          <div class="form-group">
            <label for="useraddress">收件人地址</label>
            <input type="text" class="form-control" name="address" id="useraddress" 
              :class = "{ 'is-invalid' : errors.has('address') }"
              v-model="form.user.address" v-validate = "'required'"
              placeholder="請輸入地址">
            <span class="text-danger" v-if= "errors.has('address')">
              地址欄位不得留空
            </span>
          </div>
        
          <div class="form-group">
            <label for="comment">留言</label>
            <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
          </div>
          <div class="text-right">
            <button class="btn btn-danger">送出訂單</button>
          </div>
        </form> 
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
    getcart(){
      this.$store.dispatch('getcart');
    },
    removecartitem(id){
      this.$store.dispatch('removecartitem', id);
    },
    createorder(){
      const url = 'https://vue-course-api.hexschool.io/api/jackyyenhan/order';
      const order = this.form;
      this.$store.dispatch('updateloading', true);
      this.$validator.validate().then(valid => {
        if (valid) {
          this.$http.post(url, {data: order}).then((response) =>{
            console.log('訂單已建立', response);
            if(response.data.success){
              this.$router.push('/customercheckout/'+response.data.orderId);
              this.$store.dispatch('updateloading', false);
            }
          })    // do stuff if not valid.
        }
        else{
          console.log('欄位不完整');
          this.$store.dispatch('updateloading', false);
        }
      });
      
    }
  },
  created(){
    this.getcart();
  }
}
</script>

<style scoped>
  .customerorder{
    margin-top: 4rem;
  }
  .container{
    max-width: 1360px;
    margin: auto;
  }
  .form-control{
    margin-bottom: 0.5rem;
  }
  .purchaseli{
    height: 630px;
    overflow: auto;
  }
</style>