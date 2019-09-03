<template lang="pug">
  #homepage
    loading(:active.sync='isLoading')
    .container.header.pl-0.mt-2.pr-0
      Navbar
    //- banner輪播
    .container.mt-3
      .row
        .swiper-container
          // Additional required wrapper
          .swiper-wrapper
            // Slides
            .swiper-slide
              img.img-fluid(src="../assets/img/carousel/divinefury.jpg", alt="carousel1")
            .swiper-slide
              img.img-fluid(src="../assets/img/carousel/doraemon.jpg", alt="carousel2")
            .swiper-slide
              img.img-fluid(src="../assets/img/carousel/fastandfurious.jpg", alt="carousel3")
            .swiper-slide
              img.img-fluid(src="../assets/img/carousel/scarystories.jpg", alt="carousel4")
          // If we need pagination
          .swiper-pagination.text-right
      .moviesection.row
          .col-sm-3
            .list-group.mt-5.categories.sticky-top
                a(href="#movie-all" data-toggle="list").list-group-item.list-group-item-action.active.rounded.text-dark.mt-3.py-3
                  i.fas.fa-video.mr-2
                  span 熱銷影集
                a(href="#movie-recently" data-toggle="list").list-group-item.list-group-item-action.rounded.text-dark.mt-3.py-3
                  i.fas.fa-play.mr-2
                  span 近期上映
                a(href="#movie-classic" data-toggle="list").list-group-item.list-group-item-action.rounded.text-dark.mt-3.py-3
                  i.fas.fa-tv.mr-2
                  span 經典回顧
                a(href="#movie-recommend" data-toggle="list").list-group-item.list-group-item-action.rounded.text-dark.mt-3.py-3
                  i.fas.fa-hand-point-right.mr-2
                  span 官方強推
          .products.col-sm-9.col-8.mt-5.mx-auto.tab-content(v-if="movies")   
            .tab-pane.active#movie-all
              .input-group.col-md-4.pl-0.mt-3
                input(type="text" placeholder="搜尋電影" @keydown.enter="searchmovie(movies)" v-model="searchTitle").form-control
                .input-group-append
                  button.btn.btn-outline-warning(type='submit') Search 
              .row
                .col-lg-4.col-md-6.mb-3.mt-3(v-for="(movie,key) in movies" :class="{selected:(movie.mname == selectedMovie[key])}" :key="key")
                  .card.text-center.h-100.box-shadow.rounded-lg
                    img.card-img-top.img-fluid(:src="require('../assets/img'+movie.mcover)", alt="movieCover")
                    .card-body
                      h5.card-title {{movie.mname}}
                      p.card-text 導演 : {{movie.mdirector}}
                      p.card-text 演員 : {{movie.mactor}}
                    .card-footer.border-top-0.bg-white
                      p.card-text 價格 : {{movie.mprice}}
                      button(type="button" @click="movieintro(movie)").btn.btn-dark.btn-sm.mx-2.mt-1 電影介紹
                      //- 將電影push進購物車
                      button(type="button" @click="addCart(movie,$event)").btn.btn-info.btn-sm.mt-1 加入購物車
                nav.col-12.justify-content-end(aria-label='Page navigation')
                  ul.pagination
                    li.page-item(:class="{disabled:!prevpage}")
                      a.page-link(href='#' aria-label='Previous' @click.prevent="getProducts(Number(currentpage)-1)")
                        span(aria-hidden='true') &laquo;
                    li.page-item(v-for="page in pagenum" :class="{'active': currentpage == page}")
                      a.page-link(href='#' @click.prevent="getProducts(page)") {{page}}
                    li.page-item(:class="{disabled:!nextpage}")
                      a.page-link(href='#' aria-label='Next' @click.prevent="getProducts(Number(currentpage)+1)")
                        span(aria-hidden='true') &raquo;
            .tab-pane#movie-recently
              .input-group.col-md-4.mr-auto.pl-0.mt-3
                input(type="text" placeholder="搜尋電影" @keydown.enter="searchmovie(recently)" v-model="searchTitle").form-control
                .input-group-append
                  button.btn.btn-outline-warning.my-2.my-sm-0(type='submit') Search
              .row
                .col-lg-4.col-md-6.mb-3.mt-3(v-for="(movie,key) in recently" :class="{selected:(movie.mname == selectedMovie[key])}" :key="key")
                  .card.text-center.h-100.box-shadow.rounded-lg
                    img.card-img-top.img-fluid(:src="require('../assets/img'+movie.mcover)", alt="movieCover")
                    .card-body
                      h5.card-title {{movie.mname}}
                      p.card-text 導演 : {{movie.mdirector}}
                      p.card-text 演員 : {{movie.mactor}}
                    .card-footer.border-top-0.bg-white
                      p.card-text 價格 : {{movie.mprice}}
                      button(type="button" @click="movieintro(movie)").btn.btn-dark.btn-sm.mx-2.mt-1 電影介紹
                      //- 將電影push進去
                      button(type="button" @click="addCart(movie,$event)").btn.btn-info.btn-sm.mt-1 加入購物車
                nav.col-12.justify-content-end(aria-label='Page navigation'  v-if="recently.length>9")
                  ul.pagination
                    li.page-item(:class="{disabled:!(Math.ceil(recently.length/9)>1)}")
                      a.page-link(href='#' aria-label='Previous' @click.prevent="getProducts(Number(currentpage)-1)")
                        span(aria-hidden='true') &laquo;
                    li.page-item(v-for="page in  Math.ceil(recently.length/9)" :class="{'active': currentpage == page}")
                      a.page-link(href='#' @click.prevent="getProducts(page)") {{page}}
                    li.page-item(:class="{disabled:!(Math.ceil(recently.length/9)>1)}")
                      a.page-link(href='#' aria-label='Next' @click.prevent="getProducts(Number(currentpage)+1)")
                        span(aria-hidden='true') &raquo;
            .tab-pane#movie-classic
              .input-group.col-md-4.mr-auto.pl-0.mt-3
                input(type="text" placeholder="搜尋電影" @keydown.enter="searchmovie(classic)" v-model="searchTitle").form-control
                .input-group-append
                  button.btn.btn-outline-warning.my-2.my-sm-0(type='submit') Search
              .row
                .col-lg-4.col-md-6.mb-3.mt-3(v-for="(movie,key) in classic" :key="key" :class="{selected:(movie.mname == selectedMovie[key])}" v-if="movie.mcategory=='classic'")
                  .card.text-center.h-100.box-shadow.rounded-lg
                    img.card-img-top.img-fluid(:src="require('../assets/img'+movie.mcover)", alt="movieCover")
                    .card-body
                      h5.card-title {{movie.mname}}
                      p.card-text 導演 : {{movie.mdirector}}
                      p.card-text 演員 : {{movie.mactor}}
                    .card-footer.border-top-0.bg-white
                      p.card-text 價格 : {{movie.mprice}}
                      button(type="button" @click="movieintro(movie)").btn.btn-dark.btn-sm.mx-2.mt-1 電影介紹
                      //- 將電影push進去
                      button(type="button" @click="addCart(movie,$event)").btn.btn-info.btn-sm.mt-1 加入購物車   
                nav.col-12.justify-content-end(aria-label='Page navigation' v-if="classic.length>9")
                  ul.pagination
                    li.page-item(:class="{disabled:!(getProducts(page)>1)}")
                      a.page-link(href='#' aria-label='Previous' @click.prevent="getProducts(Number(currentpage)-1)")
                        span(aria-hidden='true') &laquo;
                    li.page-item(v-for="page in Math.ceil(classic.length/9)" :class="{'active': currentpage == page}")
                      a.page-link(href='#' @click.prevent="getProducts(page)") {{page}}
                    li.page-item(:class="{disabled:!(getProducts(page)>1)}")
                      a.page-link(href='#' aria-label='Next' @click.prevent="getProducts(Number(currentpage)+1)")
                        span(aria-hidden='true') &raquo;  
            .tab-pane#movie-recommend
              .input-group.col-md-4.mr-auto.pl-0.mt-3
                input(type="text" placeholder="搜尋電影" @keydown.enter="searchmovie(recommend)" v-model="searchTitle").form-control
                .input-group-append
                  button.btn.btn-outline-warning.my-2.my-sm-0(type='submit') Search
              .row    
                .col-lg-4.col-md-6.mb-3.mt-3(v-for="(movie,key) in recommend" :key="key" :class="{selected:(movie.mname == selectedMovie[key])}" v-if="movie.mcategory=='recommend'")
                  .card.text-center.h-100.box-shadow.rounded-lg
                    img.card-img-top.img-fluid(:src="require('../assets/img'+movie.mcover)", alt="movieCover")
                    .card-body
                      h5.card-title {{movie.mname}}
                      p.card-text 導演 : {{movie.mdirector}}
                      p.card-text 演員 : {{movie.mactor}}
                    .card-footer.border-top-0.bg-white
                      p.card-text 價格 : {{movie.mprice}}
                      button(type="button" @click="movieintro(movie)").btn.btn-dark.btn-sm.mx-2.mt-1 電影介紹
                      //- 將電影push進去
                      button(type="button" @click="addCart(movie,$event)").btn.btn-info.btn-sm.mt-1 加入購物車
                nav.col-12.justify-content-end(aria-label='Page navigation' v-if="recommend.length>9")
                  ul.pagination
                    li.page-item(:class="{disabled:!(Math.ceil(recommend.length/9)>1)}")
                      a.page-link(href='#' aria-label='Previous' @click.prevent="getProducts(Number(currentpage)-1)")
                        span(aria-hidden='true') &laquo;
                    li.page-item(v-for="page in Math.ceil(recommend.length/9)" :class="{'active': currentpage == page}")
                      a.page-link(href='#' @click.prevent="getProducts(page)") {{page}}
                    li.page-item(:class="{disabled:!(Math.ceil(recommend.length/9)>1)}")
                      a.page-link(href='#' aria-label='Next' @click.prevent="getProducts(Number(currentpage)+1)")
                        span(aria-hidden='true') &raquo; 
    Footer
    //- 添加購物車動畫
    img(:src="require('../assets/img'+currentMovie.mcover)" alt="currentMovie" v-if="currentMovie").buybox
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
            img(:src="require('../assets/img'+movie.mcover)"  alt="thumbnail" v-if="movie.mcover").thumbnail
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
import Swiper from "swiper";
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import Router from "vue-router";
import "swiper/dist/css/swiper.min.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  TweenMax,
  CSSPlugin,
  ScrollToPlugin,
  Draggable,
  Elastic
} from "gsap/all";
export default {
  name: "HomePage",
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      movies: [],
      recently: [],
      classic: [],
      recommend: [],
      username: null,
      // 存放購物車空陣列
      cart: [],
      currentMovie: null,
      isCartOpen: false,
      isLoading: false,
      prevpage: false,
      nextpage: false,
      currentpage: 1,
      pagenum: 0,
      searchTitle: null,
      selectedMovie: []
    };
  },
  methods: {
    // 頁面加載
    getProducts(page = 1) {
      // 預設一開始載入時只載入9筆資料,載入第一頁
      console.log("page", page);
      // 載入頁面時跳loading動畫
      this.isLoading = true;
      const API = `${process.env.APIPATH}/homepage?page=${page}`;
      // 從server將相關資訊載入
      Vue.axios.get(API).then(res => {
        console.log(res.data);
        // movie資料
        this.movies = res.data.movie;
        // recently資料
        this.recently = res.data.recently;
        // classic資料
        this.classic = res.data.classic;
        // recommend資料
        this.recommend = res.data.recommend;
        // 上一頁
        this.prevpage = res.data.prevpage;
        // 下一頁
        this.nextpage = res.data.nextpage;
        // 總頁數
        this.pagenum = res.data.pagenum;
        // 當前頁
        this.currentpage = res.data.currentpage;
        // 讀取完畢後取消載入動畫
        // 因為讀取速度太快顯示不出loading動畫所以給500ms延遲時間再結束動畫
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      });
      // 將localStorage裡的cart加載至購物車內,如果為空傳入空陣列
      this.cart = JSON.parse(localStorage.getItem("cart")) || [];
    },
    // 將購物資訊push
    addCart(movie, evt) {
      console.log(this.cart);
      // 獲取元素相對於當前視窗(可視區域)的位置 evt.clientX evt.clientY
      // console.log(evt.clientX);
      // console.log(evt.clientY);
      this.currentMovie = movie;
      // 判斷瀏覽器是否為IE,如果為IE就不執行TweenMax動畫
      var ua = navigator.userAgent;
      // 元件更新之後才去執行動畫,
      // movie推進currentMovie後
      // console.log(ua);
      // console.log("uap", ua.indexOf("Edge"));
      // console.log("MSIE", ua.indexOf("MSIE"));
      // console.log("Trident", ua.indexOf("Trident"));
      this.$nextTick(() => {
        // 不是IE就執行動畫
        if (
          ua.indexOf("Edge") == -1 &&
          ua.indexOf("MSIE") == -1 &&
          ua.indexOf("Trident") == -1
        ) {
          TweenMax.from(".buybox", 0.8, {
            left: evt.clientX,
            top: evt.clientY,
            opacity: 1
          });
        }
        setTimeout(() => {
          this.cart.push(movie);
          localStorage.setItem("cart", JSON.stringify(this.cart));
        }, 800);
      });
    },
    removeCart(mid) {
      this.cart.splice(mid, 1);
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    // 搜尋特定的電影
    searchmovie(movies) {
      // 取得該電影在陣列中的下標
      // 後續推入vue的資料不會更新視圖,需要使用vue.$set
      //如果為空顯示全部的內容
      console.log(movies);
      if (this.searchTitle == "") {
        $(".selected")
          .siblings()
          .show()
          .removeClass("selected");
      } else {
        // 清空陣列
        this.selectedMovie.length = 0;
        movies.forEach((movie, index) => {
          if (movie.mname.indexOf(this.searchTitle) !== -1) {
            this.$set(this.selectedMovie, index, movie.mname);
          }
        });
        //等待DOM元素更新完後(加上.selected)後將其餘兄弟隱藏,不加會導致畫面的更新停留在上一部
        this.$nextTick(() => {
          $(".selected")
            .show()
            .siblings()
            .hide();
        });
      }
    },
    // 跳至電影介紹頁面
    movieintro(movie) {
      // console.log(movie);
      //頁面跳轉,id會作為之後後端查詢資訊所要使用的參數
      this.$router.push({ path: `/movieintro/${movie.id}` });
    }
  },
  created() {
    // console.log(process.env.APIPATH);
    // console.log(process.env.CUSTOMPATH);
    // 加載頁面
    this.getProducts();
  },
  mounted() {
    // 等到DOM載入至頁面之後創建
    // jquery swiper 輪播套件
    var mySwiper = new Swiper(".swiper-container", {
      // Optional parameters
      direction: "horizontal",
      speed: 1000,
      loop: true,
      // effect: "fade",
      autoplay: {
        delay: 3000
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      }
    });
  },
  watch: {
    cart() {
      TweenMax.from(".fa-shopping-bag", 0.3, {
        scale: 0.5
      });
    },
    selectedMovie() {}
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
    // border: 1px solid black
  // chorme隱藏scroll bar
  body::-webkit-scrollbar 
    display: none
  // IE隱藏scroll bar
  body
    -ms-overflow-style: none
    // 將導航條隱藏(for firefox)
    scrollbar-color: transparent transparent
  .buybox
    +size(50px,80px)
    position: fixed
    right: 80px
    bottom: 80px
    z-index: 10
    opacity: 0
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
  .card.text-center.h-100.box-shadow.rounded-lg
    transition: all 0.5s
    cursor: pointer
    &:hover
      transform: scale(1.05)
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
  @media screen and (max-width: 800px)
    .fixed-control
      right: 60px
      bottom: 80px
  @media screen and (max-width: 600px)
    .fixed-control
      right: 20px
      bottom: 80px
  li .shopcart
    position: relative
    cursor: pointer
    z-index: 1000
    i
      font-size: 22px
    span.badge.badge-pill
      position: absolute
      left: 15px
      bottom: 15px
      font-size: 12px
  .swiper-container
    max-width: 1280px
    width: 100%
    height: auto
  .swiper-pagination
      width: 100%
      height: 30px
      top: 10px
      padding-right: 5px
      .swiper-pagination-bullet
        border-radius: 0
        width: 10px
        height: 10px
      .swiper-pagination-bullet-active
        background: #ff6a00
  .moviesection
    .row.products .card
      width: auto
      overflow: hidden
      &:hover
        cursor: pointer
        img
          transition: all 0.5s
          transform: scale(1.05)
    .list-group.categories
      z-index: 0
      a
        text-decoration: none
        font-size: 20px
    .list-group-item.list-group-item-action.active
      background-color: #1c252c
      border-color: #1c252c
      color: #fff !important
  .card-img-top
    max-width: 100%
    height: 300px
  .page-item .page-link
    color: #1c252c
  .page-item.active .page-link
    background-color: #1c252c
    border-color: #1c252c
  @media screen and (max-width: 992px)
    .swiper-pagination-bullet
        border-radius: 0
        opacity: 1
        background: white
    .swiper-pagination-bullet-active
        opacity: 1
    .list-group.categories
        span 
          display: block
  .container.header
    // max-width: 960px
  nav.navbar li.d-inline-block.position-relative
    top: 4px
  nav.navbar.navbar-light
    margin-left: 5px
  nav.navbar li span.name
    font-weight: bold
    font-size: 18px
  nav.navbar a 
    img
      margin-top: 5px
    span
      font-size: 24px
    i.fas.fa-shopping-cart,i.fas.fa-user
      font-size: 24px
  .btn-cart
    background-color: transparent
    position: relative
    i.fas.fa-user
      font-size: 24px
</style>