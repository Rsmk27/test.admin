# Data Collection Web Application

This project is a fully functional web application that collects data from users and stores it in a cloud-based database (Firestore). It also includes a separate, secure admin page for accessing and managing the data.

## Features

- **User-Facing Website:** A single-page application with a clean and modern form for data entry.
- **Admin Panel:** A secure, password-protected page to view, sort, and delete submitted data.
- **Cloud Database:** Uses Firestore for real-time data storage.
- **Responsive Design:** Both the user-facing site and the admin panel are fully responsive, built with Tailwind CSS.

## Admin Credentials

- **Username:** `admin`
- **Password:** `password`

To access the admin panel, navigate to `admin.html` and enter the credentials above.

## How It Works

### User-Facing Form (`index.html`)

- Users fill out the form with their name, email, and a message.
- Upon submission, the data is sent to a `submissions` collection in Firestore.
- A confirmation message is displayed to the user.

### Admin Panel (`admin.html` & `dashboard.html`)

- The admin logs in through a simple, hardcoded authentication system.
- The dashboard fetches all entries from the `submissions` collection and displays them in a table.
- The admin can sort the data by name, email, or timestamp.
- The admin can delete individual entries, which removes them from the database.

## Firebase Integration

The project is pre-configured with the necessary Firebase SDKs and initialization code. The Firebase configuration is stored in `app.js` and `dashboard.js`.

**Firestore Rules:** For a production environment, you should configure Firestore rules to secure your data. A basic setup would be to allow public writes to the `submissions` collection but restrict reads and deletes to authenticated admin users. However, for this project, the rules are left open for simplicity.
