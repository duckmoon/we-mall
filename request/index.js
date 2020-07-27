let loadingTimes = 0;
export const request = (params) => {

  loadingTimes++;

  wx.showLoading({
    title: '加载中...',
    mask: true
  })

  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {
        
        loadingTimes--;
        if (loadingTimes === 0) {
          wx.hideLoading()
        }
      }
    })
  })
}