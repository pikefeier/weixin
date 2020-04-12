App({
   //数据库操作
   initDataBase:function (openId) {
    wx.cloud.init({
      env: 'pikefeier-pz8di',
      traceUser: true
    })
    const db = wx.cloud.database();
    db.collection('userInfo').field({
      _id:true
    }).where({
      _id: openId // 填入当前用户 openid
    }).get({
      success: function(res) {
        console.log("1111"+res.data[0]._id)
      },
      fail: console.error
    })
   },
   
  onLaunch: function (options) {
    const that = this;
    
    //初始化数据库
    this.initDataBase(wx.getStorageSync('openId'));
  },
  onShow: function () {
    console.log('生命周期函数--监听小程序显示')
  },
  onHide: function () {
    console.log('生命周期函数--监听小程序隐藏')
  },
  globalData: {
    hasLogin: false,
    appid:'wx5e05a5f643b49336',
    secret:'79001e6b3c93d4d1913d94efd9f5dddb',
    js_code:0,
    grant_type:'authorization_code'
  }
})
