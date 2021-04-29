// pages/discuss/discuss.js
const db = wx.cloud.database()
const _= db.command

Page({
  data: {
    datalist:[],
    dong:true,
    zhong:true,
    xi:true,
    name:""

  },
  dongqu:function(){
    var dong = this.data.dong
    if(dong){
    this.setData({
      dong:false
    })}else{
      this.setData({
        dong:true
      })
    }
  },
  zhongqu:function(){
    var zhong = this.data.zhong
    if(zhong){
      this.setData({
        zhong:false
    })}else{
    this.setData({
      zhong:true
    })}
    this.getselectdata()
  },
  xiqu:function(){
    var xi = this.data.xi
    if(xi){
      this.setData({
        xi:false
    })}else{
    this.setData({
      xi:true
    })}
  },
  getdata(num=1000,page=0,type=0,nickname=""){
    wx.cloud.callFunction({
      name:"discuss",
      data:{
        num:num,
        page:page,
        type:type,
        name:nickname
      }
    }).then(res=>{
      var olddata = this.data.datalist
      var newdata = olddata.concat(res.result.data);
      this.setData({
        datalist:newdata
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    console.log(app)
    var app = getApp()
    if(app.globalData.hasUserInfo ){
      this.setData({
        type:options.type,
        name:app.globalData.userInfo.nickName
      })
    }
    this.setData({
      type:options.type,
    })
    var type = this.data.type
    var name = this.data.name
    console.log(type,name)
    this.getdata(1000,0,type,name)

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
    // var page=this.data.datalist.length
    // var type = this.data.type
    // var name = this.data.name
    // this.getdata(1000,page,type,name)

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})