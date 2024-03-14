## 更新日志

### 1.2.2

_2018-10-16_

- 修复判断当前路由类型 bug
- 默认开放 element-ui 所有组件
- 修复子菜单同级出现子菜单项会同时选中 bug
- 捕获首次请求菜单列表和权限异常，自动跳转至登录页
- 修复菜单按钮权限错误 bug [#41](https://github.com/renrenio/luckyAdmin-vue/issues/41)
- 提供重置登录信息状态方法。修复登出或替换账号还保留之前账号操作信息和痕迹 bug
- 优化 token 失效、退出后，为了强制清空整站临时存储数据而刷新页面问题。注意: 此次 vux 数据并未做重置处理！

### 1.2.1

_2018-06-08_

- 修复 tabs 关闭最后一个 tab 后，再次打开会保留最后一个 tab bug
- 优化完善 mock 模拟数据
- 修复 linux 系统，引入主题色文件名大小写编译错误 bug [#22](https://github.com/daxiongYang/luckyAdmin-vue/issues/22)
- 新增 echarts 图表、ueditor 富文本编辑器 demo
- 移除登录成功 token 前端设置的失效时间
- 修复退出／token 失效后，返回登录页面未清空整站临时存储数据 bug
- 修复手机号码验证正则 bug
- 同步后台 修改 config 模块 key vulue 子段为 paramKey paramValue
- 修复角色管理 新增修改授权接口请求错误 bug
- 修复 1.2 新版本的导航栏 Tab 错位 bug [#14](https://github.com/daxiongYang/luckyAdmin-vue/issues/14)
- 修复动态菜单路由 最前面带/bug
- 修复其它已知 bug

### 1.2.0

_2018-05-03_

- 支持菜单管理操作动态(菜单)路由
- 移除 api 文件夹目录，简化 api 请求方式
- 新增 element-ui 组件主题 12 套，可同步修改配置设置成整站主题
- 调整 store 状态目录结构，改变设置／获取方式
- 调整 views 视图层结构，更友好的支持动态(菜单)路由
- 修复其它已知 bug

### 1.1.0

_2018-04-15_

- 使用 SVG Sprite 矢量图标，替换 fontawesome 字体图标
- 新增内容 tabs 标签页，关闭当前／其它／全部、刷新当前功能
- 新增 scss 变量皮肤定制
- 优化路由机制，通过 meta isTab 属性，设定是否通过 tab 标签页展示内容
- 更新 element-ui 2.3.2 用于修复左侧菜单收缩卡顿问题
- 新增 mock 本地开发模拟数据功能
- 修复本地开发找不到 baseUrl 问题
- 更新 element-ui 2.2.1 用于修复 tree 半选中状态项不能传给后台接口问题
- 修复其它已知 bug

### 1.0.0

_2018-02-11_
