interface Card {
  boardId: number;
  listId: number;
  name: string;
  description: string;
  id: number;
  file: string | null;
  created: string;
  deadline: string;
  completed: boolean;
  order: number;
}

export default Card;
