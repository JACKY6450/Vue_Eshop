<template>
    <div class="information">
        <div class="container mx-auto py-5">
            <Payprocedure :step = "currentstep"/>
            <div class="row mt-5">
                <div class="purchaserdata col-md-7" >
                    <div class="bg-white" style="box-shadow: 0px 5px 3px 0px #777777">
                        <h4 class="py-2 px-2 mb-0 bg-cyan text-white">
                            填寫購買人資訊
                        </h4>
                        <form class="py-2 px-2" @submit.prevent = "createorder()">
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
                <div class="col-md-5 ">
                    <div class="cartlist bg-white shadow-sm border border-cyan" >
                         <h3 class="pt-3 px-3 mb-0 font-weight-bold">
                            購物商品明細
                        </h3>
                        <div class="px-3">
                            <div class="d-flex border-bottom border-dark py-3" v-for = "item in cart.carts" :key = "item.id">
                                <div class="w-25 mr-3" >
                                    <img :src= "item.product.imageUrl" alt="" style="width: 100%; height: 100%">
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
                                        <span v-if = "item.total === item.final_total">${{item.total}}</span>
                                        <span v-else class="text-cyan">${{item.final_total}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class = "my-3 text-right">
                                <span class="h5 mr-2 text-danger">總計: </span>
                                <span class="h5 text-dark">{{cart.total}} 元</span>
                            </div>
                            <div class = "mb-3 text-right" v-if = "cart.final_total != cart.total">
                                <span class="h5 mr-2 text-success">折扣價: </span>
                                <span class="h5 text-dark">{{cart.final_total}} 元</span>
                            </div>
                            <div class="mb-1 text-cyan">
                                <i class="far fa-smile"></i>
                                慶祝開幕輸入優惠碼 takearest 即刻享有9折優惠
                            </div>
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="" v-model = "coupon_code"
                                 aria-label="Recipient's username" aria-describedby="basic-addon2">
                                <div class="input-group-append">
                                    <button class="btn btn-cyan" type="button" @click="addcouponcode()">套用優惠碼</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Payprocedure from '@/components/Payprocedure.vue'
export default {
    components: {
        Payprocedure
    },
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
            },
            listfixtop: false,
            currentstep: {
                step1: false,
                step2: true,
                step3: false
            },
            coupon_code: ''
        }
    },
    computed: {
        cart(){
            return this.$store.state.cart;
        }, 
    },
    methods: {
        addcouponcode(){
            const url = 'https://vue-course-api.hexschool.io/api/jackyyenhan/coupon';
            const coupon = {
                code: this.coupon_code
            }
            this.$store.dispatch('updateloading', true);
            this.$http.post(url, { data: coupon}).then((response) => {
                console.log(response);
                this.$store.dispatch('getcart');
                this.coupon_code = '';
                // this.$store.dispatch('updateloading', false);
            })
        },
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
        },
    },
    
}
</script>

<style scoped>
    
</style>