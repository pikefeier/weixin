// pages/water/water.js
Page({
  data: {
    textValue:"",
    images:[],
    activeKey:0,
    openid:'',
    userInfo:{}
  },
  
  //返回功能
  onClickLeft() {
    wx.showToast({ title: '点击返回', icon: 'none' });
  },
  //查看历史记录
  onClickRight() {
    wx.showToast({ title: '点击记录', icon: 'none' });
  },
  //实现绑定 页面-->数据的绑定
  bindAndSet(e){
    let key = e.target.dataset.name;
    this.setData({
     [key]:e.detail.value
    })
  },
  saveText(){
    const that = this;
    if (!this.data.textValue) {
      wx.showModal({
        title: '提示',
        content: '请输入文字',
        success (res) {
          if (res.confirm) {        
            return;
          } 
          else if (res.cancel) {        
            return;
          }
        }
      });
      return;
    }
    const db = wx.cloud.database();
    db.collection('water').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        description: "用户喝水记录",
        createTime: new Date(),
        updateTime: new Date(),
        userName:"that.userInfo",
        openId:that.data.openid,
        text:that.data.textValue
      },
      success: function(res) {
        wx.showToast({
          title: '已上传到云端',
          icon: 'success',
          duration: 1000
        });
      }
    })
  },
  removeImage(e) {
    const idx = e.target.dataset.idx
    this.data.images.splice(idx, 1)
    //$digest(this)
    this.setData({
        images:this.data.images
    })
  },

  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images
    wx.previewImage({
      current: images[idx],  //当前预览的图片
      urls: images,  //所有要预览的图片
    })
  },
  chooseImage(e) {
      wx.chooseImage({
        sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
        sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
        success: res => {
          const images = this.data.images.concat(res.tempFilePaths)
          // 限制最多只能留下3张照片
          this.data.images = images.length <= 3 ? images : images.slice(0, 3) 
        // $digest(this)
          this.setData({
              images:images
          })
        }
      })
    },
  uploadFileSample:function(){
      console.log(123);
    if (this.data.images.length <= 3) {
        console.log(1231);
        for(let i = 0;i<this.data.images.length;i++){
            this.uploadFileSample1(i);
        }     
      }
    },
  uploadFileSample1:function(index){
      console.log(456);
      wx.cloud.uploadFile({
          cloudPath: 'example'+index+'.png',
          filePath: this.data.images[index], // 文件路径
          success: res => {
            // get resource ID
            console.log(res.fileID);
            wx.showToast({
              title: '上传成功',
              icon: 'loading',
              duration: 3000
            });
          },
          fail: err => {
            // handle error
          }
        })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  
    onLoad: function () {
     this.getOpenId();
    },
   // 获取用户openid
   getOpenId() {
    let that = this;
    wx.cloud.callFunction({
     name: 'getUserInfo',
     complete: res => {
      console.log('云函数获取到的openid: ', res.result.openid)
      var openid = res.result.openid;
      var userInfo = res.result
      that.setData({
       openid: openid,
       userInfo:userInfo
      })
     }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})