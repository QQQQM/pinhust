const db = wx.cloud.database()
Page({
  data: {
    change:-1,
    latitude:23.10229,
    longitude:113.3345211,
    address:"请选择地址",
    getaddress:false,
    notice:"请选择",
    noticedataset:[{
      img:"/images/picture1.png",
      imgorg:"/images/picture1.png",
      imghovor:"/images/picture1-h.png",
      name:"网络覆盖"
    },{
      img:"/images/picture2.png",
      imgorg:"/images/picture2.png",
      imghovor:"/images/picture2-h.png",
      name:"卫生环境"
    },{
      img:"/images/picture3.png",
      imgorg:"/images/picture3.png",
      imghovor:"/images/picture3-h.png",
      name:"监控与照明"
    },{
      img:"/images/picture4.png",
      imgorg:"/images/picture4.png",
      imghovor:"/images/picture4-h.png",
      name:"流浪动物小窝"
    },{
      img:"/images/picture5.png",
      imgorg:"/images/picture5.png",
      imghovor:"/images/picture5-h.png",
      name:"绿地景观"
    },{
      img:"/images/picture6.png",
      imgorg:"/images/picture6.png",
      imghovor:"/images/picture6-h.png",
      name:"标志路牌"
    },{
      img:"/images/picture7.png",
      imgorg:"/images/picture7.png",
      imghovor:"/images/picture7-h.png",
      name:"疫情防控"
    },{
      img:"/images/picture8.png",
      imgorg:"/images/picture8.png",
      imghovor:"/images/picture8-h.png",
      name:"游憩设施"
    },{
      img:"/images/picture9.png",
      imgorg:"/images/picture9.png",
      imghovor:"/images/picture9-h.png",
      name:"树木老化"
    },{
      img:"/images/picture10.png",
      imgorg:"/images/picture10.png",
      imghovor:"/images/picture10-h.png",
      name:"车辆停放"
    },{
      img:"/images/picture11.png",
      imgorg:"/images/picture11.png",
      imghovor:"/images/picture11-h.png",
      name:"梧桐飘絮"
    },{
      img:"/images/picture12.png",
      imgorg:"/images/picture12.png",
      imghovor:"/images/picture12-h.png",
      name:"自定义"
    }]
  },

  boxtap:function(res){
    let touchid = res.currentTarget.dataset.id
    let setid = 'noticedataset[' + touchid + '].img'
    let setimg = this.data.noticedataset[touchid].imghovor
    let orgid = 'noticedataset[' + this.data.change + '].img'    
    if(this.data.change != -1){
      let orgimg = this.data.noticedataset[this.data.change].imgorg
      console.log(orgimg)
      this.setData({
        [orgid]:orgimg
      })
    }
    console.log(touchid)
    this.setData({
      notice:this.data.noticedataset[touchid].name,
      change:touchid,
      [setid]:setimg
    })
  },

  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
    this.getposition()
    this.mapCtx.moveToLocation()
  },
  getposition:function(){
    var that = this
    wx.getLocation({
      success: function(res){
        console.log(res.longitude)
        console.log(res.latitude)
        const latitude = res.latitude
        const longitude = res.longitude
        that.setData({
          longitude:res.longitude,
          latitude:res.latitude
        })
        var key = '6ZDBZ-4NBCF-OGQJI-J7CUL-EP3RQ-OOB6C'
        wx.request({
          url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${key}`,
          success: function (res) {
            console.log(res)
            console.log(123)
            var detailaddr = res.data.result
            console.log(detailaddr)
            that.setData({
              address:detailaddr.address,
              longitude:detailaddr.location.lng,
              latitude:detailaddr.location.lat,
              getaddress:true
            })                
          }
        })
      }
    })
  },
  chooselocation(){
    var that = this
    var latitude=this.data.latitude
    var longitude=this.data.longitude
    console.log(latitude,longitude)
    wx.chooseLocation({
      latitude,
      longitude,
      scale: 18,
      success:function(res){
        console.log(res.address)
        that.setData({
          address:res.address,
          longitude:res.longitude,
          latitude:res.latitude,
          getaddress:true          
        })
      }
    })
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
    console.log("movw!")
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
  }
})
