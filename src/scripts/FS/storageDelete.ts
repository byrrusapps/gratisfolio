import { ref, deleteObject } from "firebase/storage";
import { storage } from "./init/InitFirebase";

interface StorageDeleteParams {
  path: string;
}

const storageDelete = async ({ path }: StorageDeleteParams): Promise<void> => {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};

export { storageDelete, type StorageDeleteParams };