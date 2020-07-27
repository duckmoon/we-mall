// pages/good_list/index.js
import {request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {id: 0, value: '综合', isActive: true},
      {id: 0, value: '销量', isActive: false},
      {id: 0, value: '价格', isActive: false}
    ],
    goodsList: []
  },
  queryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  totalPages: 0,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryParams.cid = options.cid
    this.getGoodsList()
  },
  /**
   * 上拉加载
   */
  onReachBottom: function() {
    if (this.queryParams.pagenum < this.totalPages) {
      this.getGoodsList()
    } else {
      wx.showToast({
        title: '没有下一页数据了',
      })
    }
  },
  /**
   * 下拉刷新
   */
  onPullDownRefresh: function() {
    this.setData({
      goodsList: []
    })
    this.queryParams.pagenum = 1
    this.getGoodsList()
  },

  tabItemChanged: function(e) {
    const {index} = e.detail;
    let {tabs} = this.data
    tabs.forEach((v, i) => {
      if (i === index) {
        v.isActive = true;
      } else {
        v.isActive = false
      }
    })
    this.setData({
      tabs
    })
  },

  getGoodsList: function() {
    request({url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/search", data: this.queryParams})
      .then(result => {
        // console.log(result.data.message)
        const goodsList = result.data.message.goods;
        // console.log(goodsList)
        if (this.totalPages === 0) {
          const totalNum = result.data.message.total;
          this.totalPages = Math.ceil(totalNum / this.queryParams.pagesize)
        }
        // this.data.goodsList.push(goodsList)
        this.queryParams.pagenum += 1;
        this.setData({
          goodsList: [...this.data.goodsList, ...goodsList]
        })
      })
      // 结束下拉刷新
      wx.stopPullDownRefresh()
  }
})