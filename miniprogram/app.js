//app.js
App({
  onLaunch: function () {
    //this.checkLoginStatus();
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
        env: 'kestre',
      })
    }

    this.globalData = {
      "items":[],
      "userInfo":[]
    }
  },

  //检查本地 storage 中是否有登录态标识
  checkLoginStatus: function () {
    let that = this;
    let loginFlag = wx.getStorageSync('loginFlag');
    if(loginFlag) {
      //检查 session_key 是否过期
      wx.checkSession({
        // session_key 过期
        fail: (res) => {
          that.doLogin();
        },
        // session_key 有效
        success: (res) => {
          console.log('session_key');
          // 直接从 Storage 中获得用户信息
          let userStorageInfo = wx.getStorageSync('userInfo');
          if(userStorageInfo){
            that.globalData.userInfo = JSON.parse(userStorageInfo);
          } else {
            that.showInfo('缓存信息缺失');
            console.error('登录成功后将用户的Storage的userStorageInfo字段中，该字段缺失')
          }
        },
      })
    } else {
      // 无登录态
      that.doLogin();
    }
  },
  //登录动作
  doLogin: function() {
    let that = this;
    
    wx.login({
      success: function (loginRes) {
        if(loginRes.code) {
          wx.getUserInfo({
            withCredentials: true, //非不选，默认为true
    
            success: function (infoRes) {
              //请求服务端的登录接口
              wx.request({
                url: 'url',

                data: {
                  code: loginRes.code,                      // 临时登录凭证
                  rawData: infoRes.rawData,            // 用户非敏感信息
                  signature: infoRes.signature,        // 签名
                  signature: infoRes.encryptedData,    // 用户敏感信息
                  iv: infoRes.iv                       // 用户解密算法的向量
                },

                success: function (res) {
                  console.log('login success');
                  res = res.data;

                  if (res.result == 0){
                    that.globalData.userInfo = res.userInfo;
                    wx.setStorageSync('userInfo', JSON.stringify(res.userInfo));
                    wx.setStorageSync('loginFlag', res.skey);
                    callback();
                  } else {
                    that.showInfo(res.errmsg);
                  }
                },
                fail: function (error) {
                  that.showInfo('调用接口失败')
                }
              })
            },
            fail: function (error) {
              //获取 userInfo 失败，去检查是否为开启权限
              wx.hideLoading();
              that.checkUserInfoPermission();
            }
          });
        } else {
          // 获得 code 失败
          that.showInfo('登录失败')
        }
      },
      fail: function (error) {
        //调用 wx.login 接口失败
        that.showInfo('接口调用失败')
      }
    })
  },
  
  // 检查用户信息授权设置
  checkUserInfoPermission: function () {
    wx.getSetting({
      success: (res) => {
        if(!res.authSetting['scope.userInfo']) {
          wx.openSetting({
            success: (authSetting) => {
              console.log(authSetting)
            },
          });
        }
      },
      fail: function (error) {
        console.log(error)
      }
    })
  }
})
