<template>
    <div>
        <div class="text-right mt-4">
            <button class="btn btn-secondary" @click = "openModal(true)">
                建立新的產品
            </button>
            <!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button> -->
        </div>
        <table class="table mt-4">
            <thead>
                <tr>
                    <th width = "120">分類</th>
                    <th>產品名稱</th>
                    <th width = "120">原價</th>
                    <th width = "120">售價</th>
                    <th width = "100">是否啟用</th>
                    <th width = "120">編輯</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for = " item in products" :key = "item.id">
                    <td> 
                        {{item.category}} 
                    </td>
                    <td> 
                        {{item.title}} 
                    </td>
                    <td class="text-right">
                        ${{item.origin_price}} 
                    </td>
                    <td class="text-right"> 
                        ${{item.price}} 
                    </td>
                    <td> 
                        <span v-if = "item.is_enabled" class="text-success">啟用</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td>
                        <button class="btn btn-outline-primary btn-sm mr-1" @click = "openModal(false, item)">
                            編輯
                        </button>
                        <button class="btn btn-outline-danger btn-sm" @click = "opendelModal(item)">
                            刪除
                        </button>

                    </td>
                </tr>
            </tbody>
        </table>
        <!-- Page -->
        <Pagination 
         :pagination = "pagination" 
         @change_page = "getproducts($event)"
         />
        <!-- Modal -->
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
         aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-dark text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span>新增產品</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="image">輸入圖片網址</label>
                                    <input type="text" class="form-control" id="image"
                                        placeholder="請輸入圖片連結"
                                        v-model = "tempProduct.imageUrl">
                                </div>
                                <div class="form-group">
                                    <label for="customFile">或 上傳圖片
                                        <!-- <i class="fas fa-spinner fa-spin"></i> -->
                                    </label>
                                    <input type="file" id="customFile" class="form-control"
                                        ref="files"  @change = "uploadfile()">
                                </div>
                                <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                                class="img-fluid" :src = "tempProduct.imageUrl" alt="" >
                            </div>
                            <div class="col-sm-8">
                                <div class="form-group">
                                    <label for="title">標題</label>
                                    <input type="text" class="form-control" id="title"
                                        placeholder="請輸入標題"
                                        v-model = "tempProduct.title">
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="category">分類</label>
                                        <input type="text" class="form-control" id="category"
                                        placeholder="請輸入分類"
                                        v-model = "tempProduct.category">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="price">單位</label>
                                        <input type="unit" class="form-control" id="unit"
                                        placeholder="請輸入單位"
                                        v-model = "tempProduct.unit">
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                    <label for="origin_price">原價</label>
                                        <input type="number" class="form-control" id="origin_price"
                                        placeholder="請輸入原價"
                                        v-model = "tempProduct.origin_price">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="price">售價</label>
                                        <input type="number" class="form-control" id="price"
                                        placeholder="請輸入售價"
                                        v-model = "tempProduct.price">
                                    </div>
                                </div>
                                <hr>

                                <div class="form-group">
                                    <label for="description">產品描述</label>
                                    <textarea type="text" class="form-control" id="description"
                                    placeholder="請輸入產品描述"
                                    v-model = "tempProduct.description">
                                    </textarea>
                                </div>
                                <div class="form-group">
                                    <label for="content">說明內容</label>
                                    <textarea type="text" class="form-control" id="content"
                                        placeholder="請輸入產品說明內容"
                                        v-model = "tempProduct.content">
                                    </textarea>
                                </div>
                                <div class="form-group">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox"
                                        id="is_enabled"
                                        v-model = "tempProduct.is_enabled"
                                        :true-value = "1"
                                        :false-value = "0">
                                        <label class="form-check-label" for="is_enabled">
                                        是否啟用
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click = "updateproduct()">確認</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
         aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                        <span>刪除產品</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        是否刪除 <strong class="text-danger" >{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
                            取消
                        </button>
                        <button type="button" class="btn btn-danger" @click = "removeproduct()">
                            確認刪除
                        </button>
                    </div>
                </div>
            </div>
        </div> 
    </div>
</template>

<script>
import $ from "jquery"
import Pagination from '../components/Pagination.vue'
export default {
    components:{
        Pagination
    },
    data(){
        return{
            products: [],
            tempProduct: {},
            isnew: false,
            pagination: {}
        }
    },
    methods: {
        getproducts(page = 1){ //ES6 參數預設值 
            const api = 'https://vue-course-api.hexschool.io/api/jackyyenhan/products?page='+page
            this.$store.dispatch('updateloading', true);
            this.$http.get(api).then(response => {
                console.log(response.data);
                this.products = response.data.products;
                this.pagination = response.data.pagination;
                this.$store.dispatch('updateloading', false);
            });
        }, 
        openModal(isnew, item){
            if(isnew){
                this.tempProduct = {};
                this.isnew = true;
            }
            else{
                this.tempProduct = Object.assign({}, item);//將item值寫入空的物件並避免有參考的特性
                this.isnew = false;
            }
            $('#productModal').modal('show');
            // console.log($('#productModal'));
        },
        opendelModal(item){
            this.tempProduct = Object.assign({}, item);                   
            $('#delProductModal').modal('show');
        },
        updateproduct(){
            let api = 'https://vue-course-api.hexschool.io/api/jackyyenhan/admin/product';
            let httpmethod = 'post'
            this.$store.dispatch('updateloading', true);
            if(!this.isnew){
                api = 'https://vue-course-api.hexschool.io/api/jackyyenhan/admin/product/'+this.tempProduct.id;
                httpmethod = 'put';
            }
            this.$http[httpmethod](api, { data: this.tempProduct }).then(response => {
                console.log(response.data);
                if(response.data.success){
                    $('#productModal').modal('hide');
                    this.getproducts();
                }
                else{
                    $('#productModal').modal('hide');
                    console.log('新增失敗');
                    this.$store.dispatch('updateloading', false);
                }
            // this.products = response.data.products;
            });
            // console.log(this.tempProduct.title);
        },
        removeproduct(){
            let api = 'https://vue-course-api.hexschool.io/api/jackyyenhan/admin/product/'+this.tempProduct.id;
            this.$store.dispatch('updateloading', true);
            console.log(this.tempProduct.id);
            this.$http.delete(api).then(response => {
                console.log(response.data);
                this.getproducts();
                $('#delProductModal').modal('hide');
            });
        },
        uploadfile(){ //上傳圖片檔案與其他 Call Api 方式很不一樣
            const uploadedfile = this.$refs.files.files[0];
            const formdata = new FormData();
            formdata.append('file-to-upload', uploadedfile);
            const api = 'https://vue-course-api.hexschool.io/api/jackyyenhan/admin/upload';
            this.$http.post(api, formdata, {
                'Content-Type': 'multipart/form-data'
            }).then((response) => {
                console.log(response.data);
                if(response.data.success){
                    this.$set(this.tempProduct, 'imageUrl', response.data.imageUrl); //用$set強制寫入因imageUrl並沒有雙向綁定
                }
                else{
                    this.$bus.$emit('messages:push', response.data.message, 'danger');
                }
            });
        },
    },
    created(){
        this.getproducts();
        // this.$bus.$emit("messages:push", "這是一段訊息", "success");
    }
}
</script>

<style scoped>
    /* td{
        border: 1px solid black;
    } */
</style>