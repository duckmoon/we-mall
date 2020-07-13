//index.js

import { request } from '../../request/index'

//获取应用实例
const app = getApp()

Page({
  data: {
   swiperList: [],
   catesList: [],
   floorList: [],
   autoplay: false,
   indicatorDots: true,
   interval: 2000,
   duration: 500,
   vertical: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

    // 获取banners
    this.getSwiperList()
    // 获取cates
    this.getCatesList()
    // 获取楼层
    this.getFloorList()
  },

  getSwiperList: function() {
    request({url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'})
      .then((result) => {
        this.setData({
          swiperList: result.data.message
        })
      })
  },
  // 
  getCatesList: function() {
    request({url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems'})
      .then((result) => {
        this.setData({
          catesList: result.data.message
        })
      })
  },
  // 楼层数据 
  getFloorList: function() {
    request({url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata'})
      .then((result) => {
        this.setData({
          floorList: result.data.message
        })
      })
  }
  
})
