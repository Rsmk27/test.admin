// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, getDocs, doc, deleteDoc, query, orderBy } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

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

const submissionsTableBody = document.getElementById("submissionsTableBody");
const logoutButton = document.getElementById("logoutButton");
const tableHeaders = document.querySelectorAll("th[data-sort]");

let submissions = [];
let currentSort = {
    column: "timestamp",
    direction: "desc"
};

const renderTable = () => {
    submissionsTableBody.innerHTML = "";
    submissions.forEach(submission => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">${submission.name}</p>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">${submission.email}</p>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">${submission.message}</p>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">${new Date(submission.timestamp.seconds * 1000).toLocaleString()}</p>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button data-id="${submission.id}" class="delete-button bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
            </td>
        `;
        submissionsTableBody.appendChild(row);
    });
};

const fetchSubmissions = async () => {
    const q = query(collection(db, "submissions"), orderBy(currentSort.column, currentSort.direction));
    const querySnapshot = await getDocs(q);
    submissions = [];
    querySnapshot.forEach((doc) => {
        submissions.push({ id: doc.id, ...doc.data() });
    });
    renderTable();
};

const sortTable = (column) => {
    if (currentSort.column === column) {
        currentSort.direction = currentSort.direction === "asc" ? "desc" : "asc";
    } else {
        currentSort.column = column;
        currentSort.direction = "asc";
    }
    fetchSubmissions();
};

tableHeaders.forEach(header => {
    header.addEventListener("click", () => {
        sortTable(header.dataset.sort);
    });
});

logoutButton.addEventListener("click", () => {
    window.location.href = "admin.html";
});

submissionsTableBody.addEventListener("click", async (e) => {
    if (e.target.classList.contains("delete-button")) {
        const id = e.target.dataset.id;
        if (confirm("Are you sure you want to delete this submission?")) {
            await deleteDoc(doc(db, "submissions", id));
            fetchSubmissions();
        }
    }
});


fetchSubmissions();
