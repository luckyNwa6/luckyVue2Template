import axios from "axios";
import Vue from "vue";
let request = axios.create({
  baseURL: "/idp",
  // 超时
  timeout: 1000 * 60 * 2
});

request.interceptors.request.use(
  config => {
    // config.headers.token = sessionStorage.getItem("token");
    config.headers["token"] = Vue.cookie.get("token"); // 请求头带上token
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

//添加响应拦截器,下面改了会报错
request.interceptors.response.use(
  response => {
    // 将响应数据进行处理，并返回data里的值，就是后端传过来的
    //这样前端调用接口方法时候可以直接看到值res即可

    return response.data;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default request;
