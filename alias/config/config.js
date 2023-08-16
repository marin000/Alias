import { CLOUDINARY_NAME,
  CLOUDINARY_FETCH_URL, 
  CLOUDINARY_UPLOAD_PRESET, 
  WEB_CLIENT_ID, 
  ANDROID_CLIENT_ID,
  GOOGLE_USER_INFO_URL } from '@env'
import { errorMsg } from '../constants/errorMessages';

const checkEnvVariables = () => {
  const { missingCloudinaryName, 
    missingCloudinaryFetchUrl, 
    missingCloudinaryUploadPreset, 
    missingWebClient, 
    missingAndroidClient,
  missingGoogleUserInfoUrl } = errorMsg;

  if (!CLOUDINARY_NAME) {
    throw new Error(missingCloudinaryName);
  } else if (!CLOUDINARY_UPLOAD_PRESET) {
    throw new Error(missingCloudinaryUploadPreset);
  } else if (!CLOUDINARY_FETCH_URL) {
    throw new Error(missingCloudinaryFetchUrl)
  } else if (!WEB_CLIENT_ID) {
    throw new Error(missingWebClient)
  } else if (!ANDROID_CLIENT_ID) {
    throw new Error(missingAndroidClient)
  } else if (!GOOGLE_USER_INFO_URL) {
    throw new Error(missingGoogleUserInfoUrl)
  }
};

const config = {
  cloudinaryName: CLOUDINARY_NAME,
  cloudinaryUploadPreset: CLOUDINARY_UPLOAD_PRESET,
  cloudinaryFetchUrl: CLOUDINARY_FETCH_URL,
  webClientId: WEB_CLIENT_ID,
  androidClientId: ANDROID_CLIENT_ID,
  googleUserInfoUrl: GOOGLE_USER_INFO_URL
};

checkEnvVariables();
export default config;