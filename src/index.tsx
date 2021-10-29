import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//antd ui paketini ekledik
import 'antd/dist/antd.css';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './store';
import thunk from 'redux-thunk';
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";

//Store ve thunk tanımlaması yapıldı
const store=createStore(rootReducer,applyMiddleware(thunk));


ReactDOM.render(
  <Provider store={store}>
   <Router>
     <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

