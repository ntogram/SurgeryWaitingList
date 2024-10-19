import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getColorByStatus  from './redux/constantsSlice';
import { Button, Result } from 'antd';
import {InfoCircleOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getWaitingTime } from './services/serviceAPI';

/*
#1677ff up tp 3
 up to 5 #faad14
 >5 #ff4d4f

*/


const WaitingTimeDisplayer  = ({surgeryId}) => {
    const navigate = useNavigate();
    const [waitingTime,setWaitingTime] =useState(-1);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchWaitingTime = async () => {
                const estimatedTime = await getWaitingTime(surgeryId);
               console.log(estimatedTime);
                setWaitingTime(estimatedTime);

        }

        if (waitingTime == -1){
            fetchWaitingTime();
            //console.log(surgeryId)
        }

    }, [waitingTime]);



    return(<Result
    status="info"
    icon={<InfoCircleOutlined style={{ color:dispatch(getColorByStatus(waitingTime))}} />}
    title="Υπολογισμός Χρόνου Αναμονής"
    subTitle={`Ο εκτιμώμενος χρόνος αναμονής είναι ${waitingTime}  ${waitingTime < 2 ? 'μήνας' : 'μήνες'}`}
    extra={<Button type="primary" onClick={() => navigate('/', { state: { submittedData: null } })}>Επιστροφή</Button>}
    />
    );
}


export default WaitingTimeDisplayer;