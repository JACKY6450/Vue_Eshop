<template>
    <div class="orderli">
        <table class="table mt-4">
            <thead>
                <tr>
                    <th width = "120">購買時間</th>
                    <th width = "120">購買人</th>
                    <th >email</th>
                    <th >購買商品</th>
                    <th width = "100">應負金額</th>
                    <th width = "120">是否付款</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for = " item in orderlist" :key = "item.id">
                    <td> 
                        {{item.paid_date | date}} 
                    </td>
                    <td> 
                        {{item.user.name}} 
                    </td>
                    <td >
                        {{item.user.email}} 
                    </td>
                    <td> 
                        <ul class="list-unstyled">
                            <li v-for = "(item1, index) in item.products" :key = "index">
                                {{item1.product.title}} :
                                {{item1.qty}} {{item1.product.unit}}
                            </li>
                        </ul>
                    </td>
                    <td class="text-right"> 
                        ${{item.total}} 
                    </td>
                    <td>
                        <span v-if = "item.is_paid" class="text-success">已付款</span>
                        <span v-else class="text-danger">尚未付款</span>
                    </td>
                </tr>
            </tbody>
        </table>
         <Pagination 
         :pagination = "pagination" 
         @change_page = "getorderlist($event)"
         />
    </div>
</template>

<script>
import Pagination from '../components/Pagination.vue'
export default {
    components: {
        Pagination
    },
    data(){
        return {
            orderlist: [],
            pagination: {}
        }
    },
    methods: {
        getorderlist(page = 1){ //ES6 參數預設值
            const url = 'https://vue-course-api.hexschool.io/api/jackyyenhan/orders?page='+page;
            this.$store.dispatch('updateloading', true);
            this.$http.get(url).then((response) => {
                console.log(response.data);
                this.orderlist = response.data.orders;
                this.Pagination = response.data.pagination;
                this.$store.dispatch('updateloading', false);
            })
        }
    },
    created(){
        this.getorderlist();
    }
}
</script>

<style>

</style>