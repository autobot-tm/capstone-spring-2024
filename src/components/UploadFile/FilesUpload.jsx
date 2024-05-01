import React, { useRef, useImperativeHandle, forwardRef, useState } from 'react';
import { Button, Upload, message } from 'antd';
import { mediaUploadService, getPresignedURLs } from '../../services/media';
import { useTranslation } from 'react-i18next';
import { UploadOutlined } from '@ant-design/icons';
import { AcceptedMediaTypes, MediaCategories } from '../../constants/media.constant';

const FileUploader = forwardRef((props, ref) => {
  const inputRef = useRef();
  const [files, setFiles] = useState([]);
  const { t } = useTranslation();
  const { acceptTypes = [AcceptedMediaTypes[MediaCategories.OTHER]], limit } = props;

  const propsData = {
    accept: acceptTypes?.join(', '),
    onRemove: file => {
      const { uid } = file;
      const newFileList = files.filter(file => file.uid !== uid);
      setFiles(newFileList);
    },
    beforeUpload: file => {
      if (files.length >= limit) {
        message.error(t('error-validate-length-upload-file'));
        return false;
      }
      setFiles([...files, file]);
      return false;
    },
    onchange: info => {
      console.error('🚀 ~ FileUploader ~ info:', info);
    },
    maxCount: limit,
  };

  const uploadFiles = async () => {
    if (!files.length) {
      return [];
      // throw new Error(t('fileUploader.empty'));
    }
    const presignedURLs = await getPresignedURLs(files);
    await mediaUploadService(presignedURLs);

    const urls = presignedURLs?.map(response => response?.presignedURL?.cdn_url);
    setFiles([]);
    return urls;
  };

  useImperativeHandle(ref, () => ({
    upload: uploadFiles,
    files,
  }));

  return (
    <Upload {...propsData} ref={inputRef}>
      <Button className="custom-upload-button" icon={<UploadOutlined />}>
        {t('select-file')}
      </Button>
    </Upload>
  );
});

FileUploader.displayName = 'FileUploader';
export default FileUploader;
