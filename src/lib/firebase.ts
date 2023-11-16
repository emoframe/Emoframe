import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, getDoc, getDocs, collection, doc, query, where, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { getFirestore,  } from 'firebase/firestore';

import { Specialist, User } from "@/types/users";
import { getValuable } from "@/lib/utils";

export const dynamic = 'force-dynamic'; //Resolve o problema de cache após atualização

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(app);

export async function createUser (data : User | Specialist, specialistId?: string) : Promise<void> {
  
  const user = getValuable(data);

  createUserWithEmailAndPassword(auth, user.email, user.password!)
    .then((userCredential) => {
      // Signed in 
      const userId = userCredential.user.uid;   
      const docRef = doc(db, "user", userId);

      delete user.password;
      delete user.confirm_password;

      if(user.type == "user")
        user.specialistId = specialistId;

      setDoc(docRef, user)
      .then(docRef => {
          console.log(`Document has been added successfully`)
      })
      .catch((error) => {
          console.log(error.code+": "+error.message);
      });
    })
    .catch((error) => {
      console.log(error.code+": "+error.message);
    });
} 

export async function getById (id: string, col: string) : Promise<any> {
  const docRef = doc(db, col, id);
  try {
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
        let data = docSnap.data();
        data["uid"] = id;
        
        if(data["birthday"]) 
          data["birthday"] = data["birthday"].toDate().toLocaleDateString('pt-BR');

        return data;
    } else {
        console.log("Document does not exist");
    }

  } catch(error) {
    console.log(error);
  }
}

export async function search (key: string, value: string, col: string) : Promise<any> {

  const docRef = collection(db, col);
  const q = query(docRef, where(key, "==", value));
  const querySnapshot = await getDocs(q);
  const res:any[] = []       
  querySnapshot.forEach((doc) => {
      const newObj: any = {
          uid: doc.id,
          ...doc.data(),
      }

      if(newObj["birthday"]) 
        newObj["birthday"] = newObj["birthday"].toDate().toLocaleDateString('pt-BR');
      
      res.push(newObj);
  });

  res.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

  return res;
}

export async function updateById (data: any, id: string, col: string) : Promise<any> {
  const docRef = doc(db, col, id);
  const user = getValuable(data);
  try {
    updateDoc(docRef, user)
    .then(docRef => {
      console.log(`Document has been modified successfully`)
    })
    .catch((error) => {
        console.log(error.code+": "+error.message);
    });

  } catch(error) {
    console.log(error);
  }
}

export async function modifyArray (id: string, col: string, name: string, value: string, mode: "modify" | "remove") : Promise<any> {
  const docRef = doc(db, col, id);
  try {
    if(mode == "modify") {
      await updateDoc(docRef, {
        [name]: arrayUnion(value) //[] permite que seja usado o valor da variável como o nome do campo
      });
    }
    else if(mode == "remove") {
      await updateDoc(docRef, {
        [name]: arrayRemove(value)
      });
    }
  } catch(error) {
    console.log(error);
  }
}

export { app, db, auth }