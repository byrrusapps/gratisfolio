import {
  doc,
  updateDoc,
  serverTimestamp,
  DocumentReference,
  DocumentData,
  UpdateData,
} from "firebase/firestore";
import { firestore } from "./init/InitFirebase";

interface UpdateOptions<T extends DocumentData = Record<string, any>> {
  path: string;
  data: Partial<T>;
  autoTimestamp?: boolean;
}

export const update = async <T extends DocumentData = Record<string, any>>({
  path,
  data,
  autoTimestamp = true,
}: UpdateOptions<T>): Promise<void> => {
  try {
    const pathSegments = path.split("/").filter(Boolean);

    if (pathSegments.length % 2 !== 0) {
      throw new Error("UPDATE requires a document path (even number of segments)");
    }

    const documentRef = doc(firestore, ...(pathSegments as [string, ...string[]])) as DocumentReference<T>;

    // Merge data + updatedAt if autoTimestamp
    const updateData: UpdateData<T> = autoTimestamp
      ? { ...data, updatedAt: serverTimestamp() } as UpdateData<T>
      : data as UpdateData<T>;

    await updateDoc(documentRef, updateData);
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};
