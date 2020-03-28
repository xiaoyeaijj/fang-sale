var app = getApp()

Page({
  data: {
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
    bannerList:[],
    goodList: [],
  },
  onLoad: function () {
    var that = this//后面不能加逗号,否则出错
    that.getHotList()
    that.getgoodList()
  },
  toShopDetail(e){
    let { shopid } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/page/component/list/list?shopId=${shopid}`,
    })
  },
  getHotList(){
    let self = this
    wx.request({
      url: app.globalData.domain + '/promotion/api/index/hot_shop_rank',
      method: 'post',
      success(res){
        console.log('轮播图数据',res.data.data.list)
        let list = res.data.data.list
        list.map((item,index)=>{
          item.shop_pic = `/image/b${index+1}.jpg`
        })
        self.setData({ bannerList: res.data.data.list })
      }
    })
  },
  getgoodList(){
    let self = this
    wx.request({
      url: app.globalData.domain + '/promotion/api/index/good_shop_rank',
      method: 'post',
      success(res){
        console.log('好店推荐',res.data.data.list)
        self.setData({ goodList: res.data.data.list })
      }
    })
  }
})