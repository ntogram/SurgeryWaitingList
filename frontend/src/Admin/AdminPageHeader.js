import React from 'react';
import {Breadcrumb} from "antd"



const AdminPageHeader = ({adminPageName}) => {


return <Breadcrumb
items={[
  {
    title: 'Περιβάλλον Διαχειριστή',
  },
 
  {
    title: adminPageName,
  },
]}
/>


}

export default AdminPageHeader;