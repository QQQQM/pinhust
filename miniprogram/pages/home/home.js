Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },
  my(){
    wx.navigateTo({
      url: "/pages/show/show?type=1"
    })
  },
  dong(){
    wx.navigateTo({
      url: "/pages/show/show?type=2"
    })
  },
  zhong(){
    wx.navigateTo({
      url: "/pages/show/show?type=3"
    })
  },
  xi(){
    wx.navigateTo({
      url: "/pages/show/show?type=4"
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    var app = getApp()
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: app.globalData.hasUserInfo
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        var app = getApp()
        app.globalData.userInfo = res.userInfo
        app.globalData.hasUserInfo = true
        console.log(123)
        console.log(app.globalData.userInfo.nickName)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }

    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
})
