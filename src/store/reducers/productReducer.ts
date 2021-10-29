import { ProductAction, ProductState } from "../../types/product"

const defaultState:ProductState={
    data:[],
    loading:false,
    error:""
}


//Reducer fonksiyonumuz
const productReducer=(state:ProductState=defaultState,action:ProductAction):ProductState=>{
    switch (action.type) {
        case "GET_PRODUCT_START":
            return {...state,loading:true,error:""}
        case "GET_PRODUCT_SUCCESS":
            return {...state,loading:false,data:action.payload,error:""}
        case "GET_PRODUCT_ERROR":
            return {...state,loading:false,error:"Get Product Error"}
        case "ADD_PRODUCT_START":
             return { ...state, loading: true, error: "" };
        case "ADD_PRODUCT_SUCCESS":
             return { ...state, loading: false, data:[action.payload,...state.data] };
        case "ADD_PRODUCT_ERROR":
             return { ...state, loading: false, error: "Error adding product" };
        case "UPDATE_PRODUCT_START":
             return { ...state, loading: true, error: "" };
        case "UPDATE_PRODUCT_SUCCESS":
             return { ...state, loading: false, data:state.data.map(product=>product.id===action.payload.id?action.payload:product) };
        case "UPDATE_PRODUCT_ERROR":
             return { ...state, loading: false, error: "Error updating product" };
        case "DELETE_PRODUCT_START":
             return {...state,loading:true,error:""}
        case "DELETE_PRODUCT_SUCCESS":
             return {...state,loading:false,data:state.data.filter(product=>product.id!==action.payload as number)}
        case "DELETE_PRODUCT_ERROR":
             return{...state,loading:false,error:"Error Deleting product"}      
    
        default:
            return state;
    }
}

export default productReducer;