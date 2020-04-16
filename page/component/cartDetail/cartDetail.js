var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleid:'',
    username:'匿名用户',
    createdate:'',
    title:'',
    content:'',
    commentList:[],
    like:0,
    view:0,
    likeStauts:0,   // 0 未点赞  1 已点赞
    showCommentDialog:false,
    commentContent:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      articleid:options.id
    })
    this.getDetail(options.id)
  },
  getDetail(id){
    let self = this
    let openid = wx.getStorageSync('openid')
    wx.request({
      url: app.globalData.domain + '/promotion/api/NsArticle/article_info',
      method: 'post',
      data: {
        openid: openid,
        article_id: id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 修改这个参数格式为formdata
      },
      success: function (res) {
        console.log(res,'帖子详情')
        let {content, create_date, if_like, like, reading, real_name, title, comment} = res.data.data
        self.setData({
          username:real_name || '匿名用户',
          title:title,
          createdate:create_date,
          content:content,
          likeStauts: if_like,
          like: like,
          view: reading,
          commentList:comment
        })
      }
    })
  },
  handleComment(){
    this.setData({
      showCommentDialog:true
    })
  },
  contentInput(e){
    let value = e.detail.value;
    this.setData({
      commentContent:value
    })
  },
  submitComment(){
    let self = this
    if(!self.data.commentContent){
      wx.showToast({
        title: '评论不能为空',
        duration: 1500,
        icon: 'none'
      })
      return
    }
    let openid = wx.getStorageSync('openid')
    wx.request({
      url: app.globalData.domain + '/promotion/api/NsArticle/edit_comment',
      method: 'post',
      data: {
        openid: openid,
        article_id: self.data.articleid,
        comment: self.data.commentContent
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 修改这个参数格式为formdata
      },
      success: function (res) {
        self.getDetail(self.data.articleid)
        self.setData({
          showCommentDialog:false,
          commentContent:''
        })
        wx.showToast({
          title: '评论成功',
          duration: 1500,
          icon: 'none'
        })
      }
    })
  },
  closeDialog(){
    this.setData({
      showCommentDialog:false,
      commentContent:''
    })
  },
  handleLike(){
    let self = this
    let openid = wx.getStorageSync('openid')
    wx.request({
      url: app.globalData.domain + '/promotion/api/NsArticle/like_article',
      method: 'post',
      data: {
        openid: openid,
        article_id: self.data.articleid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 修改这个参数格式为formdata
      },
      success: function (res) {
        if(self.data.likeStauts==0){
          self.setData({
            likeStauts: 1,
            like:self.data.like+1
          })
          wx:wx.showToast({
            title: '点赞成功',
            duration: 1500,
            icon: 'none'
          })
        }else{
          self.setData({
            likeStauts: 0,
            like:self.data.like-1
          })
        }
      }
    })
  }
})