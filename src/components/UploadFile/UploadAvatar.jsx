import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getPresignedURLs, mediaUploadService } from '../../services/media';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const UploadAvatar = ({ acceptTypes, multiple, onChange }) => {
  const { t } = useTranslation();
  const [fileList, setFileList] = useState([]);
  const { access_token } = useSelector(state => state.auth);

  const beforeUpload = async file => {
    try {
      if (access_token) {
        const newFileList = [...fileList, file];
        setFileList(newFileList);

        if (!multiple && newFileList.length > 1) {
          message.error('You can only upload one file.');
          setFileList([]);
          return false;
        }

        const presignedURLs = await getPresignedURLs(newFileList);
        await mediaUploadService(presignedURLs);

        const fileUrls = presignedURLs.map(url => `https://${url.presignedURL.cdn_url}`);
        onChange(multiple ? fileUrls : fileUrls[0]);
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      message.error('An error occurred while uploading files. Please try again later.');
      setFileList([]);
    }

    return false;
  };

  const handleRemove = file => {
    const index = fileList.indexOf(file);
    const newFileList = [...fileList];
    newFileList.splice(index, 1);
    setFileList(newFileList);
  };

  const uploadProps = {
    accept: acceptTypes,
    fileList,
    onRemove: handleRemove,
    beforeUpload,
  };

  return (
    <div id="upload-file-container">
      <Upload {...uploadProps} showUploadList={false}>
        <Button className="custom-upload-button" icon={<UploadOutlined />}>
          {t('select-file')}
        </Button>
      </Upload>
    </div>
  );
};

export default UploadAvatar;
