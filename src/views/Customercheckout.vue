<template>
    <div class="checkout container py-5">
        <div class="step row">
            <div class="col-md-4 ">
                <div class="bg-cyan text-white text-center px-4 py-4 bg-lightcyan text-dark" style="border-radius: 8px">
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
                <div class="bg-cyan text-white text-center px-4 py-4 " style="border-radius: 8px">
                    <div class="h5">STEP3</div>
                    <div class="h6 mt-3" >確認訂單&付款</div>
                </div>
            </div>
        </div>
        <div class="mt-5 px-5 row justify-content-center">
            <form class="col-md-8 bg-white px-0"  @submit.prevent="payorder()">
                 <h4 class="py-2 px-2 mb-0 bg-cyan text-white" style="border-radius: 5px 5px 0 0">
                    以下為您的訂單資訊
                </h4>
                <table class="table">
                    <thead>
                        <tr>
                            <th>品名</th>
                            <th>數量</th>
                            <th>單價</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in order.products" :key="item.id">
                            <td class="align-middle">{{ item.product.title }}</td>
                            <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                            <td class="align-middle text-right">{{ item.final_total }}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="2" class="text-right">總計</td>
                            <td class="text-right">{{ order.total }}</td>
                        </tr>
                    </tfoot>
                </table>

                <table class="table">
                    <tbody>
                        <tr>
                            <th width="100">Email</th>
                            <td>{{ order.user.email }}</td>
                        </tr>
                        <tr>
                            <th>姓名</th>
                            <td>{{ order.user.name }}</td>
                        </tr>
                        <tr>
                            <th>收件人電話</th>
                            <td>{{ order.user.tel }}</td>
                        </tr>
                        <tr>
                            <th>收件人地址</th>
                            <td>{{ order.user.address }}</td>
                        </tr>
                        <tr>
                            <th>付款狀態</th>
                        <td>
                            <span v-if="!order.is_paid" class="text-danger">尚未付款</span>
                            <span v-else class="text-success">付款完成</span>
                        </td>
                        </tr>
                    </tbody>
                </table>
                <div class="text-right px-2" v-if="order.is_paid === false">
                    <button class="btn btn-cyan">確認付款去</button>
                </div>
            </form>
        </div>
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header bg-success text-white">
                        <h5 class="modal-title" id="exampleModalCenterTitle">付款成功!</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body h6">
                        感謝您這次的購物我們將盡快處理您的訂單
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">確認</button>
                        <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from "jquery"
export default {
    data(){
        return{
            order: {
                user:{}
            },
            orderid: '',
        }
    },
    computed: {
        cart(){
            return this.$store.state.cart;
        }
    },
    methods: {
        getorder(){
            const url = 'https://vue-course-api.hexschool.io/api/jackyyenhan/order/'+this.orderid;
            this.$store.dispatch('updateloading', true);
            this.$http.get(url).then((response) => {
                this.order = response.data.order;
                console.log(response);
                if(this.order.is_paid){
                    $('#exampleModalCenter').modal('show');
                }
                this.$store.dispatch('updateloading', false);
            })
        },
        payorder(){
            const url = 'https://vue-course-api.hexschool.io/api/jackyyenhan/pay/'+this.orderid;
            this.$store.dispatch('updateloading', true);
            this.$http.post(url).then((response) => {
                if(response.data.success){
                    this.getorder();    
                }
                console.log(response);
            })
        },
        close(){
            $('#exampleModalCenter').modal('hide');
        }
    },
    created(){
        this.orderid = this.$route.params.orderId;
        // console.log(this.orderid);
        this.getorder();
    }
}
</script>

<style>
    .checkout{
        margin-top: 4rem;
    }
    .modal-dialog{
        max-width: 600px;
    }
</style>