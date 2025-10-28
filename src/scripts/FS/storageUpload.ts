import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  UploadMetadata,
  UploadTaskSnapshot,
  StorageError
} from "firebase/storage";
import { storage } from "./init/InitFirebase";

interface StorageUploadParams {
  path: string;
  file: Blob | Uint8Array | ArrayBuffer;
  metadata?: UploadMetadata;
  onProgress?: (progress: number, snapshot: UploadTaskSnapshot) => void;
  onError?: (error: StorageError) => void;
  onComplete?: (downloadURL: string) => void;
}

const storageUpload = async ({
  path,
  file,
  metadata = {},
  onProgress,
  onError,
  onComplete
}: StorageUploadParams): Promise<string> => {
  try {
    const storageRef = ref(storage, path);

    if (onProgress || onError || onComplete) {
      // Use resumable upload for progress tracking
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      return new Promise<string>((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onProgress?.(progress, snapshot);
          },
          (error) => {
            console.error("Error uploading file:", error);
            onError?.(error);
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            onComplete?.(downloadURL);
            resolve(downloadURL);
          }
        );
      });
    } else {
      // Simple upload without progress tracking
      const snapshot = await uploadBytes(storageRef, file, metadata);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    }
  } catch (error) {
    console.error("Error uploading to storage:", error);
    throw error;
  }
};

export { storageUpload, type StorageUploadParams };