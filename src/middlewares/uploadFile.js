const multer = require('multer');
const { temporaryAvatarsFolder, MAX_AVATAR_SIZE } = require('../helpers/constants');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, temporaryAvatarsFolder);
  },
    filename: function (req, file, cb) {
    const name = file.originalname;
    cb(null, name);
  },
});

const uploadAvatarMiddleware = multer({
  storage,
  limits: { fileSize: MAX_AVATAR_SIZE },
    fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, true);
      return;
    }
    cb(null, false);
  },
});


module.exports = {
  uploadAvatarMiddleware,
};
