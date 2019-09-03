<template lang="pug">
    div.d-flex.align-items-center(@submit.prevent="signin")
      form.form-group.form-signin.needs-validation.novalidate
          img.rounded(src="../../assets/img/movie.jpg", alt="theaterloginicon" style="width: 100px;height: 100px")
          h1.h4.my-3.font-weight-normal Welcome
          label.sr-only(for='inputAccount') Account
          input#inputAccount.form-control.mb-1(type='text' placeholder='輸入6~12位帳號'  required='' autofocus='' v-model="user.username" :class="{errborder:error.name}")
          small.d-flex.text-danger(:class="{errshow:!error.name}") 帳號重複或格式有誤
          label.sr-only(for='inputPassword') Password
          input#inputPassword.form-control.mb-1.mt-1(type='password' placeholder='輸入8~16位密碼' required='' v-model="user.password" :class="{errborder:error.pwd}")
          small.d-flex.mb-1.text-danger(:class="{errshow:!error.pwd}") 密碼錯誤或格式有誤
          button.btn.btn-lg.btn-secondary.btn-block.mb-3(type='submit') Sign in
          router-link(to="/register").text-primary.text-right 快速註冊
</template>
<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      error: {
        name: false,
        pwd: false
      }
    };
  },
  methods: {
    signin() {
      // 先驗證政則表達式
      // 簡易帳號密碼驗證,不忽略大小寫
      let regn = /^[a-zA-Z0-9]{6,12}$/g;
      let regp = /^[a-zA-Z0-9]{8,16}$/g;
      let resn = regn.test(this.user.username);
      let resp = regp.test(this.user.password);
      if (!resn) {
        this.error.name = true;
      } else {
        this.error.name = false;
      }
      if (!resp) {
        this.error.pwd = true;
      } else {
        this.error.pwd = false;
      }
      if (resn && resp) {
        const API = `${process.env.APIPATH}/user/login?uname=${this.user.username}&upwd=${this.user.password}`;
        Vue.axios.get(API).then(res => {
          console.log("res", res);
          // 如果回傳值為true則跳轉
          if (res.data.length > 0) {
            // 生成驗證登入狀態的token,亂數0~9999+固定數字+字串
            let token =
              "bjeot" +
              parseInt(Math.random(425544899 * 23598) * 5489712) +
              3159157;
            //儲存token跟使用者名稱
            localStorage.setItem("theatertoken", token);
            localStorage.setItem("user", res.data[0].realname);
            // 暫時跳到Hello World,跳轉時攜帶token做驗證
            this.$router.push({
              name: "HomePage",
              params: { theatertoken: token }
            });
          } else {
            this.error.name = true;
            this.error.pwd = true;
          }
        });
        console.log("user", this.user.username);
        console.log("password", this.user.password);
      }
    }
  }
};
// Example starter JavaScript for disabling form submissions if there are invalid fields
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
small
  font-size: 12px
div
    height: 100%
    width: 100%
.form-signin
  width: 100%
  max-width: 330px
  padding: 15px
  margin: auto
  .checkbox
    font-weight: 400
  .form-control
    position: relative
    box-sizing: border-box
    height: auto
    padding: 10px
    font-size: 16px
    &:focus
      z-index: 2
  input
    &[type="text"]
      margin-bottom: 10px
    &[type="password"]
      margin-bottom: 10px
  .errshow
    opacity: 0
  .errborder
    border-color: #dc3545
</style>
