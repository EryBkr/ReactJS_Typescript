import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { AppState } from '../store';
import { logout } from '../store/actions/userActions';

function LogOut() {

    const dispatch=useDispatch();
    const {data}=useSelector((state:AppState)=>state.user);

    useEffect(()=>{
        //Component yüklendiği gibi Redux tarafında kullanıcının state bilgilerini siliyorum
        dispatch(logout());
    },[]);

    //kullanıcı data sının silindiğinden emin olduktan sonra login sayfasına yönlendiriyoruz
    if(!data.username) return <Redirect to="/login"/>

    return (
        <div>
            Logging out...
        </div>
    )
}

export default LogOut
