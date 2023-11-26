import { v2 as cloudinary } from "cloudinary";
import { CloudinaryError } from "../middlewares/error/cloudinary.exceptions";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export async function uploadPhotoArray(images: string[]) {
  try {
    let results: string[] = [];
    for (const image of images) {
      const result = await cloudinary.uploader.upload(image);
      results.push(result.url);
    }
    return results;
  } catch (error) {
    throw new CloudinaryError({
      name: "UPLOAD_PHOTO_ERROR",
      message: `Error during updating photo: ${error}`,
    });
  }
}
export async function uploadPhoto(image: string) {
  try {
    const result = await cloudinary.uploader.upload(image);
    return result.url;
  } catch (error) {
    throw new CloudinaryError({
      name: "UPLOAD_PHOTO_ERROR",
      message: `Error during updating photo: ${error}`,
    });
  }
}
export { cloudinary };
