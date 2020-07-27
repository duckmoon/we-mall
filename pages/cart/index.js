// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: true,
    totalPrice: 0,
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  onShow: function() {
    const address = wx.getStorageSync('address')
    const cart = wx.getStorageSync('cart') || []
    this.setData({address})
    this.setCart(cart)
  },

  getUserAddrInfo: function() {
    
    wx.getSetting({
      withSubscriptions: false,
      success: (result) => {
        console.log(result.authSetting);
        let addrScope = result.authSetting["scope.address"]
        if (addrScope || addrScope === undefined) {
          wx.chooseAddress({
            success: (result) => {
              console.log(result)
              let address = result
              address.fullAddress = result.provinceName + result.cityName + result.countyName + result.detailInfo
              this.setData({
                address
              })
              wx.setStorageSync('address', address)
            },
          })
        } else {
          wx.openSetting({
            withSubscriptions: false,
            success: function() {
              wx.chooseAddress({
                success: (result) => {
                  this.data.address = result
                  this.data.address.info = result.provinceName + result.cityName + result.countyName + result.detailInfo
                  wx.setStorageSync('address', this.data.address)
                },
              })
            }
          })
        }
      }
    })
  },

  /* 复选框勾选 */
  handleItemCheck: function(e) {
    // 1. 找到对应的item
    let {cart} = this.data
    const index = cart.findIndex(v => v.goods_id == e.currentTarget.dataset.id)
    cart[index].checked = !cart[index].checked
    // 2. 重新计算总价、数量、全选
   this.setCart(cart)
  },

  setCart: function(cart) {
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalNum += v.num;
        totalPrice += v.goods_price * v.num
      } else {
        allChecked = false
      }
    })
    allChecked = cart.length > 0 ? allChecked : false
    this.setData({
      cart,
      totalNum,
      totalPrice,
      allChecked
    })
    wx.setStorageSync('cart', cart)
  },
  /* 处理全选按钮 */
  handleAllChecked: function () {
    let {cart, allChecked} = this.data
    allChecked = !allChecked
    cart.forEach(v => {v.checked = !v.checked})
    this.setCart(cart)
  },
  /* 商品数量点击 */
  handleNumEdited: function(e) {
    const {id, opreation} = e.currentTarget.dataset
    console.log(id, opreation)
    let {cart} = this.data
    const index = cart.findIndex(v => v.goods_id === id)
    if (cart[index].num === 1 && opreation === -1) {
      wx.showModal({
        title: '提示',
        content: '确定要删除吗',
        success: (res) => {
          cart.splice(index, 1)
          this.setCart(cart)
        },
        fail: (err) => {

        } 
      })
    } else {
      cart[index].num += opreation
      this.setCart(cart)
    }
  },
  /* 结算 */
  hanlePay: function() {
    const {address, totalNum} = this.data;
    if (!address.userName) {
      wx.showToast({
        title: '您还没有添加地址',
      })
      return;
    }
    if (totalNum === 0) {
      wx.showToast({
        title: '您还没有添加商品',
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/pay',
    })
  }
})