import { combineReducers } from "redux";
import { CategoryState } from "../types/category";
import { ProductState } from "../types/product";
import { UserState } from "../types/user";
import categoryReducer from "./reducers/categoryReducer";
import productReducer from "./reducers/productReducer";
import userReducer from "./reducers/userReducer";

//Reducer Types
export interface AppState{
    user:UserState;
    categories:CategoryState;
    products:ProductState;
}


//Reducer ları bir araya getiren yapı
//Tip tanımlaması yaptık
const rootReducer=combineReducers<AppState>({
    user:userReducer,
    categories:categoryReducer,
    products:productReducer
});

export default rootReducer;