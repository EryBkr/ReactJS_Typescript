import { User, UserAction, UserState } from "../../types/user";

//Default state değerimizi oluşturduk
const defaultState: UserState = {
  data: {} as User,
  loading: false,
  error: "",
};

//state dönecek veya atamasını yapacak
const userReducer = (state: UserState = defaultState, action: UserAction) => {
  switch (action.type) {
  //Her iki case içinde geçerli demek
    case "LOGIN_START":
    case "IS_LOGGED_IN_START":
      return { ...state, loading: true, error: "" };

    case "LOGIN_SUCCESS":
    case "IS_LOGGED_IN_SUCCESS":
      return { ...state, loading: false, data: action.payload };

    case "LOGIN_ERROR":
      return { ...state, loading: false, error:"Login Failed" };
    case "IS_LOGGED_IN_ERROR":
      return {...state,loading:false,error:"Token missing or invalid"}
    case "LOG_OUT":
      return {...state,data:{} as User}
    default:
      return state;
  }
};

export default userReducer;
