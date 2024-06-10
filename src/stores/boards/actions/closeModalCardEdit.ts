import Card from '@/typings/card';

export const closeModalCardEdit = async function (this: any, cardId: Card['id']) {
  this.activeCard = {};
  this.modalEditCard.show = false;
};
