// page/component/new-pages/user/user.js
var app = getApp()

Page({
  data:{
    thumb:'',
    nickname:'方桂珍',
    college:'中山大学新华学院',
    studentId:'16053030',
    integral:0, // 积分
    tabList: ['待评价订单','已完成订单'],
    tabIndex: 0,
    waitCommentOrderList:[
        {
          "coupon_id": "11ea-2f85-b9ac-70188b39697a-40c54228",
          "create_date": "2020-01-05 15:23:41",
          "id": "11ea-2f8c-94e4-70188b39697a-4ca6f1c8",
          "is_del": 0,
          "shop_id": "11ea-2ef5-8d58-70188b39697a-44a2fd0e",
          "shop_name": "益禾堂",
          "star": 0,
          "state": 1,
          "update_date": "2020-01-05 15:23:41",
          "user_id": "11ea-2f89-a864-70188b39697a-eea0b582"
      },
      {
        "coupon_id": "11ea-2f85-b9ac-70188b39697a-40c54228",
        "create_date": "2020-01-05 15:23:41",
        "id": "11ea-2f8c-94e4-70188b39697a-4ca6f1c8",
        "is_del": 0,
        "shop_id": "11ea-2ef5-8d58-70188b39697a-44a2fd0e",
        "shop_name": "书亦烧仙草",
        "star": 0,
        "state": 1,
        "update_date": "2020-02-05 18:23:41",
        "user_id": "11ea-2f89-a864-70188b39697a-eea0b582"
    }
    ],
    domain:app.globalData.domain
  },
  onLoad(){
    var self = this;
    self.getUserInfoFun()
    self.getWaitCommentOrder()
  },

  /** 获取我的信息 */
  getUserInfoFun(){
    let self = this
    wx.request({
      url: app.globalData.domain + '/promotion/api/user/info',
      method: 'post',
      data:{
        user_id:'11ea-2f89-a864-70188b39697a-eea0b582'
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
    wx.request({
      url: app.globalData.domain + '/promotion/api/user/info',
      method: 'post',
      data:{
        user_id:'11ea-2f89-a864-70188b39697a-eea0b582',
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
      data:{
        user_id:'11ea-2f89-a864-70188b39697a-eea0b582'
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

  /** 切换tab */
  changeTab(e){
    let {index} = e.currentTarget.dataset
    this.setData({tabIndex:index})
  }
})