<template>
  <div class="login-container">
    <div class="box">
      <el-form class="login-form" :model="form" ref="loginForm" :rules="rules">
        <h2 class="title">图床后台登录</h2>
        <el-form-item prop="acc">
          <el-input v-model="form.acc" prefix-icon="el-icon-user" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input v-model="form.pwd" placeholder="密码" prefix-icon="el-icon-lock" show-password></el-input>
        </el-form-item>
        <div style="display: flex; justify-content: left; margin-bottom: 10px">
          <input v-model="yzmInput" placeholder="验证码" autocomplete="off" class="yzm" />

          <input type="button" class="yzmF" v-model="yzmm" @click="refreshYzm" />
        </div>

        <el-form-item>
          <!-- <el-button type="primary" @click="login">登录</el-button> -->
          <ViButton v-preventReClick @click="login">登录</ViButton>
          <!-- <vi-button button-type="success" @click="login">登录</vi-button> -->
        </el-form-item>

        <el-image
          @click="goQQ"
          style="position: absolute; top: 340px; right: 100px"
          :src="require('@/assets/img/Connect_logo_7.png')"
          fit="contain"
        ></el-image>
      </el-form>
    </div>
    <div style="margin: 0 auto; width: 900px; position: absolute; left: 29%; bottom: 0">
      <!-- background: linear-gradient(to right, #debae6, #c7cefe); -->
      <p style="letter-spacing: 1px; font-family: 楷体">
        🤠2023 图床后台管理系统 | Now:
        {{ currentDateTime }}🏝️|
        <a style="text-decoration: none" href="https://luckynwa.top/about/" class="cool">前往博客🐳</a>
        | 备案号:
        <a href="https://beian.miit.gov.cn/" style="text-decoration: none">
          <span style="padding: 2px">
            <img src="https://luckynwa.top/mypic/blog/gonganbeian.png" style="height: 13px; margin-left: 2px" />
            <span style="color: rgb(0, 0, 0); margin-left: 3px">闽ICP备</span>
          </span>
          <span style="color: black">2023003457号-1</span>
        </a>
      </p>
    </div>
  </div>
</template>

<script>
import ViButton from '@luckynwa-lib/vi-button'
import '@luckynwa-lib/vi-button/dist/index.css'

import { getQQ, getPersonInfo, reqLogin } from '@/api/login'
import { yh } from '@/assets/js/yinHua.js'
// import { getUUID } from '@/utils'
export default {
  components: { ViButton },
  data() {
    return {
      form: {
        acc: 'admin',
        pwd: '123456',
      },

      yzmInput: '',
      yzmm: '',
      currentDateTime: '',
      rules: {
        acc: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          {
            min: 5,
            max: 10,
            message: '账号长度必须为 5-10 位',
            trigger: 'blur',
          },
        ],
        pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    }
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (this.yzmInput.toLowerCase() === this.yzmm.toLowerCase()) {
            this.failMsg('验证码有误！')

            this.yzmm = this.$options.methods.showCode()
          } else {
            let data = {
              username: this.form.acc,
              password: this.form.pwd,
              captcha: '',
              openCaptcha: false,
              uuid: '',
            }
            reqLogin(data).then(res => {
              console.log('🚀 ~ reqLogin ~ res:', res)
              //session会话级，关闭浏览器，token就没了，1登录，开2窗口
              //会出现还需要登录的情况
              // sessionStorage.setItem("token", res.luckyToken);
              //cookie，浏览器关闭也能保持登录状态
              if (res.data.code === 0) {
                console.log('🚀 ~ reqLogin ~ res:', res)
                this.$cookie.set('token', res.data.token)
                this.successMsg(res.data.msg)
                this.$router.replace({ name: 'home' })
              } else {
                this.failMsg(res.data.msg)
                this.yzmm = this.$options.methods.showCode()
                this.$router.push({ name: 'login' })
              }
            })
          }
        }
      })
    },

    //更新时间
    updateDateTime() {
      setInterval(() => {
        const currentDateTime = new Date().toLocaleString()
        this.currentDateTime = currentDateTime
      }, 1000)
    },
    //验证码相关
    refreshYzm() {
      this.yzmm = this.$options.methods.showCode()
    },
    showCode() {
      var codeBox = '23456789qwertyupasdfghjkzxcvbnmQWERTYUPASDFGHJKZXCVBNM'
      //太像的字符去掉0Oo1il
      var code = ''
      for (var i = 1; i <= 4; i++) {
        code += codeBox.charAt(Math.floor(Math.random() * codeBox.length))
      }
      return code
    },

    //获取qq的跳转链接
    goQQ() {
      console.log('zzxxx')
      getQQ().then(res => {
        console.log('请求新的URL去验证第三方的QQ！！！')
        window.location.href = res
      })
    },
  },

  mounted() {
    this.yzmm = this.$options.methods.showCode()
    // 获取完整的查询字符串，例如："?data=42514014FF964FE30D2B24E69E3CA6DB"
    let queryString = window.location.href.split('?')[1]
    // console.log('url?后面的值是:' + queryString)
    // 解析查询字符串为对象
    let token = new URLSearchParams(queryString).get('data')

    let queryString2 = window.location.href.split('&')[1]
    let openId = new URLSearchParams(queryString2).get('openid')
    console.log('🚀 ~ mounted ~ openId:', openId)

    if (token !== '' && token !== null && openId !== '' && openId !== null) {
      this.$cookie.set('token', token)
      console.log('开始获取个人信息！')

      // 在这里将 openId 作为参数传递给 getPersonInfo 方法
      getPersonInfo(openId).then(res => {
        console.log('🚀 ~ getPersonInfo ~ res:', res)
        if (res.code === 0) {
          this.$cookie.set('picData', JSON.stringify(res.data))
          this.successMsg('登录成功！')
          this.$router.push('/home')
        }
      })
    }
  },
  beforeDestroy() {
    const script = document.querySelector('script[src="yinHua.js"]')
    if (script) {
      script.parentNode.removeChild(script)
    }
  },
  created() {
    yh
    this.updateDateTime()
    /*看板娘初始化
    参数说明
    model 模型的配置
       json 文件资源路径，可以支持网络路径，此处使用的是相对路径
       scale 模型缩放系数
    display 模型布局
       position 位置
       width 宽度
       height 高度
       hOffset 水平偏移量
       vOffset 垂直偏移量
    mobile 移动端配置
       show 显示/隐藏
       scale 缩放比例
    react 模型矩形框样式
       opacity 透明度
       opacityDefault 默认透明度
       opacityOnHover 鼠标悬浮透明度
  */
    setTimeout(() => {
      window.L2Dwidget.init({
        pluginRootPath: '../static/plugins/live2dw/',
        pluginJsPath: 'lib/',
        pluginModelPath: 'live2d-widget-model-haru_1/assets/', //中间这个haru_2就是你的老婆,想换个老婆,换这个就可以了
        tagMode: false,
        debug: false,
        model: {
          jsonPath: '../static/plugins/live2dw/live2d-widget-model-haru_1/assets/haru01.model.json',
        },
        display: { position: 'left', width: 150, height: 400 }, //调整大小,和位置
        mobile: { show: true }, //要不要盯着你的鼠标看
        log: false,
      })
    }, 1000)
  },
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
/* 最外面一层的div */
.login-container {
  height: 100vh;
  background: #e9f1f6;
}
.box {
  position: absolute;
  top: 20%;
  left: 20%;
  width: 670px;
}
.login-form {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 400px;
  height: 400px;
  padding: 60px 20px;
  box-shadow: inset 20px 20px 20px rgba(0, 0, 0, 0.05), 25px 35px 20px rgba(0, 0, 0, 0.05), 25px 30px 30px rgba(0, 0, 0, 0.05),
    inset -20px -20px 25px rgba(255, 255, 255, 0.9);
  transition: 0.5s;
  border-radius: 52% 48% 33% 67%/ 38% 45% 55% 62%;
}

