<template lang="pug">
  .container
    Navbar.mt-3
    .my-4.row.ordercart
      .col-md-8.orderitem.mt-5(v-if="!nextstep")
        h1.h2.py-3.bgpink.rounded.mt-2 My Order Items
        ul.item.mt-0.border-top.rounded-bottom.pl-0.pb-0
          li.row.mx-0.mb-3.border-top.pt-3(v-for="index in orderitem.itemcount" :key="index")
            div.col-3.p-0
              img(:src="require('../../assets/img'+orderitem.cover[index-1])", alt="").thumbnail
            .item.my-auto.p-0.col-3
              .title {{orderitem.item[index-1]}}
              .type.badge.badge-info.mt-1 {{orderitem.type[index-1]}}
            .price.my-auto.col-2.pl-5 ${{orderitem.price[index-1]}}
            .quantity.col-2.my-auto {{orderitem.quantity[index-1]}}部
            div.my-auto.col-2
              .eachtotal.d-inline-block ${{orderitem.eachtotal[index-1]}}
              i.fas.fa-edit.d-inline-block.ml-1#edit(@click="isCartOpen=!isCartOpen" style="font-size: 18px")
      .mt-5.col-md-8.justify-content-center(v-if="nextstep")
            h1.h2.py-3.bgpink.rounded.mt-2 收件人資訊
            form(@submit.prevent="createOrder")
              .form-group
                label(for='useremail') Email
                input#useremail.form-control(type='email' name='email' v-model='form.user.email' v-validate="'required|email'" :class="{'is-invalid':errors.has('email')}" placeholder='請輸入 Email')
                span.text-danger(v-if="errors.has('email')") {{errors.first('email')}}
              .form-group
                label(for='username') 收件人姓名
                input#username.form-control(type='text' name='name' v-model='form.user.name' v-validate="'required'" :class="{'is-invalid':errors.has('name')}" placeholder='輸入姓名')
                span.text-danger(v-if="errors.has('name')") 姓名必須輸入
              .form-group
                label(for='usertel') 收件人電話
                input#usertel.form-control(type='tel' name='phone' v-model='form.user.tel' placeholder='請輸入電話'  v-validate="'required|phone'" :class="{'is-invalid':errors.has('phone')}")
                span.text-danger(v-if="errors.has('phone')") 電話必須輸入或格式有誤
              .form-group
                label(for='useraddress') 收件人地址
                input#useraddress.form-control(type='text' name='address' v-model='form.user.address' placeholder='請輸入地址' v-validate="'required'" :class="{'is-invalid':errors.has('address')}")
                span.text-danger(v-if="errors.has('address')") 地址欄位不得留空
              .form-group
                label(for='comment') 留言
                textarea#comment.form-control(name='' cols='30' rows='10' v-model='form.message')
              .text-right
                button(type="submit").btn.btn-danger 送出訂單
      .col-md-4.ordersummary.mt-1
        ul.p-0.rounded
          li.row.m-0.py-1.bgpink.rounded-top
            p.col-5.h4.m-0.py-3.mx-auto TotalPrice
          li.py-2.border.rounded-bottom
            span 總計
            span ${{orderitem.totalprice}}
        button.btn.btn-outline-secondary(v-if="nextstep" @click="nextstep=!nextstep") Prev Step
        button.btn.btn-outline-secondary(v-if="!nextstep" @click="nextstep=!nextstep") Next Step
    //- 購物車清單
    .control(:class="{isCartOpen:isCartOpen}")
      .panel
        h2.mb-4 My Movie Cart
        ul
          li(v-for="(movie,mid) in tempdata").cart
            img(:src="require('../../assets/img'+movie.mcover)", alt="").thumbnail
            h3.my-auto {{movie.mname}}
              .price.d-none.d-sm-block {{movie.mprice}}$
              .count.d-none.d-md-block x {{1}}
              .remove(@click="removeCart(mid)") -
          li(v-if="!tempdata.length")
            h3 Your cart is Empty :(  
        hr
        h2.position-relative {{orderitem.totalprice}}$
          button.btn.btn-outline-light.position-absolute.edit(@click="isCartOpen=!isCartOpen") 確定
    Footer
</template>
<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import Navbar from "../Navbar";
import Footer from "../Footer";
export default {
  data() {
    return {
      // 暫時存放localstorage的資料
      tempdata: [],
      // 訂購清單詳細資訊
      // 照片、項目名稱、類型、價錢、數量、各項目總價、總價
      orderitem: {
        cover: [],
        item: [],
        type: [],
        price: [],
        quantity: [],
        eachtotal: [],
        totalprice: 0,
        itemcount: 0
      },
      // 判斷購物車開啟與否
      isCartOpen: false,
      nextstep: false,
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        }
      },
      message: ""
    };
  },
  methods: {
    loadorder() {
      // 取得購物車訂購項目
      this.tempdata = JSON.parse(localStorage.getItem("cart"));
      console.log(this.tempdata);
      // 並且將orderitem清空,將資料變動引發視圖更新
      this.orderitem.cover = [];
      this.orderitem.item = [];
      this.orderitem.type = [];
      this.orderitem.price = [];
      this.orderitem.quantity = [];
      this.orderitem.eachtotal = [];
      this.orderitem.totalprice = 0;
      this.orderitem.itemcount = 0;
      // 處理資料並存進orderitem
      this.tempdata.forEach((item, index) => {
        // cover
        if (this.orderitem.cover.indexOf(item.mcover) == -1) {
          this.orderitem.cover.push(item.mcover);
        }
        // item
        if (this.orderitem.item.indexOf(item.mname) == -1) {
          this.orderitem.item.push(item.mname);
          // 項目沒有重複的話把類型一起push進去
          // type
          this.orderitem.type.push(item.mtype);
          // price各項目單價
          this.orderitem.price.push(item.mprice);
          // quantity暫時先存資料0避免之後計算會是NAN
          this.orderitem.quantity.push(0);
          // eachtotal暫時先存資料0避免之後計算會是NAN
          this.orderitem.eachtotal.push(0);
          // 計算總個幾種項目
          this.orderitem.itemcount += 1;
        }
        // totalPrice
        this.orderitem.totalprice += item.mprice;
      });
      // 確定共有幾項之後開始計算各項目總價以及數量
      for (var index = 0; index < this.orderitem.item.length; index++) {
        this.tempdata.forEach((ele, key) => {
          if (this.orderitem.item[index] == ele.mname) {
            this.orderitem.quantity[index] += 1;
            this.orderitem.eachtotal[index] += ele.mprice;
          }
        });
      }
      // 各項目總價以及各項目總數量另外處理
      console.log(this.orderitem);
    },
    createOrder() {
      // console.log("成功送出資料");
      const vm = this;
      // 獲取訂購者身分
      let subscriber = localStorage.getItem("user");
      // 資料
      let order = vm.form;
      //插入訂單資料
      order.item = this.orderitem.item;
      order.quantity = this.orderitem.quantity;
      order.totalprice = this.orderitem.totalprice;
      order.eachtotal = this.orderitem.eachtotal;
      order.subscriber = subscriber;
      // 路徑
      console.log(order);
      this.$validator.validate().then(result => {
        if (result) {
          // 要有會員身分才可訂購
          if (localStorage.getItem("user")) {
            // do stuff if not valid.
            const API = `${process.env.APIPATH}/order`;
            Vue.axios.post(API, { data: order }).then(res => {
              console.log("訂單已經建立", res);
              alert("訂購成功");
              this.$router.push({
                name: "Checkout"
              });
            });
          } else {
            // 沒有的話就要先登入
            alert("請先登入之後再進行訂購");
            this.$router.push({
              name: "Login"
            });
          }
        } else {
          alert("欄位不完整");
        }
      });
    },
    removeCart(mid) {
      this.tempdata.splice(mid, 1);
      localStorage.setItem("cart", JSON.stringify(this.tempdata));
      this.loadorder();
    }
  },
  created() {
    this.loadorder();
  },
  components: {
    Navbar,
    Footer
  }
};
// Example starter JavaScript for disabling form submissions if there are invalid fields
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  @mixin size($w,$h:$w)
    width: $w
    height: $h
  @mixin flexCenter
    display: flex
    justify-content: center
    align-items: center
  @mixin fixedPos($l,$t)
    position: fixed
    left: $l
    top: $t
  *
    box-sizing: border-box
    // border: 1px solid black
  // chorme隱藏scroll bar
  body::-webkit-scrollbar 
    display: none
  // IE隱藏scroll bar
  body
    -ms-overflow-style: none
    // 將導航條隱藏(for firefox)
    scrollbar-color: transparent transparent
  .thumbnail
    +size(90px,110px)
    display: inline-block
    margin-right: 20px
  i.fas.fa-edit
    cursor: pointer
  .control
    +size(100%)
    +fixedPos(0,0)
    +flexCenter
    z-index: 900
    color: #eee
    background-color: rgba(1,1,1,0.8)
    padding: 5vw
    box-sizing: border-box
    opacity: 0
    pointer-events: none
    transition: 0.5s
    &.isCartOpen
      opacity: 1
      pointer-events: initial
    .panel
      width: 70%
      max-height: 550px
    hr
      border-color: white
      height: 2px
    //將scrollbar隱藏起來同時保留滾動功能
    ul::-webkit-scrollbar 
        display: none
    ul
      padding: 0
      list-style: none
      overflow-x: hidden
      overflow-y: auto
      max-height: 400px
      -ms-overflow-style: none
      li
        display: flex
        padding: 5px 10px
        cursor: pointer
        border-radius: 5px
        transition: 0.5s
        &:hover
          background-color: rgba(white,0.1)
          transform: translateY(-10px)
        h3
          font-size: 17px
          font-weight: normal
          display: inline-block
          position: relative
          width: 100%
          opacity: 0.8
          .price
            float: right
            margin-top: 5px
          .count
            position: absolute
            right: 100px
            top: 50%
            transform: translateY(-50%)
          .remove
            display: inline-block
            padding: 4px 15px
            background-color: rgba(white,0.3)
            border-radius: 50px
            font-size: 17px
            transition: 0.5s
            margin-left: 10px
            &:hover
              background-color: #ef4c4c
        .thumbnail
          +size(50px,70px)
          display: inline-block
          margin-right: 20px
    .btn.btn-outline-light.position-absolute.edit
      right: 0
  ul
    list-style: none
    border-color: #bbb !important
  .orderitem
    .price,.quantity,.eachtotal
      font-size: 18px
    .bgpink
      background-color: #fd5c63
      color: #fff
    // IE scroll bar hidden
    ul.item::-webkit-scrollbar 
        display: none 
    ul.item
      height: 600px
      overflow-y: auto
      // IE Scroll bar hidden
      -ms-overflow-style: none
      // firefox導航條隱藏
      scrollbar-color: transparent transparent
  .ordersummary
    ul.p-0
      margin-top: 55px
    .bgpink
      background-color: #fd5c63
      color: #fff
  @media screen and (max-width: 990px)
    ul
      li p
        font-size: 20px

</style>