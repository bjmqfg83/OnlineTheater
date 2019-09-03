<template lang="pug">
  .container
    loading(:active.sync='isLoading')
    Navbar.mt-2
    nav(aria-label='breadcrumb').mt-1
      ol.breadcrumb.bg-transparent.pl-0
        li.breadcrumb-item
          router-link(to="/") 首頁
        li.breadcrumb-item.active(aria-current='page') 電影介紹
    .row
      .col-md-6
        //- 等movie[0].mcover有資料時在載入圖片
        img.img-fluid(:src="require('../../assets/img'+movie[0].mcover)"  v-if="movie[0].mcover" alt='movie.cover') 
      .col-md-6.position-relative(style="z-index: 0")
        div.sticky-top(style="top: 10px")
          h1.h2.text-left  {{movie[0].mname}}
          hr 
          div.text-left
            span.badge.badge-info.mr-auto.p-1 {{movie[0].mtype}}
          p.text-left.h6.my-3.description 演員: {{movie[0].mactor}}
          p.text-left.mb-5.description {{movie[0].mdescription}}
          hr
          div.d-flex.justify-content-between 售價 : {{movie[0].mprice}}
          .mt-4
            .input-group
              select.form-control.mr-2#amount(name="form-control")
                option(:value="num" v-for="num in 10" :key="num") 選購 {{num}} 回
              a(href="#" @click.prevent="addCart(movie[0],$event)").btn.btn-dark
                i.fas.fa-spinner.fa-spin(v-if="fileUpLoading")
                |  加入購物車
    .cart.row.mt-5
      ul
        li(v-for="(lightbox,index) in lightboxpath")
          //- 大圖片
          a(:href="require('../../assets/img'+lightbox)" data-lightbox='lightbox')
            //- thumbnail
            img(:src="require('../../assets/img'+lightbox)" style="width:350px ;height: 186px")
    Footer.mt-2
    //- 購物車二
    .fixed-control(@click="isCartOpen=!isCartOpen")
      i.fas.fa-shopping-bag.text-warning
        span.badge.text-light {{cart.length}}
    //- 購物車清單
    .control(:class="{isCartOpen:isCartOpen}")
      .panel
        h2.mb-4 My Movie Cart
        ul
          li(v-for="(movie,mid) in cart").cart
            img(:src="require('../../assets/img'+movie.mcover)", alt="").thumbnail
            h3.my-auto {{movie.mname}}
              .price.d-none.d-sm-block {{movie.mprice}}$
              .count.d-none.d-md-block x {{1}}
              .remove(@click="removeCart(mid)") -
          li(v-if="!cart.length")
            h3 Your cart is Empty :(  
        hr
        h2.position-relative {{totalPrice}}$
          //- 前往結帳頁面
          router-link(to="/order").btn.btn-outline-light.position-absolute.checkout 前往結帳  
</template>
<script>
import $ from "jquery";
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import lightbox from "lightbox2";
import Navbar from "../Navbar";
import Footer from "../Footer";
export default {
  data() {
    return {
      isLoading: false,
      movie: [{}],
      // 購物車資訊
      cart: [],
      // 購物車是否開啟
      isCartOpen: false,
      // 上傳用 animating icon
      fileUpLoading: false,
      // lightbox用的圖片檔案名稱
      files: [],
      lightboxpath: []
    };
  },
  components: {
    Navbar,
    Footer
  },
  methods: {
    getMovie(id) {
      // 載入頁面時跳loading動畫
      this.isLoading = true;
      //載入頁面顯示資訊
      const API = `${process.env.APIPATH}/homepage/movieintro?id=${id}`;
      // 從server將相關資訊載入
      Vue.axios.get(API).then(res => {
        console.log(res.data);
        this.movie = res.data.movie;
        this.files = res.data.files;
        console.log("movie", this.movie);
        // lightbox用照片讀取
        // avenger讀取問題
          for (var index = 0; index < this.files.length - 1; index++) {
            console.log(this.files[index + 1]);
            this.lightboxpath.push("/" +[this.files[index + 1].replace(/\d/g,"").split(".jpg").join("")+"/" + this.files[index + 1]]);
          }
          console.log(this.lightboxpath);
        // 讀取完畢後取消載入動畫
        // 因為讀取速度太快顯示不出loading動畫所以給500ms延遲時間再結束
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      });
      // 將localStorage裡的cart加載至購物車內,如果為空傳入空陣列
      this.cart = JSON.parse(localStorage.getItem("cart")) || [];
    },
    // 將購物資訊push
    addCart(movie, evt) {
      // 取得select數值
      var amount = $("#amount").val();
      console.log(this.cart);
      var vm = this;
      vm.fileUpLoading = true;
      setTimeout(() => {
        vm.fileUpLoading = false;
        for (var i = 0; i < amount; i++) {
          this.cart.push(movie);
        }
        localStorage.setItem("cart", JSON.stringify(this.cart));
      }, 800);
    },
    removeCart(mid) {
      this.cart.splice(mid, 1);
      localStorage.setItem("cart", JSON.stringify(this.cart));
    }
  },
  created() {
    // 傳遞頁面顯示用的參數
    this.getMovie(this.$route.params.id);
  },
  mounted() {
    // lightbox settings
    lightbox.option({
      resizeDuration: 500,
      wrapAround: true,
      positionFromTop: 100
    });
  },
  computed: {
    totalPrice() {
      return this.cart
        .map(movie => movie.mprice)
        .reduce((total, p) => total + p, 0);
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
  @import "lightbox2/src/css/lightbox.css"
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
  @keyframes floating
    0%
      bottom: 80px+5px
    100%
      bottom: 80px-5px
  *
    font-family: 'sans-serif', 'Microsoft JhengHei'
    
  // chorme隱藏scroll bar
  body::-webkit-scrollbar 
    display: none
  // IE隱藏scroll bar
  body
    -ms-overflow-style: none
    // 將導航條隱藏(for firefox)
    scrollbar-color: transparent transparent
  .description
    line-height: 2rem
  .container
    .input-group 
      z-index: 0
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
    .btn.btn-outline-light.position-absolute.checkout
      right: 0
  .fixed-control
    position: fixed
    cursor: pointer
    z-index: 1000
    right: 80px
    bottom: 80px
    animation: floating 2s linear alternate infinite both
    transition: 0.5s
    &:hover
      transform: scale(1.1)
      opacity: 0.9
    i.fas.fa-shopping-bag
      font-size: 72px
      span
        font-size: initial
        position: absolute
        font-size: 30px
        right: 48%
        top: 38%
        transform: translateX(50%)
  // shopping bag位置調整
  @media screen and (max-width: 800px)
    .fixed-control
      right: 60px
      bottom: 80px
  @media screen and (max-width: 600px)
    .fixed-control
      right: 20px
      bottom: 80px
  // lightboxd燈箱效果
  .cart.row
      ul
          list-style: none
          text-align: center
          padding-left: 0
          overflow: auto
          max-width: auto
      li
          overflow: hidden
          display: inline-block
          margin: 10px
  .lb-number
    display: none !important
  .lb-container .lb-image
    border: none !important
</style>
