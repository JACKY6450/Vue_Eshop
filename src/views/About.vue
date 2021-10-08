<template>
    <div class="about">
        <Banner />
        <div class="container">
            <h1 class="text-center mb-3">熱銷商品</h1>
            <div class="row justify-content-between">
                <div class="sellitem col-md-3" v-for = "item in popsell" :key = "item.id">
                    <a :href = "'/productsingle/'+item.id" class="text-dark">
                        <div class="card">
                            <img class="card-img-top" :src = "item.imageUrl" height="200px">
                            <div class="card-body" >
                                <h3 class="card-title">{{ item.title }}</h3>
                                <p class="card-text productcont" style="color: #003377">
                                    {{ item.content }}
                                </p>
                                <div class="h5 text-right " style="color: indigo">特價: ${{ item.price }}</div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <div class="aboutus text-center mt-5" data-aos="fade-down">
                <h1>About Us</h1>
                <p class="lead font-weight-bold" style="font-size: 20px">
                    運動、娛樂、美食甜點本店主打的商品，休息放鬆時最需要的精神糧食，現代忙碌的生活時間變的零碎，
                    因此你有時候需要停下腳步找尋生活中的一些小確性，讓自己放鬆充電一下才能有更多的能量繼續衝刺!
                </p>
                <a href="/store" class="text-white">
                    <div class="imgframe" style="position: relative; height: 400px">
                        <img src="../assets/entertaiment_category.jpg" alt="" height="100%" >
                        <div class="overlay">
                            <div class="readmore">進入賣場</div>
                        </div>
                    </div>
                </a>
            </div>
            <hr class="featurette-divider bg-cyan">

            <div class="row featurette " >
                <div class="categorypic col-md-5 px-0" data-aos = "fade-right" >
                    <img src="../assets/Sports_category.jpg" alt="" height="360px" >
                </div>
                <div class="col-md-7 py-3 order-md-1 d-flex flex-column justify-content-center" >
                    <div class="w-75 text-center" style="margin: auto; " data-aos="fade-left">
                        <h1 class="featurette-heading mb-3">運動</h1>
                        <p class="lead " style="font-size: 20px">
                            體育運動是對於所有有組織或無組織參與，通過使用、維持或改進體能，為參與者提供娛樂的競技性身體運動的總稱。
                            世界上共有上百種體育運動，其形式多元，有的只需要兩人便可完成，有的則需要多人組隊完成。
                        </p>
                       <a href="/store" class="btn btn-dark w-25" style="border-radius: 10px">
                            看更多
                        </a>
                    </div>
                </div>
            </div>

            <hr class="featurette-divider bg-cyan">
            <div class="row featurette ">
                <div class="categorypic col-md-5 px-0 order-md-2" data-aos = "fade-left">
                    <img src="../assets/entertaiment_category.jpg" alt="" height="380px" >
                </div>
                <div class="col-md-7 py-3 order-md-1 d-flex flex-column justify-content-center" >
                    <div class="w-75 text-center" style="margin: auto; " data-aos="fade-right">
                        <h1 class="featurette-heading mb-2">娛樂</h1>
                        <p class="lead mb-2" style="font-size: 20px">
                            一般娛樂幾乎流行於所有文化中，它們大多出於宮闈，發展出精妙多樣的技巧，終聞於市井平民。
                            當代娛樂產業主要依靠娛樂產品的製作和銷售，而這一產業的發展更加速了娛樂的大眾化。
                            為適應不同規模，娛樂發展出各種形式：可以是私人音樂服務中的自選曲庫，也可以適合兩個人的二人宴會，
                            更可以是不分國別膚色、包容萬千觀眾、舞樂恢弘的國際化視聽盛宴。
                        </p>
                        <a href="/store" class="btn btn-dark w-25" style="border-radius: 10px">
                            看更多
                        </a>
                    </div>
                </div>
            </div>

            <hr class="featurette-divider bg-cyan">
            <div class="row featurette ">
                <div class="categorypic col-md-5 px-0" data-aos = "fade-down">
                    <img src="../assets/dessert_category.jpg" alt="" height="360px" >
                </div>
                <div class="col-md-7 py-3 order-md-1 d-flex flex-column justify-content-center">
                    <div class="w-75 text-center" style="margin: auto" data-aos="fade-up">
                        <h1 class="featurette-heading mb-3">美味甜點</h1>
                        <p class="lead " style="font-size: 20px">
                            甜點是西餐正餐的最後一道甜味菜品，也可以說是西方人在餐後食用的甜味食物。可以是水果拼盤、小蛋糕、餡餅、布丁或者冰激凌等，
                            時至今日甜點已徹底傳入東方而且不只是飯後食用，更成為許多喜愛甜點的饕客的美食選擇。
                        </p>
                        <a href="/store" class="btn btn-dark w-25" style="border-radius: 10px">
                            看更多
                        </a>
                    </div>
                </div>
            </div>

            <hr class="featurette-divider bg-cyan">
            <!-- /END THE FEATURETTES -->
        </div>
        <!-- /END Container -->
    </div>
</template>

<script>
    import Banner from '../components/banner.vue' 
export default {
    components: {
        Banner
    },
    data(){
        return{
            products: [],
            popsell: [],
        }
    },
    methods: {
        getproducts(){ //ES6 參數預設值 
            const api = 'https://vue-course-api.hexschool.io/api/jackyyenhan/products/all'
            // this.$store.state.isLoading = true;
            this.$store.dispatch('updateloading', true);
            this.$http.get(api).then(response => {
                console.log(response.data);
                this.products = response.data.products;
                this.addtopopsell();
                // this.$store.state.isLoading = false;
                this.$store.dispatch('updateloading', false);
            });
        },
        addtopopsell(){
            this.popsell = this.products.filter((element) => {
                if(element.is_enabled) return element;
            })
            
        }
    },
    created(){
        this.getproducts();
    }
}
</script>

<style scoped>
     /* Featurettes
  ------------------------- */
    .about{
        margin-top: 4rem;
    }
    img{
        width: 100%;
    }
    a{
        text-decoration: none;
    }
    .sellitem1{
        position: relative;
    }
    .card{
        transition: .3s;
    }
    .card:hover{
        box-shadow: 0px 3px 10px 3px #aaaaaa;
        transform:scale(1.04, 1.04);
        /* height: 104%; */
    }
    .productcont{
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        white-space: normal;
        overflow: hidden;
    }
    .imgframe{
        overflow: hidden;
    }
    /* .imgframe img{
        transition: .6s;
    }
    .imgframe:hover img{
        -webkit-filter:brightness(.6);
    } */
    .imgframe:hover .overlay{
        top: -100%;
    }
    .overlay{
        height: 100%;
        width: 100%;
        position: relative;
        top: 0%;
        background-color: rgba(0, 0, 0, .5);
        /* opacity: 0;
        top: 0%;
        left: 0%; */
        transition: .7s;
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
        padding: 10px;
        border: 2px solid white;
        border-radius: 8px;
        font-size: 24px;
        font-weight: bold;
        vertical-align: middle;
    }
    .categorypic{
        box-shadow: 0px 5px 10px 2px ;
    }
    .featurette-divider {
        margin: 5rem 0; /* Space out the Bootstrap <hr> more */
    }

    /* Thin out the marketing headings */
    .featurette-heading {
        font-weight: 300;
        line-height: 1;
        letter-spacing: -.05rem;
    }
</style>