<template>
  <div class="home"> 
     <loading :active.sync="isLoading" ></loading>
    <Alert></Alert>
    <nav class="navbar navbar-expand-md navbar-light bg-light fixed-top">
      <a class="navbar-brand px-2 bg-cyan text-light" style="border-radius: 25px;" href="/">
        Take a rest mall 
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarCollapse">
        <ul class="navbar-nav h6">
          <li class="cart nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="fas fa-shopping-cart text-dark" ></i>
              購物車
            </a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
              <div class="text-center">
                <i class="fas fa-shopping-cart text-dark" ></i>
                購物車明細
              </div>
              <div class="dropdown-divider"></div>
              <div class="d-flex align-items-center py-1 px-3" v-for = "item in cart.carts" :key = "item.id">
                <span class="limit1line flex-grow-1 ">
                  {{item.product.title}}
                </span>
                <span class="text-right " style="width:90px">
                  {{item.total}}
                </span>
                <span class="text-center mx-2 " style="width:50px">
                  {{item.qty}} {{item.product.unit}}
                </span>
                <button class="btn btn-outline-danger btn-sm" @click = "removecartitem(item.id)">
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
              </div>
              <div class="dropdown-divider"></div>
              <div class="text-center">
                <button class="btn btn-cyan" @click = "gotoorder()">
                  前往結帳
                </button>
              </div>
            </div>
            <div v-if= "cart.carts.length" class="cart-count rounded-circle bg-danger text-light">{{cart.carts.length}}</div>
          </li> 
          <li class="nav-item">
            <router-link class="nav-link " to = "/about">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link " to = "/store">前往賣場</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link " to = "/login">管理員登入</router-link>
          </li>
          <!-- <li class="nav-item active">
            <a class="nav-link disabled text-dark" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </li> -->
        </ul>
        <!-- <div class="cart mx-1 mr-2">
          <button class="btn btn-teal rounded-circle p-2 ">
            
          </button>
          
        </div> -->
      </div>
    </nav>
    <!-- Show Child Component -->
    <router-view/> 
    <!-- Footer -->
    <footer class="page-footer font-small pt-4 bg-cyan text-white">
      <!-- Footer Links -->
      <div class="container-fluid text-center text-md-left ">
        <!-- Grid row -->
        <div class="row container" style="margin:auto">
          <!-- Grid column -->
          <div class="col-md-6 mt-md-0 mt-3">
            <!-- Content -->
            <h5 class="text-uppercase">Welcome to our mall</h5>
            <p>
              本日Take a rest モールにご来店頂きまして誠にありがとうございました。
            </p>
          </div>
          <!-- Grid column -->
          <hr class="clearfix w-100 d-md-none pb-3">
          <!-- Grid column -->
          <div class="col-md-3 mb-md-0 mb-3 text-center">
            <!-- Links -->
            <h5 class="text-uppercase">關於我們</h5>
            <ul class="list-unstyled">
              <li>
                <a href="#!">關於本站</a>
              </li>
              <li>
                <a href="#!">服務條款</a>
              </li>
              <li>
                <a href="#!">人才募集</a>
              </li>
              <li>
                <a href="#!">合作夥伴</a>
              </li>
            </ul>
          </div>
          <!-- Grid column -->

          <!-- Grid column -->
          <div class="col-md-3 mb-md-0 mb-3 text-center">

            <!-- Links -->
            <h5 class="text-uppercase">客服中心</h5>

            <ul class="list-unstyled">
              <li>
                <a href="#!">加入會員</a>
              </li>
              <li>
                <a href="#!">新手上路</a>
              </li>
              <li>
                <a href="#!">客服信箱</a>
              </li>
              <li>
                <a href="#!">客服中心Q&A</a>
              </li>
            </ul>

          </div>
          <!-- Grid column -->
        </div>
        <!-- Grid row -->
        <div class="socialmedia text-right my-2">
          <a href="javascript:;" class="px-1 py-1 mr-1">
            <i class="fab fa-facebook fa-2x"></i>
          </a>
          <a href="javascript:;" class="px-1 py-1 mr-1">
            <i class="fab fa-twitter fa-2x"></i>
          </a>
          <a href="javascript:;" class="px-1 py-1 mr-1">
            <i class="fab fa-instagram fa-2x"></i>
          </a>
          <a href="https://github.com/JACKY6450" target="_blank" class="px-1 py-1 mr-1">
            <i class="fab fa-github fa-2x"></i>
          </a>
        </div>
      </div>
      <!-- Footer Links -->

      <!-- Copyright -->
      <div class="footer-copyright text-center py-3 bg-primary">
        © 2021 Copyright: By Jacky Yen Han 僅做為個人作品練習無任何商業用途
        <br>
        網站圖片全部來自
        <a href="https://pixabay.com/" target="_blank" class="text-light">Pixabay免費圖庫</a>
      </div>
      <!-- Copyright -->

    </footer>
<!-- Footer -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Alert from '@/components/AlertMessage.vue'
export default {
  name: 'Home',
  components: {
    Alert
  },
  data(){
    return{
    }
  },
  computed:{
    cart(){
      return this.$store.state.cart;
    },
    isLoading(){
      return this.$store.state.isLoading;  
    }
  },
  methods:{
    getcart(){
      this.$store.dispatch('getcart');
    },
    removecartitem(id){
      this.$store.dispatch('removecartitem', id);
    },
    gotoorder(){
      this.$router.push('/customerorder');
    }
  },
  created(){
    this.getcart();
  }
}
</script>
<style scoped>
  /* GLOBAL STYLES
  -------------------------------------------------- */
  /* Padding below the footer and lighter body text */
  .collapse .navbar-nav .nav-item a.router-link-exact-active{
    background-color: #17a2b8;
    color: #ffffff;
  }
  .home {
    margin-top: 4rem;
  }
  .cart{
    position: relative;
  }
  .cart-count{
    width: 16px;
    height: 16px;
    text-align: center;
    line-height: 16px;
    font-size: 14px;
    position: absolute;
    bottom: -1px;
    left: -1px;
  }
  .dropdown-menu{
    width: 25rem;
  }
  .limit1line{
    text-overflow: ellipsis; 
    overflow:hidden;
    white-space: nowrap;
  }
  
  /* MARKETING CONTENT
  -------------------------------------------------- */

  /* Center align the text within the three columns below the carousel */
  .marketing .col-lg-4 {
    margin-bottom: 1.5rem;
    text-align: center;
  }
  .marketing h2 {
    font-weight: 400;
  }
  .marketing .col-lg-4 p {
    margin-right: .75rem;
    margin-left: .75rem;
  }
  .list-unstyled a, .socialmedia a{
    color: white;
  }
  .list-unstyled li{
    margin: 0.5rem 0;
  }
  .socialmedia a:hover{
    opacity: .8;
  }

</style>