// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(123123123)
  var num=event.num
  var page=event.page

  return await db.collection("suggestion").where({
    location1:"中间区域"
  }).skip(page).limit(num).get()

  // if(zhong){  
  // return await db.collection("suggestion").where({
  //   location1:"中间区域"
  // }).skip(page).limit(num).get()
  // }else{
  //   return await db.collection("suggestion").skip(page).limit(num).get()
  // }


}