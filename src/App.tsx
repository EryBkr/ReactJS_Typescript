import React from 'react';
import { Route } from 'react-router';
import SignUp from './components/SignUp';
import { Layout, Menu, Breadcrumb } from 'antd';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Categories from './components/Categories';
import Productst from './components/Productst';
import AppHeader from './components/AppHeader';
import LogOut from './components/LogOut';
const { Header, Content, Footer } = Layout;


function App() {
  return (
    <Layout className="layout">
    <AppHeader/>
    <Content style={{ padding: '50px 50px' }}>
     <Route path="/register" component={SignUp} />
     <Route path="/login" component={Login} />
     {/* PrivateRoute JWT olmadan girelemeyecek sayfaları tanımlar */}
     <PrivateRoute path="/categories" component={Categories} />
     <PrivateRoute path="/products" component={Productst} />
     <PrivateRoute path="/logout" component={LogOut} />
    </Content>
    <Footer style={{ textAlign: 'center' }}>My React App</Footer>
  </Layout>
  );
}

export default App;
