import { deleteUser, User } from "firebase/auth";
import { FS } from "../FS/FS";
import { auth } from "../FS/init/InitFirebase";

interface DeleteUserITF {
  setMsg: (msg: string) => void;
  setMsgOpen: (open: boolean) => void;
  setMsgType: (type: string) => void;
  myTag: string;
  myUid: string;
}

const DeleteUser = async ({
  setMsg,
  setMsgType,
  setMsgOpen,
  myTag,
  myUid
}: DeleteUserITF): Promise<void> => {
  
  if (!myTag || !myUid) {
    setMsgOpen(true);
    setMsgType("error");
    setMsg("Delete operation is missing critical info!");
    return; // Early return to prevent execution
  }

  const currentUser = auth.currentUser;
  
  if (!currentUser) {
    setMsgOpen(true);
    setMsgType("error");
    setMsg("No authenticated user found!");
    return;
  }

  try {
    // Delete user data from Firestore first
    await FS.batch({
      operations: [
        {
          type: "delete",
          path: `users/${myUid}`,
        },
        {
          type: "delete",
          path: `tags/${myTag}`,
        },
      ]
    });

    // Then delete the auth account
    await deleteUser(currentUser);
    
    setMsgOpen(true);
    setMsgType("success");
    setMsg("Account deleted successfully");
    localStorage.clear();
    sessionStorage.clear();
    
  } catch (error) {
     const errorMessage = error instanceof Error ? error.message : "Account deletion failed, sign out and sign in, then try again!";

    setMsgOpen(true);
    setMsgType("error");
    setMsg(errorMessage);
    console.error("Delete user error:", error);
  }
};

export default DeleteUser;