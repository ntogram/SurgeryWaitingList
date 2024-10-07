import React, { useEffect, useState } from 'react';
import { Button, Result } from 'antd';
import {InfoCircleOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';




const WaitingTimeDisplayer  = () => {
    const navigate = useNavigate();

    return(<Result
    status="info"
    icon={<InfoCircleOutlined />}
    title="Υπολογισμός Χρόνου Αναμονής"
    subTitle="Ο εκτιμώμενος χρόνος αναμονής είναι ΧΧ ΥΥΥΥ"
    extra={<Button type="primary" onClick={() => navigate('/', { state: { submittedData: null } })}>Επιστροφή</Button>}
    />
    );
}


export default WaitingTimeDisplayer;