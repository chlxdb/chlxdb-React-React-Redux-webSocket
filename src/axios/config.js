import axios from 'axios';

axios.defaults.baseURL = 'http://8.134.134.68:8080';
// axios.defaults.headers.common['token']='dscdfjkvsj'
//请求拦截器
// axios.interceptors.request.use(
//   res => res.data,  // 拦截到响应对象，将响应对象的 data 属性返回给调用的地方
//   err => Promise.reject(err)
// )

// 响应拦截器
// axios.interceptors.response.use(
//     res => {console.log(res.data)},
//      // 拦截到响应对象，将响应对象的 data 属性返回给调用的地方
//     err => Promise.reject(err)
// )
