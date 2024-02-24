import { Avatar, Button, Col, Row } from 'antd';
import React, { useState } from 'react';
import { SubHeading, Paragraph, Caption } from '../../../../components/Typography';
import './FeedBackCustomer.scss';
import { StarFilled } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const FeedBackCustomer = ({ comment }) => {
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [expandedComments, setExpandedComments] = useState([]);
  const { t } = useTranslation();

  const handleSeeMoreUsers = () => {
    setShowAllUsers(true);
  };

  const handleSeeMoreComments = index => {
    setExpandedComments(prev => [...prev, index]);
  };

  const renderCommentContent = (comment, index) => {
    if (expandedComments.includes(index)) {
      return <Paragraph>{comment}</Paragraph>;
    } else if (comment.length > 150) {
      return (
        <>
          <Paragraph>
            {comment.substring(0, 150)}...
            <a onClick={() => handleSeeMoreComments(index)} style={{ color: '#f8a11e' }}>
              {t('detail-house.more-comment-btn')}
            </a>
          </Paragraph>
        </>
      );
    } else {
      return <Paragraph>{comment}</Paragraph>;
    }
  };

  const visibleUsers = showAllUsers ? comment : comment?.slice(0, 4);

  return (
    <>
      {comment?.length > 0 ? (
        <SubHeading strong>
          {comment?.length} {t('detail-house.comment-dynamic')}
        </SubHeading>
      ) : (
        <SubHeading strong>{t('detail-house.no-comment')}</SubHeading>
      )}
      <div className="comment-list">
        {visibleUsers?.map((item, index) => (
          <Row key={index} className="cmt-border" gutter={[0, 24]}>
            <Col xs={24} xl={6} md={4} className="frame-1">
              <Avatar src={item.reviewer?.avatar_url} shape="square" size={100} />
            </Col>
            <Col xs={24} xl={18} md={20} className="frame-2">
              <Row align="middle">
                <SubHeading style={{ marginRight: 14 }} strong>
                  {item.reviewer?.first_name}
                </SubHeading>
                <StarFilled />
                <Caption style={{ color: 'black' }} size={140}>
                  &nbsp;{item.rating}
                </Caption>
              </Row>
              <Row className="comment">{renderCommentContent(item.comment, index)}</Row>
            </Col>
          </Row>
        ))}
      </div>
      {!showAllUsers && comment?.length > 4 && (
        <Row>
          <Col className="see-more-btn" xs={24}>
            <Button onClick={handleSeeMoreUsers}>{t('detail-house.see-more-btn')}</Button>
          </Col>
        </Row>
      )}
    </>
  );
};

export default FeedBackCustomer;
