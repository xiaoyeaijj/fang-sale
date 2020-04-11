var app = getApp()
Page({
    data: {
        category: [],
        detail:[],
        currentId:1,
        currentName:'',
        curIndex: 0,
        isScroll: false,
        toView: 'guowei'
    },
    onLoad(){
        var self = this;
        self.getAllCategory()
        self.getCategoryDetail()
    },
    switchTab(e){
      console.log(e)
      const self = this;
      let {currentId, name} = e.currentTarget.dataset
      this.setData({
        isScroll: true,
        currentId: currentId,
        currentName:name
      })
      self.getCategoryDetail()
      setTimeout(function(){
        self.setData({
          toView: e.target.dataset.id,
          curIndex: e.target.dataset.index
        })
      },0)
      setTimeout(function () {
        self.setData({
          isScroll: false
        })
      },1)
        
    },
    getAllCategory(){
      let self = this
      wx.request({
        url: app.globalData.domain + '/promotion/api/index/shop_type',
        method: 'post',
        success(res){
          console.log('分类',res.data.data.list)
          self.setData({ 
            category: res.data.data.list,
            currentName: res.data.data.list[0].type_name
          })
        }
      })
    },
    getCategoryDetail(){
      let self = this
      let params = {
        shop_type:self.data.currentId
      }
      wx.request({
        url: app.globalData.domain + '/promotion/api/index/list_shop',
        method: 'post',
        success(res){
          let list = []
          if(res.data.data.list && res.data.data.list.length > 0){
            list = res.data.data.list
          }else{
            list= [
              {
                  "coupon_name": "6折优惠券",
                  "id": "11ea-2f7f-ba88-70188b39697a-58316328",
                  "shop_name": "码头1978",
                  "shop_pics": "/image/c4.png",
                  "street": "沿江西一路渔人码头"
              },
              {
                  "coupon_name": "8折优惠券",
                  "id": "11ea-2ef5-8d58-70188b39697a-44a2fd0e",
                  "shop_name": "益禾堂",
                  "shop_pics": "/image/c3.png",
                  "street": "沿江西一路"
              }
            ]
          }
          console.log('分类详情',res.data.data.list)
          self.setData({ detail: list })
        }
      })
    }
    
})