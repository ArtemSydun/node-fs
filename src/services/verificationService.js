const { createHmac } = require("node:crypto");
const { Verification } = require("../model/verificationModel");

const generateHash = (userParam) => {
  const secret = "sssdyun";
  const hashedCode = createHmac("sha256", `${secret}`)
    .update(`${userParam}-${Date.now()}`)
    .digest("hex");
  return hashedCode;
};

const createVerificationCode = async (userId) => {
  removeUserVerificationsCode(userId);
  const hashedCode = generateHash(userId);
  const newVerificationCode = new Verification({
    code: hashedCode,
    active: true,
    userId,
  });

  return newVerificationCode;
};


const removeUserVerificationsCode = async (userId) => {
  await Verification.deleteMany({ active: false, userId });
};

module.exports = { createVerificationCode, generateHash };
