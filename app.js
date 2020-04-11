App({
  onLaunch: function () {
    var that = this
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求,获取openid
          wx.request({
            url: that.globalData.domain + '/promotion/api/user/register',
            data: {
              code: res.code//临时code验证
            },
            success: function (obj) {
              //本地存储openid
              wx.setStorageSync('openid', obj.data.Openid)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
,
  globalData: {
    hasLogin: false,
    domain: 'http://134.175.185.229:8003',
  }
})
