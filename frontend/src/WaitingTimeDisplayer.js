import React, { useEffect, useState } from 'react';
import { Button, Result } from 'antd';
import {InfoCircleOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getWaitingTime } from './services/serviceAPI';

/*
#1677ff up tp 3
 up to 5 #faad14
 >5 #ff4d4f

*/


const WaitingTimeDisplayer  = ({surgeryId,examDate}) => {
    const navigate = useNavigate();
    const [waitingTime,setWaitingTime] =useState(-1);
    
    useEffect(() => {
        const fetchWaitingTime = async () => {
                console.log(examDate)
                const estimatedTime = await getWaitingTime(surgeryId,examDate);
                console.log(estimatedTime);
                setWaitingTime(estimatedTime);

        }

        if (waitingTime == -1){
            fetchWaitingTime();
            //console.log(surgeryId)
        }

    }, [waitingTime]);

    const getColorByStatus = (t) =>{
        const NORMAL_COLOR ="#1677ff";
        const WARNING_COLOR = "#faad14";
        const DANGER_COLOR ="#ff4d4f" ;
        if (t<=3){
            return NORMAL_COLOR
          }
          else if (t<=5){
            return WARNING_COLOR
          }
          else{
            return DANGER_COLOR
          }


    }

    return(<Result
    status="info"
    icon={<InfoCircleOutlined style={{ color:getColorByStatus(waitingTime)}} />}
    title="Υπολογισμός Χρόνου Αναμονής"
    subTitle={`Ο εκτιμώμενος χρόνος αναμονής είναι ${waitingTime}  ${waitingTime < 2 ? 'μήνας' : 'μήνες'}`}
    extra={<Button type="primary" onClick={() => navigate('/', { state: { submittedData: null } })}>Επιστροφή</Button>}
    />
    );
}


export default WaitingTimeDisplayer;