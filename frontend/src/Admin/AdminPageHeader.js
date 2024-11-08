
import React from 'react';
import axios from 'axios'; 
import { Breadcrumb, Button, Row, Col,Tooltip,notification} from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '../Auth/AuthManager';
const AdminPageHeader = ({ adminPageName }) => {
  const { auth,signOut,hasValidokens,refreshSession} = useAuth();
  const [api, contextHolder] = notification.useNotification();
  const logout=  async () =>{
      // check  tokens validity
      const tokenValidity=hasValidokens(auth.accessToken,auth.refreshToken);
      // acess token expired refresh it
      let access_token = auth.accessToken;
      let refresh_token =  auth.refreshToken;
      if (tokenValidity == 2){
        access_token = await refreshSession(refresh_token);
      }
      // call operation for sign out
      const response= await signOut(access_token,refresh_token);
     
    }
  





  return (
    <Row align="middle" style={{ padding: '0 16px' }}>
      {contextHolder}
      {/* Breadcrumb Column (90%) */}
      <Col flex="95%">
        <Breadcrumb
          items={[
            {
              title: 'Περιβάλλον Διαχειριστή',
            },
            {
              title: adminPageName,
            },
          ]}
        />
      </Col>

      {/* Logoff Button Column (10%) */}
      {adminPageName === "Επεξεργασία" && (
      <Col flex="5%" style={{ textAlign: 'right' }}>
      <Tooltip placement="bottom" arrow={false} title={"Αποσύνδεση"}>
        <Button ghost color='danger' variant="link"  shape='circle'
           size={'large'}
          icon={<LogoutOutlined />}
          onClick={logout}
        >
          
        </Button>
        </Tooltip>
      </Col>)}
    </Row>
  );
};

export default AdminPageHeader;