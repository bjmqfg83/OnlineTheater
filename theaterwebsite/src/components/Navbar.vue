<template lang="pug">
    .header.mt-3
      nav.navbar.bg-transparent.p-0
        a.navbar-brand(href='#/')
          img.d-inline-block.align-top.mr-3(src='../assets/img/logo/theatericon.png' width='30' height='30' alt='brand')
          span.d-inline-block.text-dark O-Theater
        ul.d-inline-block.my-auto
          li.d-inline-block.ml-2.position-relative
            router-link.text-dark.mr-3.font-weight-bold.text-dark(to="/checkout" style="font-size: 18px") 訂單列表
          li.d-inline-block.position-relative
            router-link.text-dark(to="/login") 
              i.fas.fa-user 
          li.d-inline-block.ml-2.position-relative(v-if="username")
            span.d-inline-block.name 歡迎 {{username}}
          li.d-inline-block.ml-3(v-if="username")
            a.btn.btn-danger.text-white(href="#" @click.prevent="logout") 登出
</template>
<script>
export default {
  name: "Navbar",
  data() {
    return {
      username: null
    };
  },
  methods: {
    // 簡易登出
    logout() {
      this.username = null;
      localStorage.removeItem("user");
      localStorage.removeItem("theatertoken");
    }  
  },
  created() {
    // 取得登入的使用者姓名
    var user = localStorage.getItem("user");
    this.username = user;
  }
};
</script>
<style lang="sass">
    *
      font-family: 'sans-serif', 'Microsoft JhengHei'
    @media screen and  (max-width:550px)
      .header 
        nav.navbar a.navbar-brand,ul.d-inline-block
          margin: 0 auto
</style>