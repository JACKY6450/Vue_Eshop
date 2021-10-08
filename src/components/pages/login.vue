<template>
    <div style="margin-top: 4rem">
        <form class="form-signin" @submit.prevent = "signin()">
            <!-- <img class="mb-4" src="/docs/4.6/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"> -->
            <h1 class="h3 mb-3 font-weight-normal">請登入</h1>
            <label for="inputEmail" class="sr-only">Email address</label>
            <input type="email" id="inputEmail" class="form-control" 
             placeholder="Email address" required autofocus v-model = "user.username">
            <label for="inputPassword" class="sr-only">Password</label>
            <input type="password" id="inputPassword" class="form-control" 
             placeholder="Password" required v-model = "user.password">
            <div class="checkbox mb-3">
                <label>
                    <input type="checkbox" value="remember-me"> Remember me
                </label>
            </div>
            <button class="btn btn-lg btn-cyan btn-block" type="submit">Login</button>
            <p class="mt-5 mb-3 text-muted">&copy; 2017-2021</p>
        </form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            user:{
                username: '',
                password: ''
            }
        }
    },
    methods:{
        signin(){
            const api = 'https://vue-course-api.hexschool.io/admin/signin'
            this.$http.post(api, this.user).then(response => {
                // console.log(response.data);
                if(response.data.success){
                     // 將伺服器傳來的 token 及 expired 給讀出來
                    const token = response.data.token;
                    const expired = response.data.expired;
                    // console.log(token, expired);
                    document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
                    this.$router.push('/admin/products');
                }
            });
        }
    }
}
</script>

<style scoped>
/* html,
body {
  height: 100%;
} */

/* body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
} */

.form-signin {
    width: 100%;
    max-width: 330px;
    padding: 40px;
    margin: auto;
}
.form-signin .checkbox {
    font-weight: 400;
}
.form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
}
.form-signin .form-control:focus {
    z-index: 2;
}
.form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
.btn-block{
    width: 100%;
}
</style>>

