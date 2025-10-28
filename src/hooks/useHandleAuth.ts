import { useEffect, useRef } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { FS, utils } from "../scripts";
import { firestore, auth } from "../scripts/FS/init/InitFirebase";
import { useRouter } from "next/navigation";

interface UserInfo {
  myUid: string;
  myName: string;
  myAvatar: string;
  myTag: string;
  myEmail: string;
  myDateJoined: number;
  myBio: string;
}

interface TagInfo {
  timestamp: number;
  uid: string;
}

interface UseHandleAuthParams {
  user: UserInfo | null | undefined;
  setUser: (user: UserInfo | null) => void;
}

const useHandleAuth = ({ user, setUser }: UseHandleAuthParams): void => {
  const router = useRouter();
  const unsubscribeUserRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (userFB: FirebaseUser | null) => {
      if (userFB) {
        const { uid, displayName, photoURL, email } = userFB;

        const onResult = (data: UserInfo | UserInfo[] | null, error?: unknown) => {
          console.log(data);
          // Handle error
          if (error) {
            console.error("Error fetching user data:", error);
            setUser(null);
            return;
          }

          // Handle array (shouldn't happen for single document read, but type-safe)
          if (Array.isArray(data)) {
            console.warn("Unexpected array response for single user document");
            setUser(data[0] || null);
            return;
          }

          if (data) {
            setUser(data);
          } else {
            const rand = utils.randomNumbers();
            const firstName = displayName?.split(" ")[0]?.toLowerCase() || "user";
            const tag = `${firstName}${rand}`;
            const timestamp = Date.now();

            const info: UserInfo = {
              myUid: uid,
              myName: displayName || "",
              myAvatar: photoURL || "",
              myTag: tag,
              myEmail: email || "",
              myDateJoined: timestamp,
              myBio: `Hey, I'm on ${process.env.NEXT_PUBLIC_APP_NAME}!`,
            };

            const tagInfo: TagInfo = {
              timestamp,
              uid,
            };

            setUser(info);

            FS.batch({
              operations: [
                {
                  path: `users/${uid}`,
                  type: "set",
                  data: info,
                  merge: true,
                } as const,
                {
                  path: `tags/${tag}`,
                  type: "set",
                  data: tagInfo,
                  merge: true,
                },
              ],
            });
          }
        };

        if (user === null) {
          const unsubscribe = await FS.read(firestore, {
            path: `users/${uid}`,
            onResult,
            listen: true,
          });
          
          if (unsubscribe) {
            unsubscribeUserRef.current = unsubscribe;
          }
        }
      } else {
        // router.replace("/auth");
        setUser(null);
      }
    });

    return () => {
      unsubscribeAuth();
      
      if (unsubscribeUserRef.current) {
        unsubscribeUserRef.current();
        unsubscribeUserRef.current = null;
      }
    };
  }, [user, setUser, router]);
};

export default useHandleAuth;