import React,{ useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link,Navigate,useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';
import { AuthManager } from '../Auth/AuthManager';
import { Layout, Menu } from 'antd';
import 'antd/dist/reset.css'; 
import  {setTab}  from '../redux/reducers/tabSlice';
import PatientInsertion from '../Tabs/PatientInsertion';
import StatisticsBySurgeryType from '../Tabs/StatisticsBySurgeryType';
import StatisticsByOrgan from '../Tabs/StatisticsByOrgan';
import PatientsList from '../Tabs/PatientsList';
import LoginForm from '../Admin/LoginForm';
import AdminPanel from '../Admin/AdminPanel';
const Navigator = () => {
    const { Header, Content, Footer } = Layout; 
    
    const current = useSelector((state) => state.tab.selectedTab);
    const dispatch = useDispatch();
    
    
    
    
    const changeTab = (e) => {
      dispatch(setTab(e.key)); // call redux setTab for change current tab and store it in local storage
    };
    useEffect (() => {
       console.log(window.location.pathname); 
      let url_loc =window.location.pathname.substring(1);
      if (!url_loc.startsWith("admin")){


        // Check if a stored tab is present in localStorage and update state on component mount
        let savedTab = localStorage.getItem('selectedTab');
        if (savedTab != url_loc){
            savedTab = url_loc;
        }
        if (savedTab) {
          dispatch(setTab(savedTab));
        }
    }
                   }, []);


    return (
       <AuthManager>
        <Router>
          <Layout>
            {window.location.pathname.startsWith("/admin/") ? null:<Header>
              <div className="logo" />
              <Menu onClick={changeTab} theme="dark" mode="horizontal" selectedKeys={current}>
                <Menu.Item key="patientInsertion">
                  <Link to="/patientInsertion" state={{ submittedData: null }}>Εισαγωγή Ασθενή</Link>
                </Menu.Item>
                <Menu.Item key="patientsList">
                  <Link to="/patientsList">Λίστα Ασθενών</Link>
                </Menu.Item>
                <Menu.Item key="statisticsByOrgan">
                  <Link to="/statisticsByOrgan">Στατιστικά ανά ανατομική περιοχή</Link>
                </Menu.Item>
                <Menu.Item key="statisticsBySurgeryType">
                  <Link to="/statisticsBySurgeryType">Στατιστικά ανά τύπο επέμβασης</Link>
                </Menu.Item>
              </Menu>
            </Header>}
            <Content style={{ padding: '20px' }}>
              <Routes>
                <Route path="/" element={<Navigate to={'/'+`${current}`}  state={{submittedData: null}}/>} />
                <Route path="/patientInsertion" element={<PatientInsertion />} />
                <Route path="/patientsList" element={<PatientsList />} />
                <Route path="/statisticsByOrgan" element={<StatisticsByOrgan />} />
                <Route path="/statisticsBySurgeryType" element={<StatisticsBySurgeryType />} />
                <Route path="/admin/login" element={<LoginForm/>} />
                <Route element={<ProtectedRoute />}>
                    <Route  path="/admin/manage" element={<AdminPanel/>} />
                </Route>
                <Route path="*" element={<Navigate to={'/'+`${current}`} />}/>
              </Routes>
            </Content>
            <Footer style={{ textAlign: 'center' }}>©2024 Δημιουργήθηκε από ΓΕΠ</Footer>
          </Layout>
        </Router>
        </AuthManager>
      );



}






export default Navigator;