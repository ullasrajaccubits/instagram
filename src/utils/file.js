const path = require("path");
const { BadRequestException } = require("../helpers/errorResponse");
const CONSTANTS = require("../config/constants");
const {
  FILE: { allowedExtension },
} = CONSTANTS;

exports.fileValidity = (req, res, next) => {
  const files = req.files.file;
  const extensionName = path.extname(files.name);

  if (!allowedExtension.includes(extensionName)) {
    throw new BadRequestException("Please Upload Image");
  }
  const maxSize = 1024 * 1024;
  if (files.size > maxSize) {
    throw new BadRequestException("Please upload image smaller 1MB");
  }
  next();
};
exports.storeFile = async (file) => {
  const name = file.name;
  const pathImage = name.split(".").join("-" + Date.now() + ".");
  const imagePath = path.join(__dirname, "../public/uploads/" + pathImage);

  await file.mv(imagePath);
  return `/uploads/${pathImage}`;
};
