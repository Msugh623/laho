import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
import fs from "fs";
import path from "path";
import rootdirname from "../rootdirname";

config({ quiet: true });

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLDKEY,
  api_secret: process.env.CLDSECRETE,
});

/**
 * Uploads a single file to Cloudinary.
 * @param {string} filePath - The local path of the file to upload.
 * @param {object} options - Optional Cloudinary upload options.
 * @returns {Promise<object>} - An object containing the file's URL, public ID, and type.
 */
export async function uploadFile(filePath, options = {}) {
  try {
    const ext = filePath.split(".").pop().toLowerCase();
    const isVideo = ["mp4", "mov", "avi", "mkv", "webm"].includes(ext);
    const isImage = ["jpg", "jpeg", "png", "webp", "gif", "bmp", "tiff"].includes(ext); 
    let transformations = {};
    let uploadOptions = { ...options };

    if (isImage) {
      transformations = {
        quality: "auto:eco",
        fetch_format: "webp",
        width: 900,
        crop: "limit",
      };
    } else if (isVideo) {
      transformations = {
        quality: "auto:eco",
        width: 720,
        crop: "limit",
        bit_rate: "500k",
      };
      // Explicitly set resource_type for videos to prevent 'invalid image' error.
      uploadOptions.resource_type = "video";
    }

    const result = await cloudinary.uploader.upload(filePath, {
      ...transformations,
      ...uploadOptions,
    });
 
    return {
      url: result.secure_url,
      id: result.public_id,
      type:
        result.resource_type === "raw"
          ? result.type
          : result.format
          ? `${result.resource_type}/${result.format}`
          : result.resource_type,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error?.message || error?.error?.message || error;
  }
}

/**
 * Deletes a single file from Cloudinary by its public ID.
 * @param {string} publicId - The public ID of the file to delete.
 * @param {object} options - Optional Cloudinary destroy options.
 * @returns {Promise<object>} - The result of the deletion operation.
 */
export async function deleteFile(publicId, options = {}) {
  try {
    const result = await cloudinary.uploader.destroy(publicId, options);
    return result;
  } catch (error) {
    console.error("Cloudinary deletion error:", error);
    throw error?.message || error?.error?.message || error;
  }
}

/**
 * Uploads multiple files to Cloudinary concurrently.
 * @param {string[]} filePaths - An array of local file paths to upload.
 * @param {object} options - Optional Cloudinary upload options for all files.
 * @returns {Promise<object[]>} - An array of results for each uploaded file.
 */
export async function uploadManyFiles(filePaths, options = {}) {
  try {
    const uploadPromises = filePaths.map((filePath) =>
      uploadFile(filePath, options)
    );
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error("Cloudinary bulk upload error:", error);
    throw error?.message || error?.error?.message || error;
  }
}

/**
 * Deletes multiple files from Cloudinary concurrently by their public IDs.
 * @param {string[]} publicIds - An array of public IDs of the files to delete.
 * @param {object} options - Optional Cloudinary destroy options for all files.
 * @returns {Promise<object[]>} - An array of results for each deletion operation.
 */
export async function deleteManyFiles(publicIds, options = {}) {
  try {
    const deletePromises = publicIds.map((publicId) =>
      deleteFile(publicId, options)
    );
    return await Promise.all(deletePromises);
  } catch (error) {
    console.error("Cloudinary bulk deletion error:", error);
    throw error?.message || error?.error?.message || error;
  }
}