import { Button, Upload, message } from 'antd';
import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { getPresignedURLs, mediaUploadService } from '../../services/media';
import './style.scss';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const UploadFile = ({ acceptTypes, multiple, onChange }) => {
  const { t } = useTranslation();
  const { access_token } = useSelector(state => state.auth);
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (access_token) {
      setUploading(true);
      const presignedURLs = await getPresignedURLs(fileList);
      await mediaUploadService(presignedURLs);
      console.log('presignedURLs', presignedURLs);

      const firstPresignedURL = multiple ? presignedURLs : [presignedURLs[0]];
      if (multiple) {
        const fileUrls = firstPresignedURL?.map(url => `https://${url.presignedURL.cdn_url}`);
        onChange(fileUrls);
      } else {
        for (const url of firstPresignedURL) {
          const uploadUrl = url.presignedURL.cdn_url;
          const avatarUrl = `https://${uploadUrl}`;
          onChange(avatarUrl);
        }
      }
    }

    setFileList([]);
    setUploading(false);
  };

  const beforeUpload = file => {
    if (!multiple && fileList.length > 0) {
      message.error(t('alert-1-file'));
      return false;
    }

    setFileList([...fileList, file]);
    return false;
  };

  const props = {
    accept: acceptTypes,
    onRemove: file => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: beforeUpload,
    fileList,
    listType: 'picture',
  };

  return (
    <div id="upload-file-container">
      <Upload {...props}>
        <Button className="custom-upload-button" icon={<UploadOutlined />}>
          {t('select-file')}
        </Button>
      </Upload>
      <Button type="primary" onClick={handleUpload} disabled={fileList.length === 0}>
        {uploading ? `${t('uploading-status')}` : `${t('upload-status')}`}
      </Button>
    </div>
  );
};

export default UploadFile;
