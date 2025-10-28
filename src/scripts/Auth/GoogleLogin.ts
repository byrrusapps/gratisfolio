import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../FS/init/InitFirebase";

interface GoogleLoginParams {
  setMsgOpen: (open: boolean) => void;
  setMsgType: (type: "success" | "error") => void;
  setMsg: (msg: string) => void;
  callback?: ({}) => void;
}

const GoogleLogin = async ({
  setMsgOpen,
  setMsgType,
  setMsg,
  callback,
}: GoogleLoginParams): Promise<void> => {
  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(auth, provider);

    setMsgOpen(true);
    setMsgType("success");
    setMsg("Signed in successfully. Updating user data...");
    
    if (callback && typeof callback === "function") {
      callback({data: auth.currentUser});
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An error occurred";

    setMsgOpen(true);
    setMsgType("error");
    setMsg(errorMessage);
  }
};

export default GoogleLogin;