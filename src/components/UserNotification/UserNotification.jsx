import React from 'react';
import { BellOutlined } from '@ant-design/icons';
import { Badge, Space } from 'antd';

const UserNotification = ({ numbers }) => {
  return (
    <Space size="middle">
      <Badge count={numbers}>
        <BellOutlined style={{ fontSize: 20 }} />
      </Badge>
    </Space>
  );
};

export default UserNotification;
