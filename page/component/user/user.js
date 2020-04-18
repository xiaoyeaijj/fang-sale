// page/component/new-pages/user/user.js
var app = getApp()

Page({
  data:{
    openid:'',
    thumb:'',
    nickname:'方桂珍',
    college:'中山大学新华学院',
    studentId:'16053030',
    integral:0, // 积分
    tabList: ['待评价订单','已完成订单'],
    tabIndex: 0,
    waitCommentOrderList:[
        {
          "create_date": "2020-01-05 15:24:33",
          "id": "11ea-2f8c-94e4-70188b39697a-6b968e6e",
          "shop_name": "码头1978",
          "update_date": "2020-01-05 16:54:15"
      },
      {
        "create_date": "2020-01-05 15:24:33",
        "id": "11ea-2f8c-94e4-70188b39697a-6b968e6e",
        "shop_name": "码头1978",
        "update_date": "2020-01-05 16:54:15"
}
    ],
    doneCommentOrderList:[
      {
        "create_date": "2020-01-05 15:24:33",
        "id": "11ea-2f8c-94e4-70188b39697a-6b968e6e",
        "shop_name": "码头1978",
        "update_date": "2020-01-05 16:54:15"
    },
    {
      "create_date": "2020-01-05 15:24:33",
      "id": "11ea-2f8c-94e4-70188b39697a-6b968e6e",
      "shop_name": "码头1978",
      "update_date": "2020-01-05 16:54:15"
}
  ],
    domain:app.globalData.domain
  },
  onLoad(){
    var self = this;
    let openid = wx.getStorageSync('openid')
    self.setData({
      openid: openid
    })
    self.getUserInfoFun()
    self.getWaitCommentOrder()
    self.getDoneCommentOrder()
  },

  /** 获取我的信息 */
  getUserInfoFun(){
    let self = this
    wx.request({
      url: app.globalData.domain + '/promotion/api/user/info',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 修改这个参数格式为formdata
      },
      data:{
        openid: self.data.openid
      },
      success(res){
        console.log('我的信息',res.data)
        if(res.data.code==200){
          self.setData({
            thumb:res.data.data.avatar_url,
            nickname:res.data.data.real_name,
            college:res.data.data.college,
            integral:res.data.data.integral,
            studentId:res.data.data.student_id
          })
        }
      }
    })
  },

  /** 用户签到 */
  toSignIn(){
    let self = this
    wx.request({
      url: app.globalData.domain + '/promotion/api/user/info',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 修改这个参数格式为formdata
      },
      data:{
        openid: self.data.openid,
        is_check_in: 1
      },
      success(res){
        console.log('我的信息',res.data)
        if(res.data.code==200){
          wx.showToast({
            title: '签到成功',
            icon: 'success',
            duration: 1500
          })
        }
      }
    })
  },

  /** 获取待评价订单 */
  getWaitCommentOrder(){
    let self = this
    wx.request({
      url: app.globalData.domain + '/promotion/api/user/wait_comment',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 修改这个参数格式为formdata
      },
      data:{
        openid: self.data.openid
      },
      success(res){
        console.log('待评价订单',res.data)
        if(res.data.code==200){
          self.setData({
            waitCommentOrderList: res.data.data.list
          })
        }
      }
    })
  },

  /** 获取已完成订单 */
  getDoneCommentOrder(){
    let self = this
    wx.request({
      url: app.globalData.domain + '/promotion/api/user/completed_order',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 修改这个参数格式为formdata
      },
      data:{
        openid: self.data.openid
      },
      success(res){
        console.log('已完成订单',res.data)
        if(res.data.code==200){
          self.setData({
            doneCommentOrderList: res.data.data.list
          })
        }
      }
    })
  },

  /** 切换tab */
  changeTab(e){
    let {index} = e.currentTarget.dataset
    this.setData({tabIndex:index})
  }
})