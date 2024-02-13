import { Avatar, Col, Row } from 'antd';
import React from 'react';
import { SubHeading, Paragraph, Caption } from '../Typography';
import './FeedBackCustomer.scss';
import { StarFilled } from '@ant-design/icons';

const FeedBackCustomer = ({ comment }) => {
  return (
    <>
      {comment.map((item, index) => (
        <Row key={index} align="stretch" className="cmt-border">
          <Col xs={6} md={4} className="frame-1">
            <Avatar src={item.reviewer?.avatar_url} shape="square" size={100} />
          </Col>
          <Col xs={18} md={20} className="frame-2">
            <Row>
              <SubHeading style={{ marginRight: 10 }} strong>
                {item.reviewer?.first_name}
              </SubHeading>
              <StarFilled />
              <Caption style={{ color: 'black' }} size={140}>
                &nbsp;{item.rating}
              </Caption>
            </Row>
            <Row className="comment">
              <Paragraph>{item.comment}</Paragraph>
            </Row>
          </Col>
        </Row>
      ))}
    </>
  );
};

export default FeedBackCustomer;
