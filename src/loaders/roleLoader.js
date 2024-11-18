import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { redirect } from "react-router-dom";

export const roleLoader = (requiredRoles) => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef)

          if (userDoc.exists()) {
              const userData = userDoc.data().role;

              if (requiredRoles.includes(userData)) {
                  resolve(null)
              }else{
                resolve(redirect("/auth/login"))
              }

            }else{
                resolve(redirect("/auth/login"))
            }
      }else{
        resolve(redirect("/auth/login"))
      }
    });
  });
};
