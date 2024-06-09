import Card from '@/typings/card';
import axios from 'axios';

export const showModalCardEdit = async function (this: any, cardId: Card['id']) {
  await axios
    .get(`/api/cards/${cardId}`)
    .then(({ data }) => {
      this.activeCard = data;
      this.modalEditCard.show = true;
    })
    .catch(() => {
      this.activeCard = {};
      this.modalEditCard.show = false;
      this.showNotification(`Card with id: ${cardId} was not found`, true);
    });
};
