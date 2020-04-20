<template>
    <el-form 
        :model="form" 
        ref="form" 
        :rules="rules" 
        class="form">
            <el-form-item class="form-item" prop="username">
                <el-input 
                v-model="form.username"
                placeholder="用户名手机">
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="captcha">
                <el-input
                v-model="form.captcha" 
                placeholder="验证码" >
                    <template slot="append">
                        <el-button @click="handleSendCaptcha">
                            发送验证码
                        </el-button>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="nickname">
                <el-input
                v-model="form.nickname" 
                placeholder="你的名字">
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="password">
                <el-input
                v-model="form.password" 
                placeholder="密码" 
                type="password"
                ></el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="checkPassword">
                <el-input
                v-model="form.checkPassword" 
                placeholder="确认密码" 
                type="password">
                </el-input>
            </el-form-item>

            <el-button 
            class="submit" 
            type="primary" 
            @click="handleRegSubmit">
                注册
            </el-button>
        </el-form>
</template>

<script>
export default {
    data(){
        // 确认密码输入框失去焦点时候触发的验证函数
        // rule：表示当前的规则，这个不需要使用
        // value：是输入框的值
        // callback是必须要调用，可以传入Error对象，实现报错。（new Error是javascript原生的方法）
    const validatePass = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
            callback(new Error('两次输入密码不一致!'));
        } else {
            callback();
        }
    }
        return {
            // 表单数据
            form: {
                // 手机号码
                username:"",  
                // 昵称
                nickname:"",
                // 验证码
                captcha:"",
                // 密码
                password:"",
                checkPassword:""
            },
            // 表单规则
            rules: {
               username: [{ 
                required: true, 
                message: '请输入用户名', 
                trigger: 'blur' 
            }],
            password: [
                { 
                required: true, 
                message: '请输入密码', 
                trigger: 'blur' 
                }
            ],

            checkPassword: [{ 
                validator: validatePass, 
                trigger: 'blur' 
            }],
            nickname: [
                { 
                required: true, 
                message: '请输入昵称', 
                trigger: 'blur' 
                },
                {       min: 2,
                        max: 6,
                        message: "长度在2到6位字符",
                        trigger: "blur"
                }
            ],
            captcha: [{ 
                required: true, 
                message: '请输入验证码', 
                trigger: 'blur' 
            }],
            },
        }
    },
    methods: {
        // 发送验证码
        handleSendCaptcha(){
         // 如果手机号码为空，直接返回
         if(this.form.username===""){
             // 主动的触发表单某个属性字段的校验，并且会主动发生错误提示
             this.$refs.form.validateField("username");
             return;
         }
          // 请求发送验证码的接口
          this.$axios({
              url:"/captchas",
              method:"POST",
              data:{
                  // 手机号码
                  tel:this.form.username
              }.then(res=>{
                  // 接口主要调用成功了，都认为短信已经成功的发送到用户的手机上了
                  this.$store.dispatch("user/sendCaptcha",this.form.username).then(res=>{
                      this.$message.success("模拟的验证码是: " + res)
                  })
              })
          })
        },


        // 注册
        handleRegSubmit(){
            // 请求注册的接口
            //    console.log(this.form)
            // element表单的valiate写法几乎是固定
            this.$refs.form.validate(valid => {
                if(valid){
                    // 删除this.form的checkPassword属性
                    // 解构提取出某个属性，剩余的所有属性用other来表示
                    const {checkPassword, ...other} = this.form;
                    // 调用actions下的register方法
                    this.$store.dispatch("user/register", other).then(res => {
                        this.$message.success("恭喜你，注册成功");
                        // 跳转到首页
                        this.$router.push("/")
                    })
                }
            })
        }
    }
}
</script>

<style scoped lang="less">
    .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>