import { ThunkDispatch } from "redux-thunk";

//Action ların State tipi
export interface CategoryState{
  data:Category[],
  loading:boolean,
  error:string
}

//Formdan gelen dataları paketliyorum
export interface CategoryFormModel{
  name:string;
  type:string;
  color?:string;
}

//Action Types
export interface GET_CATEGORY_START{
  type:"GET_CATEGORY_START";
}

export interface GET_CATEGORY_SUCCESS{
  type:"GET_CATEGORY_SUCCESS";
  payload:Category[];
}

export interface GET_CATEGORY_ERROR{
  type:"GET_CATEGORY_ERROR";
}

export interface ADD_CATEGORY_START{
  type:"ADD_CATEGORY_START";
}

export interface ADD_CATEGORY_SUCCESS{
  type:"ADD_CATEGORY_SUCCESS";
  payload:Category;
}

export interface ADD_CATEGORY_ERROR{
  type:"ADD_CATEGORY_ERROR";
}

export interface UPDATE_CATEGORY_START{
  type:"UPDATE_CATEGORY_START";
}

export interface UPDATE_CATEGORY_SUCCESS{
  type:"UPDATE_CATEGORY_SUCCESS";
  payload:Category;
}

export interface UPDATE_CATEGORY_ERROR{
  type:"UPDATE_CATEGORY_ERROR";
}

export interface DELETE_CATEGORY_START{
  type:"DELETE_CATEGORY_START";
}

export interface DELETE_CATEGORY_SUCCESS{
  type:"DELETE_CATEGORY_SUCCESS";
  payload:number;
}

export interface DELETE_CATEGORY_ERROR{
  type:"DELETE_CATEGORY_ERROR";
}

//Category get model
export interface Category {
    id: number
    name: string
    type: string
    color: string
  }

  //Action type ları bir araya getirdik
  export type CategoryAction= GET_CATEGORY_START
  | GET_CATEGORY_SUCCESS
  | GET_CATEGORY_ERROR 
  | ADD_CATEGORY_START
  | ADD_CATEGORY_SUCCESS
  | ADD_CATEGORY_ERROR
  | UPDATE_CATEGORY_START
  | UPDATE_CATEGORY_SUCCESS
  | UPDATE_CATEGORY_ERROR
  | DELETE_CATEGORY_START
  | DELETE_CATEGORY_SUCCESS
  | DELETE_CATEGORY_ERROR;

  //Dispatch Type
  export type CategoryDispatch=ThunkDispatch<CategoryState,void,CategoryAction>;

