import { message } from "antd"

//Hata ve başarı durumları için antd sunmuş olduğu alert yapısı
export const showError=(errorMessage:string)=>{
    message.error(errorMessage);
}

export const showSuccess=(successMessage:string)=>{
    message.success(successMessage);
}
