import Card from '@/typings/card';
import axios from 'axios';

export const uploadFile = async function (this: any, card: Card, acceptFile?: File) {
  const formData = new FormData();
  if(acceptFile) {
    formData.append('image', acceptFile);
  }
  
  const { id } = card;
  
  axios
    .post(`/api/upload?card=${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((upload) => {
      this.showNotification('File was sucessfully uploaded', false);
      this.activeCard = upload.data;
    })
    .catch(() => {
      this.showNotification('There was an error uploading file', true);
    });
};
