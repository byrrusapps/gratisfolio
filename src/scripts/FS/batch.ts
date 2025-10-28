import {
  doc,
  writeBatch,
  WriteBatch,
  DocumentReference,
  DocumentData,
  WithFieldValue,
  UpdateData,
} from "firebase/firestore";
import { firestore } from "./init/InitFirebase";

type BatchOperationType = "set" | "update" | "delete";

interface BatchOperation<T extends DocumentData = Record<string, any>> {
  type: BatchOperationType;
  path: string;
  data?: any; // for set/update
  merge?: boolean; // only for set
}

interface BatchOptions<T extends DocumentData = Record<string, any>> {
  operations: BatchOperation<T>[];
}

export const batch = async <T extends DocumentData = Record<string, any>>({
  operations,
}: BatchOptions<T>): Promise<void> => {
  try {
    const batch: WriteBatch = writeBatch(firestore);

    for (const op of operations) {
      const pathSegments = op.path.split("/").filter(Boolean);

      if (pathSegments.length === 0) throw new Error("Invalid path");

      const docRef = doc(firestore, ...(pathSegments as [string, ...string[]])) as DocumentReference<T>;

      switch (op.type) {
        case "set":
          batch.set(
            docRef,
            op.data as WithFieldValue<T>,
            op.merge ? { merge: true } : {}
          );
          break;

        case "update":
          batch.update(
            docRef,
            op.data as UpdateData<T>
          );
          break;

        case "delete":
          batch.delete(docRef);
          break;

        default:
          throw new Error(`Unknown operation type: ${op.type}`);
      }
    }

    await batch.commit();
  } catch (error) {
    console.error("Error executing batch operation:", error);
    throw error;
  }
};
