import {launchCamera} from 'react-native-image-picker';

export const openCamera = (cb:any) => {
 launchCamera(
  {
   mediaType: 'photo',
   quality: 0.7
  },
  (res) => {
   if(res.assets){
    cb(res.assets[0].uri);
   }
  }
 );
};