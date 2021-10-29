import { Category, CategoryDispatch, CategoryFormModel } from "../../types/category";
import api from "../../utils/api";

export const getCategories=()=> async(dispatch:CategoryDispatch)=>{
    dispatch({type:"GET_CATEGORY_START"});
    try {
        const response=await api().get<Category[]>("/categories");
        dispatch({type:"GET_CATEGORY_SUCCESS",payload:response.data});
    } catch (error) {
        dispatch({type:"GET_CATEGORY_ERROR"});
    }
}


export const addCategory=(form:CategoryFormModel)=>async (dispatch:CategoryDispatch)=>{
    dispatch({type:"ADD_CATEGORY_START"});
    try {
        const response=await api().post<Category>("/categories",form);
        dispatch({type:"ADD_CATEGORY_SUCCESS",payload:response.data});
    } catch (error) {
        dispatch({type:"ADD_CATEGORY_ERROR"});
    }
}

//form üzerinden property leri ve tablodan da güncellenecek kategorinin id değerini alacağız
export const updateCategory=(form:Partial<CategoryFormModel>,categoryId:number)=>async(dispatch:CategoryDispatch)=>{
    dispatch({type:"UPDATE_CATEGORY_START"});
    try {
        const response=await api().put<Category>("/categories/"+categoryId,form);
        dispatch({type:"UPDATE_CATEGORY_SUCCESS",payload:response.data});
    } catch (error) {
        dispatch({type:"UPDATE_CATEGORY_ERROR"})
    }
}

export const deleteCategory=(categoryId:number)=>async(dispatch:CategoryDispatch)=>{
    dispatch({type:"DELETE_CATEGORY_START"});
    try {
        await api().delete("/categories/"+categoryId);
        dispatch({type:"DELETE_CATEGORY_SUCCESS",payload:categoryId});

    } catch{
        dispatch({type:"DELETE_CATEGORY_ERROR"});
    }
}