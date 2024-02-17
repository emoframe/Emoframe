import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, setDoc, getDoc, getDocs, collection, doc, query, where, updateDoc, arrayUnion, arrayRemove, writeBatch, documentId, DocumentData } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore';

import { Specialist, User } from "@/types/users";
import { Panas, Evaluation } from "@/types/forms";
import { Search } from "@/types/firebase";

import { chunk, getValuable } from "@/lib/utils";




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

export async function getById (id: string | string[], col: string) : Promise<any> {
  try {
    const groups = (typeof id === "string") ? [[id]] : chunk(id, 10); // Separa em grupos de 10 ids
    const collectionRef = collection(db, col);
    const res: DocumentData = new Array(); 
    /* "for await... of" permite um loop iterando sobre objetos assíncronos. ES 2018 */
    for await (const ids of groups) { // Faz a query pra cada grupo
      const q = query(collectionRef, where(documentId(), "in", ids));
      const docSnaps = await getDocs(q);
  
      docSnaps.forEach((docSnap) => {
        if(docSnap.exists()) {
          let data = docSnap.data();
          data["uid"] = id;
          
          if(data["birthday"]) 
            data["birthday"] = data["birthday"].toDate().toLocaleDateString('pt-BR');
          
          res.push(data);
        }
      });
    }

    console.log("Documents has been got sucessfully!", res);
    return typeof id === "string" ? res[0] : res;

  } catch(error) {
    console.log(error);
  }
  
}

export async function getSubsById (col: string, id: string, doc: string) : Promise<any> {
  const docRef = collection(db, col, id, doc);
  try {
    const docSnap = await getDocs(docRef);
    const res: any[] = []       
    docSnap.forEach((doc) => {
        const newObj: any = {
            uid: doc.id,
            type: doc.data().type,
            ...doc.data(),
        }
  
        res.push(newObj);
    });

    console.log("Documents has been got sucessfully!", res);
    return res;

  } catch(error) {
    console.log(error);
  }
}

export async function search ({col, field, operation, value}: Search) : Promise<any> {

  const docRef = collection(db, col);
  const q = query(docRef, where(field, operation, value));
  const querySnapshot = await getDocs(q);
  const res: any[] = []       
  querySnapshot.forEach((doc) => {
      const newObj: any = {
          uid: doc.id,
          ...doc.data(),
      }

      let keys = ['birthday', 'date']
      Object.keys(newObj).some(key => {
        if(keys.includes(key))
          newObj[key] = newObj[key].toDate().toLocaleDateString('pt-BR');
      })
        
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

export async function modifyArray (id: string | string[], col: string, name: string, value: string, mode: "add" | "remove") : Promise<any> {
  if(typeof id === "string") {
    const docRef = doc(db, col, id);
    try {
      if(mode == "add") {
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
  } else {
    // Novo lote
    const batch = writeBatch(db);

    id.forEach((user) => {
      const docRef = doc(db, col, user);
      try {
        if(mode == "add") {
          batch.update(docRef, { //Insere transação de atualização no lote
            [name]: arrayUnion(value) //[] permite que seja usado o valor da variável como o nome do campo
          });
        }
        else if(mode == "remove") {
          batch.update(docRef, {
            [name]: arrayRemove(value)
          });
        }
      } catch(error) {
        console.log(error);
      }
    });

    // Commita o lote
    await batch.commit();
  }
}

export async function saveAnswer (data: Panas, EvaluationId: string, UserId: string) : Promise<any> {
  const docRef = doc(db, "evaluation", EvaluationId, "answers", UserId);
  const answer = getValuable(data);

  try {
    setDoc(docRef, answer)
    .then((docRef) => console.log("Document has been inserted sucessfully!", answer))
    .catch((error) => console.log(error.code + ": " + error.message))
  }
  catch(error) {
    console.log(error)
  }
}

export async function createEvaluation(data: Evaluation) : Promise<any> {
  const docRef = collection(db, "evaluation");
  const evaluation = getValuable(data);

  try {
    addDoc(docRef, evaluation)
    .then((docRef) => console.log("Evaluation has been inserted sucessfully!"))
    .catch((error) => console.log(error.code + ": " + error.message))
  }
  catch(error) {
    console.log(error)
  }
}

export { app, db, auth }