// 主頁面產品列表
const express = require('express');
const pool = require('../js/pool');
const fs = require('fs');
// const path = require('path');
let router = express.Router();
module.exports = router;
//主頁面產品顯示列表
router.get('/', (req, res) => {
    // console.log(req);
    //獲取前端取得的參數(一次顯示幾筆)
    // console.log(req.query.page);
    const page = req.query.page;
    // 預設一次顯示9頁
    const pageSize = 9;
    // 資料庫總共有多少筆資料
    let count = 0;
    // 變數儲存是否有上一頁下一頁
    // 預設都為false
    let prevpage = false;
    let nextpage = false;
    // 儲存查詢結果=> All、recently、classic、recommend
    let all = [];
    let recently = [];
    let classic = [];
    let recommend = [];
    let pagenum = 0;
    pool.getConnection((err, conn) => {
        // 如果連接有誤則拋出錯誤
        if (err)
            throw err.message;
        //創建sql語句
        //向database發送sql語句並獲取返回結果
        // 查看資料庫有多少筆資料
        let sql = `SELECT COUNT(*) from movieinfo`;
        // 如果之後還有請求就不要release connect
        conn.query(sql, (err, result) => {
            if (err)
                throw err.message;
            if (result) {
                // 總共有多少筆資料
                count = result[0]['COUNT(*)'];
                // console.log(count);
            }
        });
        // 暫時先載入9筆資料
        let sql2 = `SELECT * from movieinfo LIMIT ${(page - 1) * pageSize},${pageSize}`;
        conn.query(sql2, (err, result) => {
            if (err)
                throw err.message;
            if (result) {
                // 總共有幾頁 總筆數/每頁幾筆
                // ceil無條件進位
                pagenum = Math.ceil(count / pageSize);
                // console.log(pagenum);
                // 如果當前頁是1且總頁數不是只有一頁時
                if (page == 1 && page !== pagenum) {
                    // 沒有上一頁,有下一頁
                    prevpage = false;
                    nextpage = true;
                    // 如果訪問的為最後一頁且全部頁數不為1時
                } else if (page == pagenum && page !== 1) {
                    // 沒有下一頁,有上一頁
                    prevpage = true;
                    nextpage = false;
                } else if (page !== pagenum && page !== 1) {
                    // 不是第一頁也不是最後一頁時
                    prevpage = true;
                    nextpage = true;
                } else {
                    prevpage = false;
                    nextpage = false;
                }
                // 儲存全部的電影資訊
                all = result;
            }
        });
        let sql3 = `SELECT * from movieinfo WHERE mcategory='recently' LIMIT ${(page - 1) * pageSize},${pageSize}`;
        conn.query(sql3, (err, result) => {
            if (err)
                throw err.message;
            if (result) {
                // 儲存近期的電影資訊
                recently = result;
            }
        });
        let sql4 = `SELECT * from movieinfo WHERE mcategory='classic' LIMIT ${(page - 1) * pageSize},${pageSize}`;
        conn.query(sql4, (err, result) => {
            if (err)
                throw err.message;
            if (result) {
                // 儲存經典的電影資訊
                classic = result;
            }
        });
        let sql5 = `SELECT * from movieinfo WHERE mcategory='recommend' LIMIT ${(page - 1) * pageSize},${pageSize}`;
        conn.query(sql5, (err, result) => {
            if (err)
                throw err.message;
            if (result) {
                // 儲存經典的電影資訊
                recommend = result;
                res.json({ movie: all, recently: recently, classic: classic, recommend: recommend, prevpage: prevpage, nextpage: nextpage, pagenum: pagenum, currentpage: page });
            }
            // 釋放連接
            conn.release();
        });
    });
})
// 單一產品介紹頁面
router.get('/movieintro', (req, res) => {
    //獲取前端取得的參數
    const id = req.query.id;
    pool.getConnection((err, conn) => {
        // 如果連接有誤則拋出錯誤
        if (err)
            throw err.message;
        //創建sql語句
        //向database發送sql語句並獲取返回結果
        // 查看資料庫有多少筆資料
        let sql = `SELECT * from movieinfo WHERE id=${id}`;
        // 如果之後還有請求就不要release connect
        conn.query(sql, (err, result) => {
            if (err)
                throw err.message;
            if (result) {
                // 回傳電影資訊
                fs.readdir(result[0].mlightbox, function (err, files) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    // console.log(result[0].mlightbox);
                    console.info(files);
                    // console.log(files.length);
                    res.json({ movie: result, files: files });
                }); 
                // res.send(result);
            }
            // 釋放連接
            conn.release();
        });
    });
})