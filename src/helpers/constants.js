const path = require('path');

const statusCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

const temporaryAvatarsFolder = path.join(process.cwd(), process.env.UPLOAD_DIR);


const finalAvatarsFolder = path.join(
  process.cwd(),
  'public',
  process.env.AVATARS_FOLDER
);

const MAX_AVATAR_SIZE = 5000000;


module.exports = {
  statusCode,
  temporaryAvatarsFolder,
  finalAvatarsFolder,
  MAX_AVATAR_SIZE,
};
