// pages/good_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {id: 0, value: '综合', isActive: true},
      {id: 0, value: '销量', isActive: false},
      {id: 0, value: '价格', isActive: false}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  }
})