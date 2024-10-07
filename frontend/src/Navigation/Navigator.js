import React,{ useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link,Navigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import 'antd/dist/reset.css'; 
import PatientInsertion from '../Tabs/PatientInsertion';
import StatisticsBySurgeryType from '../Tabs/StatisticsBySurgeryType';
import StatisticsByOrgan from '../Tabs/StatisticsByOrgan';
import PatientsList from '../Tabs/PatientsList';
const Navigator = () => {
    const { Header, Content, Footer } = Layout; 
   
    // Retrieve the last selected tab from localStorage, default to 'patientInsertion'
    const [current, setCurrent] = useState(localStorage.getItem('selectedTab') || 'patientInsertion');
    const changeTab = (e) => {
      console.log('click ', e);
      setCurrent(e.key);
      localStorage.setItem('selectedTab', e.key);
    };
    useEffect (() => {
      // Check if a stored tab is present in localStorage and update state on component mount
      const savedTab = localStorage.getItem('selectedTab');
      if (savedTab) {
          setCurrent(savedTab);
      }
                   }, []);


    return (
        <Router>
          <Layout>
            <Header>
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
            </Header>
            <Content style={{ padding: '20px' }}>
              <Routes>
                <Route path="/" element={<Navigate to="/patientInsertion"  state={{submittedData: null}}/>} />
                <Route path="/patientInsertion" element={<PatientInsertion />} />
                <Route path="/patientsList" element={<PatientsList />} />
                <Route path="/statisticsByOrgan" element={<StatisticsByOrgan />} />
                <Route path="/statisticsBySurgeryType" element={<StatisticsBySurgeryType />} />
              </Routes>
            </Content>
            <Footer style={{ textAlign: 'center' }}>©2024 Δημιουργήθηκε από ΓΕΠ</Footer>
          </Layout>
        </Router>
      );



}






export default Navigator;