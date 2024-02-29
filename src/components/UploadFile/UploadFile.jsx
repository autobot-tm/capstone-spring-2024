import { Button, Upload } from 'antd';
import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { getPresignedURLs, mediaUploadService } from '../../services/media';
import './style.scss';

const UploadFile = ({ acceptTypes }) => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const handleUpload = async () => {
    setUploading(true);
    const presignedURLs = await getPresignedURLs(fileList);
    console.log(presignedURLs);
    await mediaUploadService(presignedURLs);
    setFileList([]);
    setUploading(false);
  };

  const props = {
    accept: acceptTypes,
    onRemove: file => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: file => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
    listType: 'picture',
  };
  return (
    <div id="upload-file-container">
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button type="primary" onClick={handleUpload} disabled={fileList.length === 0}>
        {uploading ? 'Uploading' : 'Upload'}
      </Button>
    </div>
  );
};

export default UploadFile;
