import AsyncStorage from '@react-native-async-storage/async-storage';
import { errorMsg } from '../constants/errorMessages';

const TOKEN_KEY = 'auth_token';

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error(errorMsg.storingToken, error);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return token;
  } catch (error) {
    console.error(errorMsg.gettingToken, error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error(errorMsg.removingToken, error);
  }
};