<template>
	<div class="prodsingle">
		<div class="container">
			<nav aria-label="breadcrumb" class="pt-3">
				<ul class="breadcrumb bg-white h5 px-2">
					<li class="breadcrumb-item ">
						<router-link to="/" class="text-dark">Home</router-link>
					</li>
					<li class="breadcrumb-item ">
						<router-link to="/store" class="text-dark">賣場</router-link>
					</li>
					<li class="breadcrumb-item text-cyan active" aria-current="page">
						{{product.title}}
					</li>
				</ul>
			</nav>
			<div class="row pb-2 ">
				<div class="prodimg col-md-7">
						<img :src= "product.imageUrl" alt="" width="100%" height="100%">
				</div>
				<div class="prodcont col-md-5">
					<h1 class="text-cyan ">{{product.title}}</h1>
					<div class="proddescribe " style="height: 90px">
						<p class="describecont h6">
								{{product.content}}
						</p>
					</div>
					<div class="price py-2">
					<!-- <div class="h5">2,800 元</div> -->
						<del class="h6 text-success ">原價: {{product.origin_price}}</del>
						<div class="h5 mt-3">特價: {{product.price}}</div>
					</div>
					<div class="number my-1 mb-3">
						<label class="h5">請選擇數量:</label>
						<div class="countnumber d-flex align-items: center" style="height: 40px">
							<button class="btn btn-outline-cyan " :class = "{'disabled' : count === 1}" 
								style="border-radius: 5px 0px 0px 5px;" @click= "addcount(-1)">
									<i class="fa fa-minus" aria-hidden="true"></i>
							</button>
							<input type="number" class="border border-cyan text-center h5"  style="width: 160px; height:100%"
							:value= "count">
							<button class="btn btn-outline-cyan" style="border-radius: 0px 5px 5px 0px;" @click= "addcount(1)">
									<i class="fa fa-plus" aria-hidden="true"></i>
							</button>
						</div>
					</div>
					<div class="py-2 row no-gutters">
						<div class="col-md-6 pr-1">
							<button class="btn btn-outline-teal w-100" @click = "gotoorder()">
								<i class="fas fa-money-check"></i>
								前往結帳
							</button>
						</div>
						<div class="col-md-6 pl-1">
							<button class="btn btn-cyan w-100" @click= "addtocart(product.id, count)">
								<i class="fas fa-shopping-cart"></i>
								加入購物車
							</button>
						</div>					
					</div>
				</div>
				<div class="totalprice col-md-12 h4 text-right text-danger mt-3">
						總金額: ${{total}}
				</div>
			</div>
			<hr class="featurette-divider bg-cyan">
			<h4 class="px-2">您可能也會喜歡</h4>
			<div class="row px-2">
				<div class="itemMaybe col-sm-6 col-lg-3 mb-3" v-for = "item in maybelike" :key = "item.id">
					<a :href = "'/productsingle/'+item.id" class="text-dark text-decoration-none">
						<div class="maybelike card border-0">
							<img class="card-img-top" :src = "item.imageUrl" height="200px">
							<div class="card-body" >
								<h4 class="card-title">{{ item.title }}</h4>
								<div class="text-right d-flex justify-content-between mt-3">
									<del class="h6" style="color: green">原價: ${{item.origin_price}}</del>
									<div class="h6" style="color: indigo">特價: ${{ item.price }}</div>
								</div>
							</div>
						</div>
					</a>
				</div>
			</div>
		</div>
	</div>
    
</template>

<script>
export default {
	data(){
		return{
				product: {},
				products: [],
				maybelike: [],
				count: 1,
				// number: 1
		}
	},
	computed:{
		cart(){
				return this.$store.state.cart;
		},
		total(){
				// console.log(this.count);
				return this.count * this.product.price;
		}
	},
	methods:{
		getproduct(id){
			// console.log(id.productId);
			const api = 'https://vue-course-api.hexschool.io/api/jackyyenhan/product/'+id.productId;
			this.$store.dispatch('updateloading', true);
			this.$http.get(api).then(response => {
				console.log(response.data);
				this.product = response.data.product;
				this.getproducts();
			})
		},
		getproducts(){ //ES6 參數預設值 
			const api = 'https://vue-course-api.hexschool.io/api/jackyyenhan/products/all'
			this.$store.dispatch('updateloading', true);
			this.$http.get(api).then(response => {
				console.log(response.data);
				this.products = response.data.products;
				this.maybelikehandler();
				setTimeout(() => {
						this.$store.dispatch('updateloading', false);
				}, 500)
			});
		},
		maybelikehandler(){
			let arr = [];
			arr = this.products.filter((element) => {
				if(this.product.title != element.title){
					if(this.product.category === element.category) return element;
				}
			})
			for(let i=0; i<4; i++){
				if(arr.length === 0) break;
				let randomid = Math.floor(Math.random()*arr.length);
				this.maybelike.push(arr[randomid]);
				arr.splice(randomid, 1);
			}
		},
		addcount(num){
				if((this.count+num)<1) return;
				this.count += num;
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
		gotoorder(){
			this.$router.push('/customerorder');
		}
	},
	created(){
		const productid = this.$route.params;
		// console.log(typeof(productid));
		this.getproduct(productid);
	}
}
</script>

<style scoped>
	.prodsingle{
		background-color: white;
	}
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}
	input[type="number"]{
		-moz-appearance: textfield;
	}
	.container{
		margin: auto;
	}
	.prodimg{
		height: 370px;
		
	}
	.describecont{
		display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
		white-space: normal;
		overflow: hidden;
	}
	#countchoice{
		border-radius: 8px;
	}
	.maybelike {
		transition: .3s;
	}
	.itemMaybe a:hover .maybelike{
		opacity: .9;
		box-shadow: 3px 3px 3px 0 #999999;
	}
	.card-title{
		text-overflow: ellipsis; 
		overflow:hidden;
		white-space: nowrap;
	}
</style>