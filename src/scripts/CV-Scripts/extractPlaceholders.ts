type PlaceholderItem = Record<string, any>;

const extractPlaceholders = <T extends PlaceholderItem>(
  array: T[],
  placeholders: Partial<T>,
  keys: (keyof T)[]
): T[] => {
  return array.map((item) => {
    const updatedItem = { ...item }; // Copy the object

    keys.forEach((key) => {
      if (!updatedItem[key] || (typeof updatedItem[key] === 'string' && updatedItem[key].length < 1)) {
        updatedItem[key] = placeholders[key] as T[keyof T]; // Replace with placeholder
      }
    });

    return updatedItem;
  });
};

export default extractPlaceholders;