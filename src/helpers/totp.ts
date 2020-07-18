
export const remainingTime = () => {
  const time = (+new Date());
  const step = 30 * 1000;

  return (time % step);
}
