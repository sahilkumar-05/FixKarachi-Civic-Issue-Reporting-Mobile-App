
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = "issues";

export const saveIssues = async (data:any) => {
 await AsyncStorage.setItem(
  KEY,
  JSON.stringify(data)
 );
};

export const getIssues = async () => {
 const data = await AsyncStorage.getItem(KEY);
 return data ? JSON.parse(data) : [];
};