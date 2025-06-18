import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyADhDeIeUkCrdAQUC7Xpk9y1gMqJlkGhqI",
  authDomain: "ai-trip-planner-988c5.firebaseapp.com",
  projectId: "ai-trip-planner-988c5",
  storageBucket: "ai-trip-planner-988c5.firebasestorage.app",
  messagingSenderId: "550936115223",
  appId: "1:550936115223:web:9cec134a9cdef8f03b8452",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)

// Add auth state listener
auth.onAuthStateChanged((user) => {
  console.log("Auth state changed:", user ? "Logged in" : "Logged out")
})
