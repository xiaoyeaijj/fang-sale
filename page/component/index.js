var app = getApp()
const util = require('../../utils/util')
Page({
  data: {
    tabList:['火热商家','好评商家'],
    tabIndex: 0,
    hotShopList:[],
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
        console.log('火热商家',res.data.data.list)
        let list = res.data.data.list
        list.map((item,index)=>{
          let randomIndex = util.getRandomNumber(1,3)
          let num = index < 3 ? index+1 : randomIndex
          item.shop_pic = `/image/b${num}.jpg`
        })
        self.setData({ hotShopList: list })
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
        let list = res.data.data.list
        list.map((item,index)=>{
          let randomIndex = util.getRandomNumber(1,3)
          let num = index < 3 ? index+1 : randomIndex
          item.shop_pic = `/image/b${num}.jpg`
        })
        self.setData({ goodList: list })
      }
    })
  },

  /** 切换tab */
  changeTab(e){
    let {index} = e.currentTarget.dataset
    this.setData({tabIndex:index})
  }
})