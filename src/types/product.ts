import { ThunkDispatch } from "redux-thunk";
import { Category } from "./category";

//Product Get Model
export interface Product {
  id: number
  title: string
  amount: number
  createdAt: string
  updatedAt: string
  category: Category
}

//Form işlemleri için Product modelimiz
export interface ProductFormModel{
    title: string
    amount: number
    category_id:number
}

//Reducer tarafından bizlere dönecek olan model
export interface ProductState{
    data:Product[];
    loading:boolean;
    error:string;
}

//Action Types
interface GET_PRODUCT_START{
    type:"GET_PRODUCT_START"
}

interface GET_PRODUCT_SUCCESS{
    type:"GET_PRODUCT_SUCCESS",
    payload:Product[]
}

interface GET_PRODUCT_ERROR{
    type:"GET_PRODUCT_ERROR"
}
interface ADD_PRODUCT_START{
    type:"ADD_PRODUCT_START"
}

interface ADD_PRODUCT_SUCCESS{
    type:"ADD_PRODUCT_SUCCESS",
    payload:Product
}

interface ADD_PRODUCT_ERROR{
    type:"ADD_PRODUCT_ERROR"
}
interface UPDATE_PRODUCT_START{
    type:"UPDATE_PRODUCT_START"
}

interface UPDATE_PRODUCT_SUCCESS{
    type:"UPDATE_PRODUCT_SUCCESS",
    payload:Product
}

interface UPDATE_PRODUCT_ERROR{
    type:"UPDATE_PRODUCT_ERROR"
}
interface DELETE_PRODUCT_START{
    type:"DELETE_PRODUCT_START"
}

interface DELETE_PRODUCT_SUCCESS{
    type:"DELETE_PRODUCT_SUCCESS",
    payload:number
}

interface DELETE_PRODUCT_ERROR{
    type:"DELETE_PRODUCT_ERROR"
}

//Action type lara tek birden erişmek için
export type ProductAction=
 GET_PRODUCT_START
|GET_PRODUCT_SUCCESS
|GET_PRODUCT_ERROR
|ADD_PRODUCT_START
|ADD_PRODUCT_ERROR
|ADD_PRODUCT_SUCCESS
|UPDATE_PRODUCT_START
|UPDATE_PRODUCT_SUCCESS
|UPDATE_PRODUCT_ERROR
|DELETE_PRODUCT_START
|DELETE_PRODUCT_ERROR
|DELETE_PRODUCT_SUCCESS;


//Dispatch modelimiz
export type ProductDispatch=ThunkDispatch<ProductState,void,ProductAction>;

