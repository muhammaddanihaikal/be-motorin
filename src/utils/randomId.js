import { customAlphabet } from "nanoid";

// buat random id
export const generateRandomId = (length) => {
  const alphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
  const nanoid = customAlphabet(alphabet, length);
  return nanoid();
};
