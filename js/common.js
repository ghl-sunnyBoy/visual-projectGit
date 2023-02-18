// 上面这个代码处理过度动画（默认加上不用管）
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('sidenav-pinned')
    document.body.classList.add('ready')
  }, 200)
})

// 每个页面都会导入该js 统一的设置写这里即可
// 基地址
axios.defaults.baseURL = 'http://ajax-api.itheima.net'

// 弹框
function tiy(str) {
  myToast.children[0].innerHTML = str
  const fm = new bootstrap.Toast(myToast, {
    delay: 1000
  })
  fm.show()
}

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

// 用户名渲染
const nameSpan = document.querySelector('#navbar-main .font-weight-bold')
nameSpan.innerHTML = localStorage.getItem('username')

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  const studentToken = localStorage.getItem('token')
  // 在发送请求之前做些什么
  // console.log(config);
  config.headers.Authorization = studentToken
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});