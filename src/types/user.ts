import { ThunkDispatch } from "redux-thunk";

//User Login Response Model
export interface User {
  message: string;
  username: string;
  email: string;
  full_name: string;
  token: string;
}

//Login Request Model
export interface LoginForm{
  username:string;
  password:string;
}

//user reducer için default state modeli
export interface UserState {
  data: User;
  loading: boolean;
  error: string;
}

//action types
interface LOGIN_START {
  type: "LOGIN_START";
}

interface LOGIN_SUCCESS {
  type: "LOGIN_SUCCESS";
  payload: User;
}

interface LOGIN_ERROR {
  type: "LOGIN_ERROR";
}

interface IS_LOGGED_IN_START {
  type: "IS_LOGGED_IN_START";
}

interface IS_LOGGED_IN_SUCCESS_SUCCESS {
  type: "IS_LOGGED_IN_SUCCESS";
  payload: User;
}

interface IS_LOGGED_IN_ERROR {
  type: "IS_LOGGED_IN_ERROR";
}

interface LOG_OUT{
  type:"LOG_OUT"
}

//Action tiplerini oluşturdum  ve bir araya getirdim
export type UserAction = LOGIN_START 
| LOGIN_SUCCESS 
| LOGIN_ERROR
| IS_LOGGED_IN_START
| IS_LOGGED_IN_SUCCESS_SUCCESS
| IS_LOGGED_IN_ERROR
| LOG_OUT;

//Dispatch type
export type UserDispatch=ThunkDispatch<UserState,void,UserAction>
