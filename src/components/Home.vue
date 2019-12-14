<template>
  <div>
    <div class="vue-title" v-show="ifLogin">You need to login!!!</div>
    <div class="vue-title" v-show="showUserName">Welcome {{UserName}}</div>
    <a href="#/login">
      <button class="btn btn-primary btn1" data-test="loginbtn" v-show="ifLogin">Login</button>
    </a>
    <a href="#/register">
      <button class="btn btn-primary btn1" data-test="registerbtn" v-show="ifLogin">Register</button>
    </a>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                UserName: '',
                ifLogin: true,
                showUserName: false
            }
        },
        mounted() {
            /* 页面挂载获取保存的值，渲染到页面上 */
            var username = localStorage.getItem('username');
            this.UserName = JSON.parse(username);
            console.log(this.UserName);
            // /* 如果cookie不存在，则跳转到登录页 */
            if (this.UserName == null) {
                console.log('not login')
            } else {
                this.ifLogin = false;
                this.showUserName = true;
                console.log(this.UserName + ' has logged in')
            }
        },

    }
</script>

<style>
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }

  .btn1 {
    border: 1px solid silver;
    display: block;
    margin: 20px auto;
    border-radius: 50px;
    width: 300px;
    font-size: x-large;
  }
</style>
