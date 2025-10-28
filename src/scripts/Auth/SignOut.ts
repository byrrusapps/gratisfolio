import { getAuth, signOut } from "firebase/auth";

interface SignOutITF {
  setMsg: (msg: string) => void;
  setMsgOpen: (open: boolean) => void;
  setMsgType: (type: string) => void;
}

const SignOut = ({setMsg, setMsgType, setMsgOpen}: SignOutITF): void => {
  const auth = getAuth();

  signOut(auth)
    .then(() => {
      setMsgOpen(true);
      setMsgType("success");
      setMsg("Signed out successfully");
      localStorage.clear();
      sessionStorage.clear();
    })
    .catch((error) => {
      setMsgOpen(true);
      setMsgType("error");
      setMsg("Sign out failed!");
    });
};

export default SignOut;