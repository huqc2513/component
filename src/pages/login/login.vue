<template>
    <div>
      <div class="login-content">
        <div class="login-logo">
          <img src="./img/login-logo.png" alt="">
        </div>
        <p class="title">
          超过1000+的海外正品，正规渠道，让您足不出户购尽天下货
        </p>
        <div class="login-form">
          <div class="input">
            <i class="email"></i>
            <input type="text" placeholder="账号"  v-model="from.name" autocomplete="off" name="phone">
          </div>
          <div class="input">
            <i class="pwd"></i>
            <input type="password"  v-model="from.pass" v-on:keyup.enter='login'   placeholder="***********"  autocomplete="off" name="password">
            <i class="show"></i>
          </div>
          <p class="find-pwd">忘记密码？</p>
          <button class="login-btn" id="btn"   @click="login">登录</button>
     <!--<p class="register">没有账号？<a href="../register/register.html">注册</a></p>-->
        </div>
      </div>
    </div>
</template>

<script>





  //console.log(configs.devUrl);

    export default {
        name: "loging",
        data() {
          return {
            from:{
              name:"",
              pass:"",
            }
          }
        }
        ,
        methods:{
             login(){

       
             }
          }
    }
</script>

<style lang="stylus" scoped>
  .login-content{
    position: absolute;
    padding: 0 25px ;
    width: 100%;
    height: 100%;
    background: #fff;
    left: 0;
    top: 0;
  }
  .login-logo{
    width: 135px;
    height: 95px;
    margin: 0 auto;
    margin-top: 77px;
  }
  .login-logo img{
    width: 135px;
    height: 95px;
    margin: 0 auto;
  }
  .login-content .title{
    margin-top: 22px;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
  }
  .login-form .input{
    display: flex;

    align-items:center;
    align-content:flex-start;
    width: 100%;
  
    height: 50px;
    border :none;
    margin-bottom: 25px;
  }
  .login-form .email{
    width: 30px;
    height: 30px;
    background: url("img/login-email.png") no-repeat ;
    background-size: 30px 30px;
  }
  .login-form .pwd{
    width: 30px;
    height: 30px;
    background: url("img/login-pwd.png") no-repeat ;
    background-size: 30px 30px;
  }
  .login-form .show{
    width: 30px;
    height: 20px;
    background: url("img/login-show.png") no-repeat ;
    background-size: 30px 20px;
  }
  .login-form  input{
    position: relative;
    top: 3px;
    width:calc(100% - 60px ) ;
    height: 30px;
    line-height: 30px;
    padding: 0 20px;
    outline:none;
    font-size: 12px;
    border :none;
  }
  .login-form  .find-pwd{
    text-align: center;
    font-size: 14px;
    color: #878787;
  }
  .login-form .login-btn{
    width: 100%;
    background: #87c369;
    color: #ffffff;
    border: none;
    height: 65px;
    margin: 35px 0 ;
  }
  .register{
    text-align: center;
    font-size: 14px;
  }
  .register a{
    display: inline-block;
    font-weight: bold;
    /*text-decoration:underline;*/
    /*border-bottom: 1px solid #444444;*/
    color: #444444;
    padding: 0 3px;
    padding-bottom: 6px;
  }
</style>
