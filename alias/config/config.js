import { CLOUDINARY_NAME, CLOUDINARY_FETCH_URL, CLOUDINARY_UPLOAD_PRESET, ADMIN_EMAIL } from '@env'
import { errorMsg } from '../constants/errorMessages';

const checkEnvVariables = () => {
  const { missingCloudinaryName,
    missingCloudinaryFetchUrl,
    missingCloudinaryUploadPreset,
    missingAdminEmail } = errorMsg;

  if (!ADMIN_EMAIL) {
    throw new Error(missingAdminEmail)
  } else if (!CLOUDINARY_NAME) {
    throw new Error(missingCloudinaryName);
  } else if (!CLOUDINARY_UPLOAD_PRESET) {
    throw new Error(missingCloudinaryUploadPreset);
  } else if (!CLOUDINARY_FETCH_URL) {
    throw new Error(missingCloudinaryFetchUrl)
  }
};

const config = {
  cloudinaryName: CLOUDINARY_NAME,
  cloudinaryUploadPreset: CLOUDINARY_UPLOAD_PRESET,
  cloudinaryFetchUrl: CLOUDINARY_FETCH_URL,
  adminEmail: ADMIN_EMAIL
};

checkEnvVariables();
export default config;