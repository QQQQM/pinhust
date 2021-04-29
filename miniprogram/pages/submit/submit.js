const db = wx.cloud.database()
Page({
  data: {
    //选框信息
    index: 0,
    multiArray: [['东区','中间区域','西区'],['管理学院大楼','梧桐雨问学中心','博士公寓','东区','东九教学楼','东12教学楼','东操','韵苑学生公寓','启明学院','工程实训中心'], ['1层东','1层西','2层东','2层西']],
    multiIndex: [0, 0, 0],
    //用户信息
    userInfo: {
      nickName:"需要先获取您的昵称哦~"
    },
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    //位置信息
    latitude: 32.099994,
    longitude: 113.324520,
    //图片信息
    num:-1,
    hasphoto: false,
    photo:"/images/photoorg.png",
    img:"/images/1-h.png",
    noticename:"",
    //存入数据库的信息
    submitdata:{
      time:"",
      name:"",
      content:"",
      address:"",
      img:"",
      title:"",
      location1:"",
      location2:"",
      location3:"",
      userimg:"",
      noticenum:"",
      noticename:""
    },
    //地图数据
    markers: [{
      id: 1,
      latitude: 23.099994,
      longitude: 113.324520,
      name: 'T.I.T 创意园'
    }],
    covers: [{
      latitude: 23.099994,
      longitude: 113.344520,
      iconPath: '/image/location.png'
    }, {
      latitude: 23.099994,
      longitude: 113.304520,
      iconPath: '/image/location.png'
    }]
  },
  //点击上传照片
  uploadphoto:function(){
    wx.chooseImage({
      success:res=>{
        console.log(res)
       //回调成功之后得到临时路径
        var filePath=res.tempFilePaths[0]
        this.setData({
          photo:filePath,
          hasphoto:true
        })
        //this.cloudFile(filePath)
      }
    })
  },
  cloudFile(path){
    wx.cloud.uploadFile({
      //上传要有两个参数，路径文件名
      cloudPath:Date.now()+"_"+ this.data.userInfo.nickName +".jpg",
      //临时路径filepath
      filePath:path
    }).then(res=>{
      console.log(res.fileID)
      var img = 'submitdata.img'
      this.setData({
        [img]:res.fileID        
      })
      db.collection("suggestion").add({
        data:this.data.submitdata
      }).then(res=>{
        console.log(res)
      })
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 3000
      })
      wx.switchTab({
        url: '/pages/index/index',
      })
    })
  },
  //点击提交按钮提交意见和图片
  btsub:function(res){
    var content1 = res.detail.value.suggestion
    var name1 = this.data.userInfo.nickName
    var userimg1 = this.data.userInfo.avatarUrl
    var noticenum1 = this.data.num
    var title1 = res.detail.value.title
    var name = 'submitdata.name'
    var noticenum = 'submitdata.noticenum'
    var userimg = 'submitdata.userimg'
    var content = 'submitdata.content'
    var title = 'submitdata.title'
    
    var time = 'submitdata.time'
    var location1 = 'submitdata.location1'
    var location2 = 'submitdata.location2'
    var location3 = 'submitdata.location3'
    var location11 = this.data.multiArray[0][this.data.multiIndex[0]]
    var location22 = this.data.multiArray[1][this.data.multiIndex[1]]
    var location33 = this.data.multiArray[2][this.data.multiIndex[2]]
    this.setData({
      [name]:name1,
      [userimg]:userimg1,
      [content]:content1,
      [title]:title1,
      [time]:Date.now(),
      [location1]:location11,
      [location2]:location22,
      [location3]:location33,
      [noticenum]:noticenum1,

    })
    if(this.data.hasphoto){
      this.cloudFile(this.data.photo)
    }else{
      var img = 'submitdata.img'
      this.setData({
        [img]:"/images/no-photo.png"       
      })
      db.collection("suggestion").add({
        data:this.data.submitdata
      }).then(res=>{
        console.log(res)
      })
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 3000
      })
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
  },
  onLoad:function(e){
    console.log(e)
    var address = 'submitdata.address'
    var latitude = 'submitdata.latitude'
    var longitude = 'submitdata.longitude'
    var noticename = 'submitdata.noticename'
    var getlatitude = e.la
    var getlongitude = e.lo
    var getnum = e.num
    var getimg = e.img
    var getaddress = e.address
    var getnoticename = e.noticename
    console.log(getlatitude,getlongitude,getnum,getimg,getaddress,getnoticename)

    this.setData({
      latitude:getlatitude,
      longitude:getlongitude,
      num:getnum,
      img:getimg,
      [address]:getaddress,
      [latitude]:getlatitude,
      [longitude]:getlongitude,
      [noticename]:getnoticename
      
    })
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
  },
  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function(res){
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  translateMarker: function() {
    this.mapCtx.translateMarker({
      markerId: 1,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude:23.10229,
        longitude:113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  includePoints: function() {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude:23.10229,
        longitude:113.3345211,
      }, {
        latitude:23.00229,
        longitude:113.3345211,
      }]
    })
  },
  //多项列表
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['管理学院大楼','梧桐雨问学中心','博士公寓','东区','东九教学楼','东12教学楼','东操','韵苑学生公寓','启明学院','工程实训中心'];
            data.multiArray[2] = ['1层东','1层西','2层东','2层西'];
            break;
          case 1:
            data.multiArray[1] = ['主图书馆','逸夫科技楼','南4教学楼','南1楼','国际学术交流中心','校史馆','大学生活动中心','华中科技大学集贸市场','中央操场','沁苑学生公寓'];
            data.multiArray[2] = ['主楼1层','主楼2层','主楼3层','主楼4层','主楼5层','主楼6层','新楼1层','新楼2层','新楼3层','新楼4层','新楼5层'];
            break;
          case 2:
            data.multiArray[1] = ['紫菘学生公寓','西12楼','西操','西一区公寓','华宏留学生公寓','电气学科楼群','体育馆'];
            data.multiArray[2] = ['1栋','2栋','3栋','4栋','5栋','6栋','7栋','8栋','9栋','10栋','11栋','12栋','13栋'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['1层东','1层西','2层东','2层西'];
                break;
              case 1:
                data.multiArray[2] = ['明德报告厅','1号楼','7号楼','11号楼','图书馆','电影院','健身房','咖啡厅'];
                break;
              case 2:
                data.multiArray[2] = ['1栋','2栋','3栋','4栋'];
                break;
              case 3:
                data.multiArray[2] = ['东1区宿舍区','东2区宿舍区','东3区宿舍区','东1学生食堂','东三食堂'];
                break;
              case 4:
                data.multiArray[2] = ['A区','B区','C区','D区'];
                break;
              case 5:
                data.multiArray[2] = ['A区','B区','C区','D区','E区','F区'];
                break;
              case 6:
                data.multiArray[2] = ['北','东北','东','东南','南','西南','西','西北','中','观众席','篮球场','网球场'];
                break;
              case 7:
                data.multiArray[2] = ['1-9栋','10-18栋','19-27栋'];
                break;
              case 8:
                data.multiArray[2] = ['1层','2层','3层'];
                break;
              case 9:
                data.multiArray[2] = ['A区','B区','C区','D区','E区'];
                break;
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['主楼1层','主楼2层','主楼3层','主楼4层','主楼5层','主楼6层','新楼1层','新楼2层','新楼3层','新楼4层','新楼5层'];
                break;
              case 1:
                data.multiArray[2] = ['1层','2层','3层','4层','5层','6层','7层','8层','9层','10层','11层','12层'];
                break;
              case 2:
                data.multiArray[2] = ['1层','2层','3层','4层'];
                break;
              case 3:
                data.multiArray[2] = ['1号楼','2号楼','3号楼','8号楼'];
                break;
              case 4:
                data.multiArray[2] = ['1层西','1层中','1层东','2层西','2层中','2层东','3层西','3层中','3层东','4层西','4层中','4层东','5层西','5层中','5层东'];
                break;
              case 5:
                data.multiArray[2] = ['校史陈列馆','武汉国际微电子学院','校史研究室'];
                break;
              case 6:
                data.multiArray[2] = ['1层','2层','3层','4层','5层'];
                break;
              case 7:
                data.multiArray[2] = ['西区','东区'];
                break;
              case 8:
                data.multiArray[2] = ['北','东北','东','东南','南','西南','西','西北','中','篮球场','观众席'];
                break;
              case 9:
                data.multiArray[2] = ['1栋','9栋','10栋','11栋','13栋'];
                break;
            }
            break;
          case 2:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['1栋','2栋','3栋','4栋','5栋','6栋','7栋','8栋','9栋','10栋','11栋','12栋','13栋'];
                break;
              case 1:
                data.multiArray[2] = ['1层N','1层S','2层N','2层S','3层N','3层S','4层N','4层S','5层N','5层S'];
                break;
              case 2:
                data.multiArray[2] = ['北','东北','东','东南','南','西南','西','西北','中','篮球场','排球区'];
                break;
              case 2:
                data.multiArray[2] = ['西2舍','西4舍','西5舍','西6舍','西8舍','西9舍','西11舍','西12舍','西13舍','14舍'];
                break;
              case 2:
                data.multiArray[2] = ['1栋','2栋','3栋','4栋','5栋','6栋','7栋','8栋','9栋'];
                break;
              case 2:
                data.multiArray[2] = ['电气大楼','西2楼','电气与电子工程学院','华中科技大学-应用电磁工程研究所','停车场'];
                break;
              case 2:
                data.multiArray[2] = ['羽毛球场','乒乓球场'];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        break;
    }
    console.log(data.multiIndex);
    this.setData(data);
  }








})
