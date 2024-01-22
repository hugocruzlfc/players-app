import { firebaseApp } from "@/libs";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const db = getFirestore(firebaseApp);

export const storage = getStorage(firebaseApp);

export {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  getDownloadURL,
  ref,
  uploadBytes,
};
