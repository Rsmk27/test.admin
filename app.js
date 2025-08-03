// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlOaBBdC32G_XeGV3KZeHm06DCk0mQQXQ",
  authDomain: "test-admin-e70db.firebaseapp.com",
  projectId: "test-admin-e70db",
  storageBucket: "test-admin-e70db.appspot.com",
  messagingSenderId: "1036740850951",
  appId: "1:1036740850951:web:58b2a792f128eb6de3c1a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const submissionForm = document.getElementById("submissionForm");
const confirmationMessage = document.getElementById("confirmationMessage");

submissionForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
        const docRef = await addDoc(collection(db, "submissions"), {
            name: name,
            email: email,
            message: message,
            timestamp: new Date()
        });
        console.log("Document written with ID: ", docRef.id);
        submissionForm.reset();
        confirmationMessage.textContent = "Thank you for your submission!";
        setTimeout(() => {
            confirmationMessage.textContent = "";
        }, 3000);
    } catch (e) {
        console.error("Error adding document: ", e);
        confirmationMessage.textContent = "There was an error with your submission. Please try again.";
        confirmationMessage.classList.remove("text-green-500");
        confirmationMessage.classList.add("text-red-500");
    }
});
