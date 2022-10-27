import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpbHa2naUxiL7Sqd437U77G4qLeM6VcQs",
  authDomain: "field-work-gghn-38496.firebaseapp.com",
  projectId: "field-work-gghn-38496",
  storageBucket: "field-work-gghn-38496.appspot.com",
  messagingSenderId: "794652139291",
  appId: "1:794652139291:web:c3697a8361b29403c2fdbe",
  measurementId: "G-KF0V7J5QW9"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp, projectStorage }