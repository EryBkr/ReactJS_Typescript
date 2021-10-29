import axios from "axios";


//Axios içerisinde base url tanımlamasını yaptım.Sürekli sürekli girmenin bir anlamı yok
//localstorage den okunan token bilgisi header içerisine ekliyoruz
export default ()=>{
    const token=localStorage.getItem("token");
   return axios.create({
        baseURL:"https://expensetracker-be.herokuapp.com",
        headers:{
            Authorization:token?token:"",
        }
    })
};