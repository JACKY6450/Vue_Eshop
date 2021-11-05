<template>
    <div class="store">
        <Banner />
        <div class="row my-4 container">
            <div class="category col-md-3 mb-4 " ref="categoryfilt">
                <ul class="list-group h5 shadow-sm" id="listgroup"  >
                    <!-- <li class="list-group-item active">ALL</li> -->
                    <li class="list-group-item list-group-item-action" 
                     :class = "{active : pointer === index}"
                     v-for = "(item, index) in category" :key = "item"
                     @click = "categoryswi(item,index)"
                     >
                        {{item}}
                     </li>
                </ul>
            </div>
            <div class="col-md-9">
                <div class="row">
                    <div class="col-md-4 mb-4 " v-for = "item in filterprod" :key = "item.id">
                        <div class="card border-2 shadow">
                            <a :href = "'/productsingle/'+item.id" class="prodimg">
                                <div style="height: 180px; background-size: cover; background-position: center;"
                                    :style = "{backgroundImage: `url(${item.imageUrl})`}"
                                    class="prodimg1">
                                </div>
                                <div class="overlay text-center">
                                    <div class="readmore text-white">
                                        看更多
                                    </div>
                                </div>
                            </a>
                            <div class="card-body">
                                
                                <span class="badge badge-teal float-right ml-2">{{item.category}}</span>
                                <h5 class="card-title">
                                    <a :href = "'/productsingle/'+item.id" class="text-primary" >{{item.title}}</a>
                                </h5>
                                <p class="card-text">{{item.content}}</p>
                                <div class="d-flex justify-content-between align-items-baseline">
                                    <!-- <div class="h5">2,800 元</div> -->
                                    <del class="h6 text-danger">原價: {{item.origin_price}}</del>
                                    <div class="h5">特價: {{item.price}}</div>
                                </div>
                            </div>
                            <div class="card-footer d-flex">
                                <button type="button" class="btn btn-cyan w-100 "
                                @click= "addtocart(item.id)">
                                    <!-- <i class="fas fa-spinner fa-spin"></i> -->
                                    加到購物車
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>
        </div>
        <!-- <ul>
            <li v-for = "item in filterprod" :key = "item.id">
                {{item.title}}
            </li>
        </ul> -->
    </div>
</template>

<script>
import Banner from '../components/banner.vue'
export default {
    components:{
        Banner
    },
    name: 'Store',
    data(){
        return{
            products: [],
            category: [],
            same: false,
            sameid: '',
            currentcategory: '全部商品',
            pointer: 0,
            scroll: 0,
            showidth: null,
            listfixtop: false,
        }
    },
    computed:{
        cart(){
            return this.$store.state.cart;
        },
        filterprod(){
            if(this.currentcategory == this.category[1]){
                return this.products.filter((item) => {
                    if(item.category == this.category[1])
                    return item;
                })
            }
            else if(this.currentcategory == this.category[2]){
                return this.products.filter((item) => {
                    if(item.category == this.category[2])
                    return item;
                })
            }
            else if(this.currentcategory == this.category[3]){
                return this.products.filter((item) => {
                    if(item.category == this.category[3])
                    return item;
                })
            }
            else{
                return this.products;
            }
        }
    },
    methods:{
        getproducts(){ //ES6 參數預設值 
            const api = 'https://vue-course-api.hexschool.io/api/jackyyenhan/products/all'
            this.$store.dispatch('updateloading', true);
            this.$http.get(api).then(response => {
                console.log(response.data);
                this.products = response.data.products;
                this.pagination = response.data.pagination;
                this.categoryhandle(this.products);
                this.$store.dispatch('updateloading', false);
            });
        },
        getcart(){
            const api = 'https://vue-course-api.hexschool.io/api/jackyyenhan/cart'
            this.$http.get(api).then(response => {
                console.log(response.data.data);
                this.cart = response.data.data;
                // console.log(this.cart.carts);
            });
        },
        addtocart(id, qty = 1){
            for(let i=0;i<this.cart.carts.length;i++){
                if(this.cart.carts[i].product_id === id){
                    // this.cart.carts[i].qty += qty;
                    qty = qty + this.cart.carts[i].qty;
                    console.log(this.cart.carts[i].id,this.cart.carts[i].product_id);
                    this.sameid = this.cart.carts[i].id;
                    this.same = true;
                    break
                }
            }
            if(this.same){
                let cartid = this.sameid;
                this.same = false;
                this.$store.dispatch('addtocart1', {cartid, id, qty})
                // this.$store.dispatch('removecartitem', this.sameid);
                // this.$store.dispatch('addtocart', {id, qty});
            }
            else{
                this.$store.dispatch('addtocart', {id, qty});
            }
              
        },
        categoryhandle(products){
            let arr = [];
            products.forEach((element, index) => {
                arr[index] = element.category;
            });
            this.category = arr.filter((element, index, arr) => {
                return arr.indexOf(element) === index;
            })
            // this.currentcategory = '全部商品';
            this.category.unshift('全部商品');
            console.log(this.category);
        },
        categoryswi(item,index){
            this.pointer = index;
            this.currentcategory = item;
        },
        // scrollDs(){
        //     this.scroll = document.documentElement.scrollTop;
        //     this.showidth = document.body.clientWidth;
        //     if(this.scroll > 750 && this.showidth >= 768){
        //         // let tempwidth = this.$refs.listgroup.offsetWidth;
        //         let listgroup = document.getElementById("listgroup");
        //         listgroup.style.width = this.$refs.categoryfilt.offsetWidth -30 +'px';
        //         // console.log(listgroup.style.width);
        //         this.listfixtop = true;
        //         // console.log(tempwidth);
        //     }
        //     else{
        //         // let listgroup = document.getElementById("listgroup");
        //         // listgroup.style.width = "100%";
        //         this.listfixtop = false
        //     }
        // }
    },
    created(){
        this.getproducts();
        window.addEventListener('scroll',this.scrollDs);
        // this.getcart();
    }
}
</script>

<style scoped>

    .container{
        max-width: 1280px;
        margin: auto;
    }
    .active{
        background-color: #17a2b8;
        border: 1px solid #17a2b8;
    }
    .list-group{
        position: relative;
        transition: .3s;
    }
    .list-group-item{
        cursor: pointer;
        
    }
    .fixlist-group{
        position: fixed;
        top: 80px;
        /* width: 282.5px; */
    }
    .card{
        position: relative;
        transition:  .5s;
    }
    .card:hover{
        top: -8px;
    }
    .prodimg:hover .prodimg1{
        /* opacity: .7; */
        -webkit-filter:brightness(.6);
    }
    .prodimg:hover .overlay{
        opacity: 1;
    }
    .overlay{
        height: 180px;
        width: 100%;
        opacity: 0;
        position: absolute;
        top: 0%;
        left: 0%;
        transition: 1s;
    }
    .overlay::before{
        content: '';
        display: inline-block;
        height: 100%;
        vertical-align: middle;
    }
    .readmore{
        display: inline-block;
        width: auto;
        padding: 5px;
        border: 1px solid white;
        border-radius: 8px;
        font-size: 24px;
        font-weight: bold;
        vertical-align: middle;
    }
    .card-title{
        text-overflow: ellipsis; 
        overflow:hidden;
        white-space: nowrap;
    }
    .card-text{
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        white-space: normal;
        overflow: hidden;
    }
</style>