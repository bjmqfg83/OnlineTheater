<template lang="pug">
  .container
    .row
      div.col-md-6.d-flex(@submit.prevent="register")
        form.form-group.form-signin
            h1.my-3.font-weight-normal Register
            label.sr-only(for='inputName') 姓名
            input#inputName.form-control.my-1(type='text' placeholder='輸入姓名'  required='' autofocus='' v-model="registInfo.realName")
            small.d-flex.text-danger(:class="{errshow:!error.realName}") 姓名格式有誤
            label.sr-only(for='inputAccount') 帳號
            input#inputAccount.form-control.my-1(type='text' placeholder='輸入6~12位帳號'  required='' autofocus='' v-model="registInfo.account")
            small.d-flex.text-danger(:class="{errshow:!error.account}") 帳號重複或格式有誤
            label.sr-only(for='inputPassword') 密碼
            input#inputPassword.form-control.my-1(type='password' placeholder='輸入8~16位密碼' required='' v-model="registInfo.password")
            small.d-flex.text-danger(:class="{errshow:!error.password}") 密碼有誤
            label.sr-only(for='inputEmail') 信箱
            input#inputEmail.form-control.my-1(type='email' placeholder='輸入註冊信箱' required='' v-model="registInfo.email")
            small.d-flex.text-danger(:class="{errshow:!error.email}") 信箱重複或格式有誤
            label.sr-only(for='inputphone') 手機號碼
            input#inputphone.form-control.my-1(type='text' placeholder='輸入手機號碼' required='' v-model="registInfo.phone")
            small.d-flex.text-danger(:class="{errshow:!error.phone}") 手機重複或格式有誤
            .form-check.d-inline
              input#gender1.form-check-input(type='radio' name='gender' value='1' v-model="registInfo.gender" required="")
              label.form-check-label(for='gender1') 男生
            .form-check.d-inline.ml-3
              input#gender2.form-check-input(type='radio' name='gender' value='0' v-model="registInfo.gender" required="")
              label.form-check-label(for='gender2') 女生
            button.btn.btn-lg.btn-secondary.btn-block.mt-3(type='submit') register
            router-link(to="/login" style="left: 200px;bottom: 88px").text-primary.text-right.position-relative.font-weight-bold 快速登入
      div.col-md-6.d-sm-none.d-md-block.position-relative
        #carouselExampleControls.carousel.slide.position-absolute(data-ride='carousel' data-interval="3000")
          ol.carousel-indicators
            li.active(data-target='#carouselExampleIndicators' data-slide-to='0')
            li(data-target='#carouselExampleIndicators' data-slide-to='1')
            li(data-target='#carouselExampleIndicators' data-slide-to='2')
          .carousel-inner.border-secondary
            .carousel-item.active
              img.d-block.w-100.rounded-lg(src='../../assets/img/avengers.jpg' alt='movie1')
            .carousel-item
              img.d-block.w-100.rounded-lg(src='../../assets/img/captain.jpg' alt='movie2')
            .carousel-item
              img.d-block.w-100.rounded-lg(src='../../assets/img/thor.jpg' alt='movie3')
</template>
<script>
import $ from "jquery";
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
$(".carousel").carousel();
export default {
  data() {
    return {
      registInfo: {
        realName: "",
        account: "",
        password: "",
        email: "",
        phone: "",
        gender: ""
      },
      error: {
        realName: false,
        account: false,
        password: false,
        email: false,
        phone: false,
        gender: false
      }
    };
  },
  methods: {
    register() {
      // alert("註冊頁面");
      console.log(this.registInfo);
      // 註冊時先進行正規表達式的驗證
      // 簡易帳號密碼驗證,不忽略大小寫
      let regrn = /^[(\u4e00-\u9fa5)|(a-zA-Z)]{2,16}$/g;
      let regn = /^[a-zA-Z0-9]{6,12}$/g;
      let regp = /^[a-zA-Z0-9]{8,16}$/g;
      let regemail = /^([\w\.\-]){1,64}\@([\w\.\-]){1,64}$/g;
      let regphone = /^09\d{8}$/g;
      let regender = /^[0-1]{1}$/g;
      let resrn = regrn.test(this.registInfo.realName);
      let resn = regn.test(this.registInfo.account);
      let resp = regp.test(this.registInfo.password);
      let resemail = regemail.test(this.registInfo.email);
      let resphone = regphone.test(this.registInfo.phone);
      let resgender = regender.test(this.registInfo.gender);
      let resAll = resrn && resn && resp && resemail && resphone && resgender;
      console.log(resAll);
      if (!resrn) {
        $("#inputName").addClass("errborder");
        this.error.realName = true;
      } else {
        $("#inputName").removeClass("errborder");
        this.error.realName = false;
      }
      if (!resn) {
        $("#inputAccount").addClass("errborder");
        this.error.account = true;
      } else {
        $("#inputAccount").removeClass("errborder");
        this.error.account = false;
      }
      if (!resp) {
        $("#inputPassword").addClass("errborder");
        this.error.password = true;
      } else {
        $("#inputPassword").removeClass("errborder");
        this.error.password = false;
      }
      if (!resemail) {
        $("#inputEmail").addClass("errborder");
        this.error.email = true;
      } else {
        $("#inputEmail").removeClass("errborder");
        this.error.email = false;
      }
      if (!resphone) {
        $("#inputphone").addClass("errborder");
        this.error.phone = true;
      } else {
        $("#inputphone").removeClass("errborder");
        this.error.phone = false;
      }
      if (resAll) {
        const API = `${process.env.APIPATH}/user/register`;
        // post請求,提交參數
        Vue.axios
          .post(API, {
            realName: this.registInfo.realName,
            account: this.registInfo.account,
            password: this.registInfo.password,
            email: this.registInfo.email,
            phone: this.registInfo.phone,
            gender: this.registInfo.gender
          })
          .then(res => {
            if (res.data) {
              // 帳號註冊成功則生成token並儲存,之後跳至首頁
              console.log("data成功", res.data);
              // 生成token
              let token =
                "bjeot" +
                parseInt(Math.random(425544899 * 23598) * 5489712) +
                39157;
              // 儲存至localStorage
              localStorage.setItem("theatertoken", token);
              localStorage.setItem("user", this.registInfo.realName);
              // 暫時跳到Hello World,跳轉時攜帶token做驗證
              this.$router.push({
                name: "HomePage",
                params: { theatertoken: token }
              });
            } else {
              console.log("帳號密碼信箱重複,請重新創建");
            }
          });
      }
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
*
//  border: 1px solid black
div
    height: 100%
    width: 100%
.form-signin
  width: 100%
  // max-width: 330px
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
    &[type="email"]
      margin-bottom: -1px
      border-bottom-right-radius: 0
      border-bottom-left-radius: 0
    &[type="password"]
      margin-bottom: 10px
      border-top-left-radius: 0
      border-top-right-radius: 0
#carouselExampleControls.carousel.slide
  max-height: 50%
  left: 0
  top: 26%
  overflow: hidden
  .carousel-indicators 
    li
      width: 10%
      height: 5px
      background-color: #cdcdcd
      cursor: pointer
      &.active
        background-color: #FFCE00
.errshow
  opacity: 0
.errborder
  border-color: #dc3545
</style>
