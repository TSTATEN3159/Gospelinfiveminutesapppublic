import { registerPlugin } from '@capacitor/core';

export interface BackgroundImagePickerPlugin {
  pickImage(): Promise<{ fileUrl: string }>;
}

const BackgroundImagePicker = registerPlugin<BackgroundImagePickerPlugin>(
  'BackgroundImagePicker'
);

export default BackgroundImagePicker;
