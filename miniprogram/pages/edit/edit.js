// miniprogram/pages/edit/edit.js

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
        month: "",
        day: "",
        hour: "",
        min: ""
      },
      update_time: {
        year: "",
        month: "",
        day: "",
        hour: "",
        min: ""
      },
      update_time_m: "",
      delItem: 0,
    },
    focus: true
  },
  
  /**
   * save data
   */
  onSubmit: function(event) {
    var that = this;
    var item = this.data.item;
    var now = new Date();
    item.title = event.detail.value.title;
    item.content = event.detail.value.content;
    item.update_time.year = now.getFullYear();
    item.update_time.month = now.getMonth() + 1;
    item.update_time.day = now.getDate() ;
    item.update_time.hour = now.getHours();
    item.update_time.min = now.getMinutes();
    // item.update_time_m = now;
    this.setData({
      item: item
    })

    app.globalData.items.forEach(function(it, index, arr){
      if(it.key == item.key){
        arr.splice(index, 1);
      }
    })
    app.globalData.items.unshift(this.data.item)
    
    this.saveData();
    
    wx.showToast({
      title: "保存成功",
      duration: 500
    });
    wx.navigateBack();
  },

  /**
   * delete item
   */
  onDelete: function(event) {
    var that = this;
    app.globalData.items.forEach(function(it, index){
      if(it.key == that.data.item.key){
        //app.globalData.items.splice(index, 1);
        app.globalData.items[index].delItem = 1;
        // app.globalData.items[index].update_time_m = new Date();
        app.globalData.items.unshift(app.globalData.items[index])
        app.globalData.items.splice(index+1, 1)
        wx.showToast({
          title: "删除成功",
          duration: 500
        });
        wx.navigateBack();
      }
    })

    this.saveData();
  },
  
  /**
   * sync data
   */
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
    var item = this.data.item;
    item.key = options.key;
    this.setData({
        item: item
    });
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
    this.loadData(this.data.item.key);   
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

  },

  /**
   * get data
   */
  loadData: function (key) {
    var that = this;
    var data;

    app.globalData.items.forEach(function(item,index){
      if(item.key == key){
        data = item;
      }
    })
    that.setData({
      item: data
    })
  },
})