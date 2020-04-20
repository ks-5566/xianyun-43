// 用户管理
export const state = () => ({
    // 采用接口返回的数据结构
    userInfo: {
    },
}) 
// 同步修改state中的数据 export const mutations = {}是固定的格式
// store的数据不能直接修改，必须要使用mutations来修改
export const mutations = {
     // 保存用户信息到state
     setUserInfo(state, data){
        state.userInfo = data;
    },
};
// 重点：actions可以用来存放一些公共的方法，多个组件或者项目通用的方法
// 顺带的：并且可以调用mutations来修改state
export const actions = {
    // 声明一个函数，函数名可以随便起
    // 该函数有两个参数，第一个参数是Store对象, 第二个参数是传入的参数(不固定)
    login(store, data){
        return this.$axios({
            url: "/accounts/login",
            method: "POST",
            data
        }).then(res => {
            // data是用户的数据
            const {data} = res
            // 通过store.commit调用mutations的方法
            // 由于是在同一个模块下，可以省略前面的user名字
            store.commit('setUserInfo',data);

            return data;
        })
    },
      // 发送手机验证码
    sendCaptcha(store, tel){
        // 请求验证码接口
        return this.$axios({
            url: "/captchas",
            method: "POST",
            data: {
                // 手机号码
                tel
            }
        }).then(res => {
            // 接口主要调用成功了，都认为短信已经成功的发送到用户的手机上了
            const {code} = res.data;
            return code;
        })
    },
    // 注册，注册接口调用成功后和登录的操作是一样
    register(store, data){
        return this.$axios({
            url: "/accounts/register",
            method: "POST",
            data
        }).then(res => {
            // data是用户的数据
            const {data} = res;

            // 通过store.commit调用mutations的方法
            // 由于是在同一个模块下，可以省略前面的user名字
            store.commit('setUserInfo', data);

            return data;
        })
    }
};