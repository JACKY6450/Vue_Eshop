<template>
    <div class="dashBoard">
        <loading :active.sync="isLoading" ></loading>
        <Navbar />
        <Alert />
        <div class="container-fluid">
            <div class="row">
                <Sidebar />
                <main role="main" class="dashCont col-md-9 ml-sm-auto col-lg-10 px-md-4 bg-white">
                    <router-view />
                </main>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/navbar.vue'
import Sidebar from '@/components/sidebar.vue'
import Alert from '@/components/AlertMessage.vue'
export default {
    components:{
        Navbar,
        Sidebar,
        Alert
    },
    computed:{
        isLoading(){
            return this.$store.state.isLoading;
        }
    },
    created(){
        const token = document.cookie.replace(
            /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
            "$1"
        );
        if (token !== "") {
            this.axios.defaults.headers.common["Authorization"] = token;
            // this.getproducts();
        }
    }
}
</script>

<style>
.dashCont{
    min-height: calc(100vh - 48px);
}
</style>