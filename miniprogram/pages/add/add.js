// miniprogram/pages/add/add.js

//获取应用实例
var app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    item: {
      key: "",
      title: "",
      content: "",
      create_time: {
        year: "",
        montg: "",
        day: "",
        hour: "",
        min: ""
      },
      update_time: {
        year: "",
        montg: "",
        day: "",
        hour: "",
        min: ""
      },
      // update_time_m: "",
      delItem: 0,
    },
    focus: true
  },

  /**
   * 保存数据事件
   */
  onSubmit: function(event) {
    var item = JSON.parse(JSON.stringify(this.data.item));
    var now = new Date();
    item.key = Date.now();
    item.title = event.detail.value.title;
    item.content = event.detail.value.content;
    item.create_time.year = now.getFullYear();
    item.create_time.month = now.getMonth() + 1;
    item.create_time.day = now.getDate() ;
    item.create_time.hour = now.getHours();
    item.create_time.min = now.getMinutes();
    item.update_time.year = now.getFullYear();
    item.update_time.month = now.getMonth() + 1;
    item.update_time.day = now.getDate() ;
    item.update_time.hour = now.getHours();
    item.update_time.min = now.getMinutes();
    // item.update_time_m = now;
    this.setData({
      item: item
    })
    app.globalData.items.unshift(this.data.item)
    
    this.saveData();
    
    wx.showToast({
      title: "保存成功",
      duration: 500
    });
    wx.navigateBack();
  },
  saveData:function(event) {
    let that = this;
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