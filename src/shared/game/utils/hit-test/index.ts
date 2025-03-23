export const hitTest = (object: any, point: any) => {
  const bounds = object.getBounds();
  return (
    point.x >= bounds.x &&
    point.x <= bounds.x + bounds.width &&
    point.y >= bounds.y &&
    point.y <= bounds.y + bounds.height
  );
};
