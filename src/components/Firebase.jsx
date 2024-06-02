import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyACtc8jmGot9kBlo_htDcU8mlt9EAcTi7s",
  authDomain: "pizza-rasoi.firebaseapp.com",
  projectId: "pizza-rasoi",
  storageBucket: "pizza-rasoi.appspot.com",
  messagingSenderId: "281181146572",
  appId: "1:281181146572:web:d9441a171622a9b5aa2169",
  measurementId: "G-GYN48BMVZN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);