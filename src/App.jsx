import { useEffect, useState } from 'react'
import {initializeApp} from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut  } from 'firebase/auth';
import ToDoList from './assets/components/ToDoList/ToDoList'
import Login from './assets/components/Login/Login';
import Preloader from './assets/components/Preloader/Preloader';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import cls from './App.module.css'


const firebaseConfig = {
  apiKey: "AIzaSyDsCTojGjcX0ppkX3BlUz0jUGhcgti2xrE",
  authDomain: "todolist-6ed25.firebaseapp.com",
  projectId: "todolist-6ed25",
  storageBucket: "todolist-6ed25.appspot.com",
  messagingSenderId: "294240205055",
  appId: "1:294240205055:web:e194f71b725f41b5b2b4ca",
  measurementId: "G-LTG0VNLY8G",
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const db = getFirestore(app);


const createUserDocument = async (uid) => {

  const existingData = (await getDoc(userArrayRef)).data();
  const userArrayRef = doc(db, 'users', uid);
  const updatedData = {
    todolist: existingData && existingData.todolist ? existingData.todolist : [],
  };

  try {
    await setDoc(userArrayRef, updatedData);
    console.log('User array updated successfully!');
  } catch (error) {
    console.error('Error updating user array:', error);
  }
};




function App() {
  const [preloaderStatus, setPreloaderStatus] = useState(true)
  const [user, setUser] = useState(null)
  const [uId, setUId] = useState('')
 
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    setPreloaderStatus(true)
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user)
        setPreloaderStatus(false)
        createUserDocument(result.user.uid)
      })
      .catch((error) => {
      
        console.error(error.message);
      });
  };

  const handleLogout = () => {

    setPreloaderStatus(true)
 
    signOut(auth)
      .then(() => {
        setUser(null);
        setPreloaderStatus(false)
      })
      .catch((error) => {
        console.error('Ошибка выхода из системы:', error.message);
      });
  };

  
  useEffect(() => {
   
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setUId(user?.uid);
      setPreloaderStatus(false);
     
    });
    return () => {
      unsubscribe()
      
    };
    
    
  }, []);



  return (
    <div className={cls.appContainer}> 
       {preloaderStatus && <Preloader/>}
       
       <Login  
       user={user}
       signInWithGoogle={signInWithGoogle}
       handleLogout={handleLogout}
       uid={uId}
       />
       
       <ToDoList db={db} uid={uId}/>
      
    </div>
  )
}

export default App
