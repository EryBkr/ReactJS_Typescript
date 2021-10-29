import { LoginForm, User, UserDispatch } from "../../types/user";
import api from "../../utils/api";

//LoginForm model tipinde creadentials parametresi bekliyoruz
export const login = (credentials:LoginForm)=> async (dispatch:UserDispatch)=>{
    dispatch({type:"LOGIN_START"});
    try {
        //login isteği sonucu dönen datayı bir modele pars edip handle ediyoruz
        const response= await api().post<User>("/users/login",credentials);
        //type 'a payload bilgisini set ediyoruz
        dispatch({type:"LOGIN_SUCCESS",payload:response.data});

        //işlem başarılı artık JWT yi localstorage ye eklemem gerekiyor
        localStorage.setItem("token",response.data.token);
    } catch (error) {
        dispatch({type:"LOGIN_ERROR"});
    }
}

//kullanıcının token i var ama geçerli mi ?
export const isLoggedIn=()=> async(dispatch:UserDispatch)=>{
    dispatch({type:"IS_LOGGED_IN_START"});
    try {
        const response=await api().post<User>("/users/is_logged_in");
        dispatch({type:"IS_LOGGED_IN_SUCCESS",payload:response.data});
    } catch (error) {
        dispatch({type:"IS_LOGGED_IN_ERROR"});
    }
}

//logout operasyonu
export const logout=()=>(dispatch:UserDispatch)=>{
    //Tokeni localstorage den siliyorum
    localStorage.removeItem("token");
    dispatch({type:"LOG_OUT"});
}