// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDE8eE8oZRT5Otr-qIKvYzWGSh9eDGBVRI",
  authDomain: "expense-tracker-8a6d8.firebaseapp.com",
  projectId: "expense-tracker-8a6d8",
  storageBucket: "expense-tracker-8a6d8.appspot.com",
  messagingSenderId: "737683771691",
  appId: "1:737683771691:web:7f18755298fdbac487356e",
  measurementId: "G-Y7CEF6CK3Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)
//add
{/*const addExpense = async (e) => {
  if (newExpense.name !== "" && newExpense.amount !== "") {
    //setExpense([...expense, newExpense]);
      setIspopUp(false);
    dispatch(addExpense(expense));
    dispatch(updateNotificationCount());
    
  
    await addDoc(collection(db, "expenses"), {
      name: newExpense.name.trim(),
      amount: newExpense.amount,
    });
    setNewExpense({ name: "", amount: "" });
   
    //come back to do toast
  }


//read
useEffect(() => {
  const q = query(collection(db, "expenses"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let expensesArr = [];
    querySnapshot.forEach((doc) => {
      expensesArr.push({ ...doc.data(), id: doc.id });
    });
    setExpense(expensesArr);
    const calculateTotal = () => {
      const totalPrice = expensesArr.reduce(
        (total, item) => total + parseFloat(item.amount),
        0
      );
      setTotal(totalPrice);
    };
    calculateTotal();
  });

  return () => unsubscribe();
}, []);

//delete
const remove = async (id) => {
  await deleteDoc(doc(db, "expenses", id));
}; */}