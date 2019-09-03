<template lang="pug">
  .container.mt-4
    Navbar
    .row.mt-5.justify-content-center
      .col-6
        table.table
          thead.bg-info.text-white
            th.text-left 商品
            th.text-center 觀看次數
            th.text-center 單價
          tbody
            tr(v-for="index in subscriberInfo.item.length")
              td.text-left {{subscriberInfo.item[index-1]}}
              td.text-center {{subscriberInfo.quantity[index-1]}}
              td.text-center {{subscriberInfo.eachtotal[index-1]}}
          tfoot
            tr
              td.border-0(colspan="2").text-right.pr-5 總金額  
              td.border-0 ${{subscriberInfo.totalprice}}
        table.table
          thead.bg-info.text-white
            th(colspan="2").text-center 訂購人資訊
          tbody
            tr
              th.text-left 姓名
              td.text-left {{subscriberInfo.name}}
            tr
              th.text-left Email
              td.text-left  {{subscriberInfo.email}}
            tr
              th.text-left 收件人電話
              td.text-left {{subscriberInfo.phone}}
            tr
              th.text-left 收件人地址
              td.text-left  {{subscriberInfo.address}}
            tr
              th.text-left 付款狀態
              td.text-left.text-danger(v-if="!subscriberInfo.ispaid") 尚未付款
              td.text-left.text-success(v-if="subscriberInfo.ispaid") 付款成功
    .row.mt-0.justify-content-center
      .col-6.d-flex.justify-content-end
        button.btn.btn-outline-info(@click="gopay" v-if="!subscriberInfo.ispaid") 前去付款
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
      tempdata: [],
      subscriberInfo: {
        name: "",
        email: "",
        phone: "",
        address: "",
        ispaid: 0,
        item: [],
        quantity: [],
        price: [],
        eachtotal: [],
        totalprice: 0
      }
    };
  },
  components: {
    Navbar,
    Footer
  },
  methods: {
    checkoutmsg() {
      // 先獲取訂購者的資訊
      let account = localStorage.getItem("user");
      // API http://localhost:8000/homepage/movieintro?id=${id}
      const API = `${process.env.APIPATH}/order/checkout?account=${account}`;
      // 向後端要求訂購資訊
      Vue.axios.get(API).then(res => {
        // console.log(res.data);
        this.subscriberInfo.name = res.data.name;
        this.subscriberInfo.email = res.data.email;
        this.subscriberInfo.phone = res.data.tel;
        this.subscriberInfo.address = res.data.address;
        this.subscriberInfo.ispaid = res.data.ispaid;
        console.log("ispaid", res.data.ispaid);
        // 取得購物車訂購項目
        res.data.item.forEach((item, index) => {
          this.subscriberInfo.item.push(item);
          this.subscriberInfo.eachtotal.push(res.data.eachtotal[index]);
          this.subscriberInfo.quantity.push(res.data.quantity[index]);
          this.subscriberInfo.totalprice += Number(res.data.eachtotal[index]);
        });
        // console.log("subscriberInfo", this.subscriberInfo);
      });
      // 確定共有幾項之後開始計算各項目總價以及數量
      // 有內容才跑迴圈
      for (var index = 0; index < this.subscriberInfo.item.length; index++) {
        this.tempdata.forEach((ele, key) => {
          if (this.subscriberInfo.item[index] == ele.mname) {
            this.subscriberInfo.quantity[index] += 1;
            this.subscriberInfo.eachtotal[index] += ele.mprice;
          }
        });
      }
    },
    gopay() {
      console.log("付款成功");
      const API = `${process.env.APIPATH}/order/pay`;
      let account = localStorage.getItem("user");
      Vue.axios.post(API, { account: account, ispaid: 1 }).then(res => {
        // 如果寫入資料成功就更改付款狀態
        if (res.data) {
          this.subscriberInfo.ispaid = 1;
          // 如果付款成功就把localstorage的資料給刪除(購物車資訊)
          localStorage.removeItem("cart");
        } else {
          this.subscriberInfo.ispaid = 0;
        }
      });
    }
  },
  created() {
    this.checkoutmsg();
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
 *
  // border: 1px solid black
</style>
