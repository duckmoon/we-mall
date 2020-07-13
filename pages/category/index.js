// pages/category/index.js

import { request } from '../../request/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [],
    rightProductList: [],
    currentIndex: 0,
    scrollTop: 0
  },

  cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 使用缓存数据
    const Cates = wx.getStorageSync('cates')
    if (!Cates) {
      console.log("没有缓存");
      
      this.getCates()
    } else {
      if ((Date.now() - Cates.time) > 20 * 1000) {
        console.log("缓存过期");
        
        this.getCates()
      } else {
        console.log("使用缓存");
        
        this.cates = Cates.data
        let leftMenuList = this.cates.map(v => v.cat_name)
        let rightProductList = this.cates[0].children
        this.setData({
          leftMenuList,
          rightProductList
        })
      }
    }

  },

  getCates: function() {
    request({url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories'})
      .then(result => {
        // console.log(result);
        this.cates = result.data.message;
        // 
        let leftMenuList = this.cates.map(v => v.cat_name);
        let rightProductList = this.cates[0].children;
        this.setData({
          leftMenuList,
          rightProductList
        })
        // 缓存数据
        wx.setStorageSync('cates', {time: Date.now(), data: this.cates})
      })
      
  },

  handleMenuItemTap: function(e) {
    const { index } = e.currentTarget.dataset;
    let rightProductList = this.cates[index].children;
    this.setData({
      currentIndex: index,
      rightProductList,
      scrollTop: 0
    })
  }

})