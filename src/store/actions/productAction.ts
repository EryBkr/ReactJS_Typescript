import { Product, ProductDispatch, ProductFormModel } from "../../types/product";
import api from "../../utils/api";


//Action lar payload oluşturur ve reducer a gönderir.
export const getProduct = () => async (dispatch: ProductDispatch) => {
    dispatch({type:"GET_PRODUCT_START"});
    try {
        const response=await api().get<Product[]>("/records");
        dispatch({type:"GET_PRODUCT_SUCCESS",payload:response.data});
    } catch (error) {
        dispatch({type:"GET_PRODUCT_ERROR"})
    }
};

export const addProduct=(form:ProductFormModel)=>async(dispatch:ProductDispatch)=>{
    dispatch({type:"ADD_PRODUCT_START"});
    try {
        const response=await api().post<Product>("/records",form);
        dispatch({type:"ADD_PRODUCT_SUCCESS",payload:response.data})
    } catch (error) {
        dispatch({type:"ADD_PRODUCT_ERROR"})
    }
}

export const updateProduct=(form:Partial<ProductFormModel>,productId:number)=>async(dispatch:ProductDispatch)=>{
    dispatch({type:"UPDATE_PRODUCT_START"});
    try {
        const response=await api().put<Product>("/records/"+productId,form);
        dispatch({type:"UPDATE_PRODUCT_SUCCESS",payload:response.data})
    } catch (error) {
        dispatch({type:"UPDATE_PRODUCT_ERROR"})
    }
}

export const deleteProduct=(productId:number)=>async(dispatch:ProductDispatch)=>{
    dispatch({type:"DELETE_PRODUCT_START"});
    try {
        await api().delete("/records/"+productId);
        dispatch({type:"DELETE_PRODUCT_SUCCESS",payload:productId});

    } catch{
        dispatch({type:"DELETE_PRODUCT_ERROR"});
    }
}
