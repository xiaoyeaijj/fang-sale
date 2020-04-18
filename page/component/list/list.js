let app = getApp()
Page({
  data:{
    shopId:'',
    bussin_time:'',
    shop_address:'',
    shop_college:'',
    shop_desc:'',
    shop_name:'',
    shop_pics:'',
    shop_tel:'',
    couponList:[]
  },
  onLoad:function(opt){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      shopId: opt.shopId
    })
    if(opt.shopId){
      this.getShopDetail(opt.shopId)
    }
  },
  getShopDetail(shopId){
    let self = this
    wx.request({
      url: app.globalData.domain + '/promotion/api/index/shop_info',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 修改这个参数格式为formdata
      },
      data:{
        shop_id:shopId
      },
      success(res){
        console.log('店铺详情数据',res.data.data)
        let {bussin_time, shop_address, shop_college, shop_desc, shop_name, shop_pics, shop_tel, coupon} = res.data.data
        self.setData({
          bussin_time:bussin_time,
          shop_address:shop_address,
          shop_college:shop_college,
          shop_desc:shop_desc,
          shop_name:shop_name,
          shop_pics:shop_pics,
          shop_tel:shop_tel,
          couponList:coupon
        })
      }
    })
  },
  getCoupon(e){
    let { couponid } = e.currentTarget.dataset
    let openid = wx.getStorageSync('openid')
    wx.request({
      url: app.globalData.domain + '/promotion/api/index/shop_info',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 修改这个参数格式为formdata
      },
      data:{
        openid: openid,
        coupon_id: couponid
      },
      success(res){
        wx.showToast({
          title: '领取成功',
        })
      }
    })
  }
})