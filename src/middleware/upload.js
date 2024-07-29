import multer from "multer";

// file disimpan di memory sementara
const memoryStorage = multer.memoryStorage();
const upload = multer({ memoryStorage });

export { upload };
