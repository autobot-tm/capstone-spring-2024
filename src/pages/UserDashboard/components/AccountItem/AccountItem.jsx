import { Card } from 'antd';
import React from 'react';
import { Caption, Paragraph } from '../../../../components/Typography';
import styles from './AccountItem.module.scss';
import { useNavigate } from 'react-router-dom';

const AccountItem = ({ title, des, icon, route, auth, type }) => {
  const navigate = useNavigate();
  return (
    <Card
      className={styles.card}
      onClick={() => {
        if (auth !== 'NORMAL' && type === 'password') return;
        navigate(`/${route}`);
      }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {icon}
        {auth !== 'NORMAL' && type === 'password' && <Caption>Disabled</Caption>}
      </div>
      <div className={styles.cardContainer}>
        <Paragraph strong>{title}</Paragraph>
        <Caption size={140}>{des}</Caption>
      </div>
    </Card>
  );
};

export default AccountItem;