.login-form:hover {
  border-radius: 50%;
}

/* 内容高亮气泡1 */
.login-form::before {
  content: '';
  position: absolute;
  top: 50px;
  left: 85px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: #fff;
  opacity: 0.9;
}
/* 内容高亮气泡2 */
.login-form::after {
  content: '';
  position: absolute;
  top: 90px;
  left: 110px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #fff;
  opacity: 0.9;
}
.title {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  color: #f16893;
}
.el-input {
  /* 修改输入框的宽度和高度 */
  width: 230px;
  height: 40px;
}
/* 验证码css */
.yzm {
  position: relative;
  margin-top: 10px;
  width: 100px;
  height: 35px !important;
  border: none;
  border-radius: 5px;
  padding-left: 10px;
}

.yzmF {
  position: relative;
  margin-top: 10px;
  margin-left: 22px;
  font-size: 27px;
  width: 100px;
  height: 35px;
  border: none;
  background-color: white;
  border-radius: 8px;
  font-size: 27px;
  font-weight: 600;
  letter-spacing: 8px;
  color: rebeccapurple;
  font-family: '楷体';
}
.yzm:focus {
  border: 1px solid rgb(131, 44, 174);
  color: rgb(16, 151, 140);
  outline: none; /* 去除默认的焦点样式 */
}

.cool {
  display: inline;
  text-align: center;
  background-image: linear-gradient(to right, #f782a9 0%, #b48bd9 10%, #4ed9ab 40%, #ffd26b 60%, #f782a9 90%, #f782a9 100%);
  background-size: 200% auto;
  color: #000;
  font-size: 1rem;
  background-clip: text;
  color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 10s linear infinite;
  font-family: dancing script, cursive;
  font-weight: 700;
}

@keyframes shine {
  to {
    background-position: 200% center;
  }
}
</style>
