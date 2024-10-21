import React,{useState} from 'react'
import {Button} from 'antd';
import {ReloadOutlined} from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux';
import {setRefreshTab,setTab} from '../../redux/reducers/tabSlice';

const RefreshButton = ({refreshDateTime}) =>{
    const current = useSelector((state) => state.tab.selectedTab);
    const dispatch = useDispatch();
    const refresh = () => {
        console.log(current)
        refreshDateTime(new Date());
        dispatch(setRefreshTab(current));
        
        // // Update state with new date and time
      };
    return <Button shape="circle" color="primary" variant="link" icon={<ReloadOutlined/>} onClick={refresh}/>


}

export default RefreshButton;

