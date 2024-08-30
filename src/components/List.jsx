export function updateList(id, text, array) {
  return array.map((val) => {
    if (id === val.id) {
      return { ...val, title: text };
    }
    const updatedPerest = updateList(
      id,
      text,
      array.filter((item) => item.parentId === val.id)
    );
    return { ...val, perest: updatedPerest };
  });
}

export function deleteItemList(id, array) {
  return array.filter((val) => val.id !== id && val.parentId !== id);
}

export function addList(parentId, newObj, array) {
  return [...array, { ...newObj, parentId }];
}

export function moveTask(id, array, direction) {
  const index = array.findIndex((item) => item.id === id);
  if (index === -1) return array;

  const newArray = [...array];
  const [movedItem] = newArray.splice(index, 1);

  if (direction === "up" && index > 0) {
    newArray.splice(index - 1, 0, movedItem);
  } else if (direction === "down" && index < newArray.length + 1) {
    newArray.splice(index + 1, 0, movedItem);
  }

  return newArray;
}
