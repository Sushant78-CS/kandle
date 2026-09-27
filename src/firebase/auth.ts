import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";

import { doc, getDoc, setDoc } from "firebase/firestore";

import { auth, db } from "./config";

export async function registerUser(
  name: string,
  email: string,
  password: string,
): Promise<User> {
  const result = await createUserWithEmailAndPassword(auth, email, password);

  const user = result.user;

  // Save name to Firebase Auth
  await updateProfile(user, {
    displayName: name,
  });

  // Save profile to Firestore
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name,
    email,
    role: "user",
    createdAt: new Date(),
  });

  return user;
}

export async function loginUser(
  email: string,
  password: string,
): Promise<User> {
  const result = await signInWithEmailAndPassword(auth, email, password);

  return result.user;
}

export async function logoutUser() {
  await signOut(auth);
}

export async function isAdmin(uid: string): Promise<boolean> {
  const userRef = doc(db, "users", uid);

  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    return false;
  }

  return snapshot.data().role === "admin";
}

export function subscribeToAuth(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
