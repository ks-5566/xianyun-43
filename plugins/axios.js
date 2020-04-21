import {Message} from "element-ui";
// 拦截axios的错误，插件必须要有一个函数
export default (nuxt)=>{
    // onError可以监听$axios请求错误的时候触发
   nuxt.$axios.onError(err=>{
    //   console.log(err)
    const {statusCode,message} = err.response.data;

    if(statusCode ===400){
        Message.error(message)
    }
   })
}