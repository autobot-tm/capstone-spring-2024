import { Avatar, Button, Col, Row } from 'antd';
import React, { useState } from 'react';
import { SubHeading, Paragraph, Caption } from '../../../../components/Typography';
import './FeedBackCustomer.scss';
import { StarFilled } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const FeedBackCustomer = ({ comment }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleComments = showAll ? comment : comment?.slice(0, 4);
  const { t } = useTranslation();
  const handleSeeMore = () => {
    setShowAll(true);
  };

  return (
    <>
      {comment?.length > 0 ? (
        <SubHeading strong>
          {comment?.length} {t('detail-house.comment-dynamic')}
        </SubHeading>
      ) : (
        <SubHeading strong>No comment</SubHeading>
      )}
      {visibleComments?.map((item, index) => (
        <Row key={index} align="stretch" className="cmt-border">
          <Col xs={6} md={4} className="frame-1">
            <Avatar src={item.reviewer?.avatar_url} shape="square" size={100} />
          </Col>
          <Col xs={18} md={20} className="frame-2">
            <Row align="middle">
              <SubHeading style={{ marginRight: 14 }} strong>
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
      {!showAll && comment?.length > 4 && (
        <Row>
          <Col className="see-more-btn" xs={24}>
            <Button onClick={handleSeeMore}>{t('detail-house.see-more-btn')}</Button>
          </Col>
        </Row>
      )}
    </>
  );
};

export default FeedBackCustomer;
