import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';  
import reportWebVitals from './reportWebVitals';
import { ConfigProvider} from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/el'


import el_GR from 'antd/locale/el_GR';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Provider store={store}>
  
    <ConfigProvider locale={el_GR}>
    <App />
    </ConfigProvider>
    
  </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
