<template>
    <div class="information">
        <div class="container mx-auto py-5">
            <div class="step row">
                <div class="col-md-4 ">
                <div class="bg-cyan text-white text-center px-4 py-4 bg-lightcyan text-dark" style="border-radius: 8px">
                    <div class="h5">STEP1</div>
                    <div class="h6 mt-3" >確認購物清單</div>
                </div>
                </div>
                <div class="col-md-4 ">
                <div class="bg-cyan text-white text-center px-4 py-4 " style="border-radius: 8px">
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
            <div class="row mt-5">
                <div class="purchaserdata col-md-7" >
                    <div style="box-shadow: 0px 5px 3px 0px #777777">
                        <h4 class="py-2 px-2 mb-0 bg-cyan text-white">
                            填寫購買人資訊
                        </h4>
                        <form class="py-2 px-2 bg-white" @submit.prevent = "createorder()">
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
                                <button class="btn btn-cyan">送出訂單</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-md-5 px-1">
                    <h4 class="py-2 px-2 mb-0 bg-primary text-white">
                        購物商品明細
                    </h4>
                    <div class="px-3 bg-white ">
                        <div class="d-flex border-bottom border-dark py-3" v-for = "item in cart.carts" :key = "item.id">
                            <div class="w-25 mr-3" >
                                <img :src= "item.product.imageUrl" alt="" style="width: 100%; ">
                            </div>
                            <div class="w-75 h6 mb-0">
                                <div class="d-flex justify-content-between font-weight-bold mb-2">
                                    <span class="text-primary">商品名稱</span>
                                    <span>{{item.product.title}}</span>
                                </div>
                                <div class="d-flex justify-content-between mb-2">
                                    <span class="text-cyan">數量</span>
                                    <span>{{item.qty}} {{item.product.unit}}</span>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <span class="text-success">價格</span>
                                    <span>${{item.final_total}}</span>
                                </div>
                            </div>
                        </div>
                        <div class = "py-3 text-right">
                            <span class="h5 mr-2 text-danger">總計: </span>
                            <span class="h5 text-dark">{{cart.total}} 元</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
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
    computed: {
        cart(){
            return this.$store.state.cart;
        }, 
    },
    methods: {
        createorder(){
            if(!this.cart.carts.length) {
                alert('購物車是空的!!');
                return;
            }
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
    }
}
</script>

<style scoped>
    .information{
        margin-top: 4rem;
    }
</style>