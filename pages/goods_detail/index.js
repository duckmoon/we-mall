// pages/goods_detail/index.js

import {request} from '../../request/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: {},
    autoplay: true,
    indicatorDots: true,
    interval: 2000,
    duration: 500
  },

  goodsUrls: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options
    this.getGoodsDetail(goods_id)
  },


  getGoodsDetail: function(goods_id) {
    request({url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/detail", data: {goods_id: goods_id}})
      .then(result => {
        // console.log(result)
        let goods = result.data.message;
        this.goodsUrls = goods.pics;
        // console.log(goodsDetail)
        this.setData({
          goods
        })
      })
  },

  priviewImage: function(e) {
    let urls = this.goodsUrls.map(v => {
      return v.pics_mid
    })
    let currentUrl = e.currentTarget.dataset.url;
    // console.log(urls)
    wx.previewImage({
      current: currentUrl,
      urls: urls,
    })
  },

  /**
   * 加入购物车
   */
  addGoods: function() {
    // 1. 获取缓存数据
    let cart = wx.getStorageSync("cart") || []
    // 2. 判断缓存中是否以及存在要添加的商品
    let index = cart.findIndex((v) => {
      return v.goods_id === this.data.goods.goods_id
    })
    // 3. 缓存中没有数据
    if (index === -1) {
      this.data.goods.num = 1;
      this.data.goods.checked = true;
      cart.push(this.data.goods)
    } else {
      cart[index].num++
    }
    wx.setStorageSync('cart', cart)

    wx.showToast({
      title: '加入成功',
      mask: true
    })
  }
  
})