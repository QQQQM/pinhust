// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  var num=event.num
  var page=event.page
  var type=event.type
  var name=event.name
  if(type == 2){
    return await db.collection("suggestion").where({
      location1:"东区",
      title:_.neq("")
    }).skip(page).limit(num).get()
  }else if(type == 3){
    return await db.collection("suggestion").where({
      location1:"中间区域",
      title:_.neq("")
    }).skip(page).limit(num).get()
  }else if(type == 4){
    return await db.collection("suggestion").where({
      location1:"西区",
      title:_.neq("")
    }).skip(page).limit(num).get()
  }else if(type == 1){
    return await db.collection("suggestion").where({
      name:name,
      title:_.neq("")
    }).skip(page).limit(num).get()
  }else{
    return await db.collection("suggestion").skip(page).limit(num).get()
  }
  
}