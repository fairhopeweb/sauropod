import iconList from '../data/icons.json';

export const getIcons = () => {
  return iconList;
};

export const findIconFor = (name : string) => {
  const n = name.toLowerCase();

  if (getIcons().includes(`/icons/color-${n}.svg`)) {
    return `/icons/color-${n}.svg`;
  } 
  return `/icons/0_unknown.svg`;
}