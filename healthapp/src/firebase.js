import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import 'firebase/compat/firestore'

const app = firebase.initializeApp({
    apiKey: "AIzaSyANQoEmpSy_1iz6c-l3urh-T_TGLjkbrcc",
    authDomain: "cs35l-health-app.firebaseapp.com",
    projectId: "cs35l-health-app",
    storageBucket: "cs35l-health-app.appspot.com",
    messagingSenderId: "1072790558156",
    appId: "1:1072790558156:web:1106cce422c5b8f285f969",
    measurementId: "G-YQHSLDL1Q2"
})

export const db = firebase.firestore()
export const auth = app.auth()
export default app