export const findById = (anonces, id) => {
  for (let i = 0; i < anonces.length; i++) {
    if (anonces[i].idAnonce == id) return anonces[i];
  }
  return null;
};
