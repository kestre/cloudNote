// miniprogram/pages/index/index.js

//获取应用实例
var app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    userInfo: {},
    items: []
  },

  /**
   * add note
   */
  onNewItem: function(event) {
    wx.navigateTo({
      url: '../add/add'
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this;
    //获得之前保留在缓存中的数据
    wx.getStorage({
      key: 'kestre',
      success: function(res) {
        if(res.data) {
          
          app.globalData.items = that.data.items
        }
      }
    })
    //
    wx.getUserInfo({
      complete: (res) => {
        that.setData({
          userInfo:res.userInfo
        })
      },
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    var that = this;
    that.setData({
      items:app.globalData.items
    })
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})