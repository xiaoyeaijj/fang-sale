let app = getApp()
Page({
  data:{
    shopId:'',
    couponList:[
      {
        'pic':'/image/s4.png',
        'name':'水果捞',
        'text':'7折优惠券',
        'coupon_id':'11ea-2f85-b9ac-70188b39697a-40c54228'
      },
      {
        'pic':'/image/s5.png',
        'name':'麻涌香蕉小店',
        'text':'6折优惠券',
        'coupon_id':'11ea-2f85-b9ac-70188b39697a-40c54228'
      },
      {
        'pic':'/image/s6.png',
        'name':'邻家姑娘水果',
        'text':'8折优惠券',
        'coupon_id':'11ea-2f85-b9ac-70188b39697a-40c54228'
      }
    ]
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
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  getShopDetail(shopId){
    let self = this
    wx.request({
      url: app.globalData.domain + '/promotion/api/index/shop_info',
      method: 'post',
      data:{
        user_id:'11ea-2f89-a864-70188b39697a-eea0b582',
        shop_id:shopId
      },
      success(res){
        console.log('店铺详情数据',res.data.data)
      }
    })
  }
})