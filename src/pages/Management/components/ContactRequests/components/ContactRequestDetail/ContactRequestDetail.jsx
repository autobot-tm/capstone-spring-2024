import React, { useEffect, useState } from 'react';
import { closeContactRequestDetailModal } from '../../../../../../store/slices/modalSlice';
import { useTranslation } from 'react-i18next';
import CustomModal from '../../../../../../components/Modal/CustomModal';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Image, Row, Table } from 'antd';
import ContactRequestStatus from '../ContactRequestStatus/ContactRequestStatus';
import { getIssueByIdService } from '../../../../../../services/apis/issues.service';
import { setIssueLoading } from '../../../../../../store/slices/issueSlice';
import { LoadingOutlined } from '@ant-design/icons';
import { presignedURLForViewingService } from '../../../../../../services/apis/auth.service';

const ContactRequestDetail = () => {
  const { t } = useTranslation();
  const contactRequestDetailModal = useSelector(state => state.modal.contactRequestDetailModal);
  const contactCategory = useSelector(state => state.modal.contactCategory);
  const issueId = useSelector(state => state.modal.issueId);
  const loading = useSelector(state => state.issue.loading);

  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [resolutioNote, setResolutionNote] = useState('');
  const [images, setImages] = useState([]);
  useEffect(() => {
    if (issueId) {
      getIssueByIdService({ issueId }).then(response => {
        setId(response.id);
        setDescription(response.description);
        setStatus(response.status);
        setResolutionNote(response.resolution_note);
        // Create an array to hold the promises
        const promises = response.attachment_urls.map(url =>
          presignedURLForViewingService({ url }),
        );

        // Resolve all promises concurrently
        Promise.all(promises).then(responses => {
          // Use functional update to update the images state
          setImages([...responses]);
        });
      });
    }
  }, [loading]);

  useEffect(() => {
    if (images) {
      dispatch(setIssueLoading({ loading: false }));
    }
  }, [images]);

  console.log(images);

  // const handleDownload = file => {
  //   const fileUrl = file;
  //   const link = document.createElement('a');
  //   link.href = 'https://' + fileUrl;

  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  const columns = [
    {
      title: t('label.title'),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: t('label.content'),
      dataIndex: 'content',
      key: 'content',
    },
  ];

  const reportData = [
    {
      key: '1',
      title: <b>{'ID'}</b>,
      content: id,
    },
    {
      key: '2',
      title: <b>{t('label.status')}</b>,
      content: <ContactRequestStatus status={status} />,
    },
    {
      key: '3',
      title: <b>{t('label.description')}</b>,
      content: description,
    },
    {
      key: '4',
      title: <b>{t('label.attachments')}</b>,
      content: (
        <Row gutter={[8, 8]}>
          {images.length > 0 ? (
            images.map((image, index) => (
              <Col xs={24} sm={12} key={index}>
                <Image src={image} />
              </Col>
            ))
          ) : (
            <Col>--</Col>
          )}
        </Row>
      ),
    },
    {
      key: '5',
      title: <b>{t('label.resolutionNote')}</b>,
      content: resolutioNote ? resolutioNote : '--',
    },
  ];
  return (
    <CustomModal
      width={650}
      title={
        contactCategory === 'INVOICE_ISSUE'
          ? t('category.invoiceIssue')
          : contactCategory === 'LIVING_ISSUE'
          ? t('category.livingIssue')
          : 'Other'
      }
      nameOfModal={contactRequestDetailModal}
      action={closeContactRequestDetailModal}
      footer={null}>
      {loading ? (
        <div className="loading-container">
          <LoadingOutlined size="large" />
        </div>
      ) : (
        <Table columns={columns} dataSource={reportData} pagination={false} />
      )}
    </CustomModal>
  );
};

export default ContactRequestDetail;
