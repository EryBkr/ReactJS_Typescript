import { Redirect, Route,RouteProps } from "react-router"

interface PrivateRouteProps extends RouteProps{
    component:React.FC<any>;
}

//token var ise verilen component e prop lar ile git yok ise login e yönlendiriyoruz
function PrivateRoute({component:Component,...theRest}:PrivateRouteProps) {
    return (
       <Route {...theRest} render={(props)=>{
           const token=localStorage.getItem("token");
           if(token){
            return <Component {...props}/> 
           }
           return <Redirect to="/login"/>;
       }}/>
    )
}

export default PrivateRoute
