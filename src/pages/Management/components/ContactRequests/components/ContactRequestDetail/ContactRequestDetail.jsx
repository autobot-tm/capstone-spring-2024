import React, { useEffect, useState } from 'react';
import { closeContactRequestDetailModal } from '../../../../../../store/slices/modalSlice';
import { useTranslation } from 'react-i18next';
import CustomModal from '../../../../../../components/Modal/CustomModal';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table } from 'antd';
import ContactRequestStatus from '../ContactRequestStatus/ContactRequestStatus';
import { getIssueByIdService } from '../../../../../../services/apis/issues.service';
import { setIssueLoading } from '../../../../../../store/slices/issueSlice';
import { DownloadOutlined, LoadingOutlined } from '@ant-design/icons';

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
  const [files, setFiles] = useState([]);
  useEffect(() => {
    if (issueId) {
      getIssueByIdService({ issueId }).then(response => {
        setId(response.id);
        setDescription(response.description);
        setStatus(response.status);
        setResolutionNote(response.resolution_note);
        setFiles(response.attachment_urls);
        dispatch(setIssueLoading({ loading: false }));
      });
    }
  }, [loading]);

  const handleDownload = file => {
    const fileUrl = file;
    const link = document.createElement('a');
    link.href = 'https://' + fileUrl;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
      content:
        files.length > 0
          ? files.map((file, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div>{file.slice(73)}</div>
                <Button
                  size="small"
                  icon={<DownloadOutlined />}
                  onClick={() => {
                    handleDownload(file);
                  }}>
                  Download
                </Button>
              </div>
            ))
          : '--',
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
