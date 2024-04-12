import { v4 as uuidv4 } from 'uuid';
import { getPresignedURL } from '../apis/auth.service';

export const mediaUploadService = async files => {
  const uploadPromises = files.map(async file => {
    const { object, presignedURL } = file;
    const formData = new FormData();
    Object.entries(presignedURL?.fields ?? {}).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('file', object);
    return fetch(presignedURL?.url ?? '', {
      method: 'POST',
      body: formData,
      headers: {},
    });
  });
  return Promise.all(uploadPromises);
};

export const getPresignedURLs = async paramFiles => {
  const uploadFiles = paramFiles ?? [];
  const presignedURLs = [];

  for (const file of uploadFiles) {
    const id = uuidv4();
    const fileName = `${id}.${file.name.split('.').pop()}`;
    const fileType =
      file.type.split('/').shift() === 'image' || file.type.split('/').shift() === 'video'
        ? file.type.toUpperCase().split('/').shift()
        : 'OTHER';
    console.log(fileName);
    console.log(fileType);
    const response = await getPresignedURL({
      object_name: fileName,
      object_type: fileType,
    });

    presignedURLs.push({
      object: file,
      presignedURL: response,
    });
  }

  return presignedURLs;
};
