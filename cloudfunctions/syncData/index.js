// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database();
  let ins = event.items.slice();

  await db.collection("items").where({
    openid: wxContext.OPENID
  }).get().then(res =>{
    //如果数据库为空，上传数据
    console.log(res.data)
    if(res.data.length == 0){
      let del_num = 0;
      event.items.forEach(function(element, index){
        if(!element.delItem){
          db.collection("items").add({
            data: {
              openid: wxContext.OPENID,
              key: element.key,
              title: element.title,
              content: element.content,
              create_time:  element.create_time,
              update_time:  element.update_time,
              // update_time_m:  Date(element.update_time_m),
            },
            success(res) {
              console.log("add success",res)
            },
            fail(err) {
              console.log("add error",err)
            }
          })
        }else{
          ins.splice(index - del_num, 1);
          del_num++;
        }
      });
    }else{
      //如果本地数据空，则同步所有数据
      if(event.items.length == 0) {
        res.data.forEach(element => {
          let item = {}
          item.key= element.key
          item.title= element.title
          item.content= element.content
          item.create_time=  element.create_time
          item.update_time=  element.update_time
          // item.update_time_m=  Date(element.update_time_m)
          item.delItem= 0
          ins.push(item);
        })
      }else{ //整合数据、根据更新时间，前端删除进行标记
        let del_num1 = 0;
        for(let i = 0; i < event.items.length; i++){
          if(event.items[i].delItem == 1){ //删除数据
            db.collection("items").where({
              key: event.items[i].key
            }).remove()
            ins.splice(i - del_num1, 1);
            del_num1++;
          }else{
            db.collection("items").where({
              key: event.items[i].key
            }).get().then(res => {
              if(res.data.length == 0){
                db.collection("items").add({
                  data: {
                    openid: wxContext.OPENID,
                    key: event.items[i].key,
                    title: event.items[i].title,
                    content: event.items[i].content,
                    create_time:  event.items[i].create_time,
                    update_time:  event.items[i].update_time,
                    // update_time_m:  Date(event.items[i].update_time_m),
                  },
                  success(res) {
                    console.log("add success",res)
                  },
                  fail(err) {
                    console.log("add error",err)
                  }
                })
              }else{
                db.collection("items").where({
                  key: event.items[i].key
                }).update({
                  data: {
                    title: event.items[i].title,
                    content: event.items[i].content,
                    update_time:  event.items[i].update_time,
                    // update_time_m:  Date(event.items[i].update_time_m),
                  },
                  success: res => {
                    console.log("success", res)
                  },
                  fail: err => {
                    console.log("error", err)
                  }
                })
              }
            })
          }
        }
      }
    }
  })
  
  return {
    items: ins
  }
}