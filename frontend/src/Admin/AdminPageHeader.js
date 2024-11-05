
import React from 'react';
import { Breadcrumb, Button, Row, Col,Tooltip} from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '../Auth/AuthManager';
const AdminPageHeader = ({ adminPageName }) => {
  const { auth,signOut } = useAuth();
  const logout=  async () =>{


  }





  return (
    <Row align="middle" style={{ padding: '0 16px' }}>
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