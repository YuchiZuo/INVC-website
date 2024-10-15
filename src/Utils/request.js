
import axios from "axios";
import router from "@/router";
const request =axios.create({
    baseURL:process.env.VUE_APP_BASEURL,//后端的接口地址
    timeout: 30000
})

request.interceptors.request.use(config =>{
    config.headers['Content-Type']='application/json;charset=utf-8';
   let user =JSON.parse(localStorage.getItem("INVC-user")||'{}')
    config.headers['token']=user?.token;
    return config
},error =>{
        console.error('request error:'+error)
        return Promise.reject(error)
    }
)

request.interceptors.response.use(
    response =>{
        let res =response.data;
        if(typeof res=='string'){
            res=res?JSON.parse(res):res
        }
        if(res.code==='401'){
            localStorage.removeItem("INVC-user")//清除用户数据
           router.push('/login')
        }
        return res;

    },
    error => {
        console.error('response error:'+error)
        return Promise.reject(error)
    }
)

export default request