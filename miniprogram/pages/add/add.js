// miniprogram/pages/add/add.js

//获取应用实例
var app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    item: {
      content: "",
    },
  },

  /**
   * 保存数据事件
   */
  onSubmit: function(event) {
    var item = this.data.item;
    item.content = event.detail.value.content
    this.setData({
      item: item
    })
    app.globalData.items.push(this.data.item)
    this.saveData();
  },
  saveData:function(event) {
    wx.setStorage({
      data: app.globalData.items,
      key: 'kestre',
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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