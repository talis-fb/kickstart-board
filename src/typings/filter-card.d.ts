import Card from './card';

interface FilterCard {
  fieldFilter: keyof Card;
  value: string;
}

export default FilterCard;
