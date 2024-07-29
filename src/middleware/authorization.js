import jwt from "jsonwebtoken";

export const verifyToken = (roleId) => (req, res, next) => {
  try {
    // validasi: jika roleId tidak ada
    if (!roleId) {
      return res.status(400).json({
        status: "error",
        message: "parameter (roleId) tidak ada",
      });
    }

    // validasi: jika roleId tidak valid
    if (!Number.isInteger(roleId) || roleId < 0) {
      return res.status(400).json({
        status: "error",
        message: "parameter (roleId) tidak valid",
      });
    }

    // ambil token dari req.headers
    const token = req.headers.authorization?.split(" ")[1];

    // validasi: jika token tidak ada
    if (!token) {
      return res.status(401).json({ status: "error", message: "Unauthorized" });
    }

    // verifikasi token
    // v.1
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (error, decoded) => {
      // validasi: jika error
      if (error) {
        return res.status(403).json({
          status: "error",
          message: error.message,
        });
      }

      // validasi: jika roleId tidak ada atau roleId tidak sama
      if (!decoded.roleId || decoded.roleId !== roleId) {
        return res.status(403).json({
          status: "error",
          message: "Akses ditolak, role tidak sesuai",
        });
      }

      // membuat peroperti user pada object req
      req.user = decoded;

      next();
    });

    // v.2
    // const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    // req.user = decoded;
    // next();
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};
