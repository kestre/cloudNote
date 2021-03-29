// miniprogram/pages/index/index.js

//获取应用实例
var app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    //userInfo: {},
    items: [],
    now: Date.parse(new Date()),
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
   * edit note
   */
  onEditItem: function(event) {
    wx.navigateTo({
       url: '../edit/edit?key=' + event.currentTarget.dataset.key
    })
  },

  onLaunch: function () {
    wx.navigateTo({
      url: '../login/login'
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this;

    wx.navigateTo({
      url: '../login/login'
    })
    //获得之前保留在缓存中的数据
    wx.getStorage({
      key: 'kestre',
      success: function(res) {
        if(res.data) {  
          app.globalData.items = res.data
          that.setData({
            items:app.globalData.items
          })
        }
      }
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
    let that = this;

    //同步登录
    wx.cloud.callFunction({
      name: "login",
      data: {
        userInfo : app.globalData.userInfo
      },
      success: function(res) {
        console.log(res.result) // 3
      },
      fail: console.error
    })
    console.log(app.globalData.items.length)
    //同步数据
    wx.cloud.callFunction({
      name: "syncData",
      data: {
        items : app.globalData.items
      },
      success: function(res) {
        console.log("同步的数据：",res.result) // 3
        if(res.result) {  
          app.globalData.items = res.result.items
          that.setData({
            items:app.globalData.items
          })
        }
      },
      fail: console.error
    })

    setTimeout(function(){
      wx.stopPullDownRefresh()
    }, 500)
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