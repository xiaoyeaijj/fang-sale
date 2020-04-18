// page/component/new-pages/cart/cart.js
var app = getApp()

Page({
  data: {
    postList: [],    
    page:1,
    showDialog:false,
    postTitle:'',
    postContent:'',
    domain: app.globalData.domain
  },
  onLoad() {
    this.getList()
  },
  onReachBottom(){
    this.getList(1)
  },
  getList(concatType){
    let self = this
    wx.request({
      url: app.globalData.domain + '/promotion/api/NsArticle/list',
      method: 'post',
      data: {
        page: self.data.page,
        limit:20
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 修改这个参数格式为formdata
      },
      success: function (res) {
        console.log(res,'帖子列表')
        let datalist = res.data.data.list
        if(datalist&&datalist.length>0){
          if(concatType==1){
            let concatList = self.data.postList.concat(datalist)
            self.setData({
              postList:concatList
            })
          }else{
            self.setData({
              postList:datalist
            })
          }
          self.setData({
            page: self.data.page+1
          })
        }else{
          wx.showToast({
            title: '没有更多了',
            icon: 'none',
            duration: 1500
          })
        }
      }
    })
  },
  tocartsDetail(e){
    console.log()
    let cart_id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/page/component/cartDetail/cartDetail?id=${cart_id}`,
    })
  },
  openDialog(){
    this.setData({
      showDialog:true
    })
  },
  closeDialog(){
    this.setData({
      showDialog:false,
      postTitle:'',
      postContent:''
    })
  },
  titleInput(e){
    let value = e.detail.value;
    this.setData({
      postTitle:value
    })
  },
  contentInput(e){
    let value = e.detail.value;
    this.setData({
      postContent:value
    })
  },
  submitPublish(){
    let self = this
    if(!self.data.postTitle){
      wx.showToast({
        title: '请输入帖子标题',
        icon: 'none',
        duration: 1500
      })
      return
    }
    if(!self.data.postContent){
      wx.showToast({
        title: '请输入帖子内容',
        icon: 'none',
        duration: 1500
      })
      return
    }
    let openid = wx.getStorageSync('openid')
    wx.request({
      url: app.globalData.domain + '/promotion/api/NsArticle/edit',
      method: 'post',
      data: {
        openid: openid,
        title:self.data.postTitle,
        content:self.data.postContent
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 修改这个参数格式为formdata
      },
      success: function (res) {
        console.log(res,'发帖')
        self.setData({
          page:1,
          showDialog:false
        })
        wx.showToast({
          title: '发布成功',
        })
        self.getList()
      }
    })
  }

})