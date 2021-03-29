// miniprogram/pages/login/login.js
var app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this
    //调用微信登录接口
    that.doLogin()
  },

  //登录动作
  doLogin: function() {
    let that = this;

    wx.login({
      success: (res) => {
        wx.getUserInfo({
          success: (res) => {
            console.log(res)
            app.globalData.userInfo = res.userInfo
            that.setData({
              canIUse: false
            })
            that.checkLoginStatus();
          },
          fail: (res) => {
            that.setData({
              canIUse: true
            })
          },
        })
      },
    })
  },

  bindGetUserInfo: function (e) {
    console.log('e')
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      canIUse: false
    })
    this.checkLoginStatus();
  },

  checkLoginStatus: function () {
    let that = this;
    let loginFlag = wx.getStorageSync('loginFlag');
    if(loginFlag) {
      wx.switchTab({
        url: '../index/index',
      })
    }else{
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
      wx.setStorageSync('loginFlag', 1);
      wx.switchTab({
        url: '../index/index',
      })
    }
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