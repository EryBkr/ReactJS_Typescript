import { Menu } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { AppState } from '../store';
import { isLoggedIn } from '../store/actions/userActions';

function AppHeader() {

    //Action için ekledik
    const dispatch=useDispatch();

    //Redux tarafında ki State e ulaşıyorum.
    const {data,loading,error}=useSelector((state:AppState)=>state.user);

    //URL Bilgisine ulaşmak için ekledik
    const location=useLocation();

    //component çalışır çalışmaz isLoggedIn ile istek atıyorum erişiyorum
    useEffect(()=>{
      //isLoggedIn kullanıcının tokenını kullanarak giriş yapıp yapmadığını anlar
      //AppHeader yüklendiğinde state içerisinde data olup olmama durumuna göre kontrol ediilir
      dispatch(isLoggedIn());  
    },[]);

    return (
        <Header>
            <div className="logo" />
         {/* url den aldığımız path name sayesında seçili menü elemanının arkasını active hale getirebiliyoruz */}
         <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
             {
                 //data dolu ise menüleri göster yok ise gösterme
                 data.username ? (<>
                   <Menu.Item key="/categories"> <Link to="/categories">Kategori</Link></Menu.Item>
                   <Menu.Item key="/products"><Link to="/products">Products</Link></Menu.Item>
                   <Menu.Item key="/logout"><Link to="/logout">Çıkış</Link></Menu.Item>
                    </>
                 ) :
                 //yüklenme esnasında Giriş buttonu gözükmesin 
                 ( loading ? null :<Menu.Item key="/login"><Link to="/login">Giriş</Link></Menu.Item>)
             }
         </Menu>
      </Header>
    )
}

export default AppHeader
