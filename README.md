# User Management Application

This project is a Full-Stack User Management Web Application that allows you to:

* Create, read, update, and delete (CRUD) user records
* Upload user data in bulk using Excel files
* Download a sample Excel template
* See validation errors and user feedback
* Mask PAN numbers by default with a toggle visibility button
* Use a responsive, mobile-friendly interface

---

## Technologies Used

### Frontend

* React (TypeScript)
* Material UI (MUI)
* Axios
* SweetAlert2

### Backend

* Node.js with Express (TypeScript)
* MySQL
* `xlsx` for Excel file handling
* `express-validator` for validations
* Multer for file uploads

---

## Setup Instructions

Pre-requisites: Node.js, npm, and MySQL(XAAMP Server) installed.

---

### 1. Database Setup

1. Start MySQL.
2. Create the database and table:

```sql
CREATE DATABASE IF NOT EXISTS user_management;
USE user_management;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone_number VARCHAR(10) NOT NULL,
  pan_number VARCHAR(10) NOT NULL
);
```

---

### 2. Backend Setup

1. Navigate to the backend folder:

```bash
cd user-management-backend
```

2. Install dependencies:

```bash
npm install
```

3. Configure your database credentials:

Edit `src/db.ts`:

```typescript
export const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "YOUR_PASSWORD",
  database: "user_management"
});
```

4. Start the backend server:

```bash
npm run dev
```

The backend will run on:

```
http://localhost:5000
```

---

### 3. Frontend Setup

1. Navigate to the frontend folder:

```bash
cd user-management-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the React app:

```bash
npm start
```

The frontend will run on:

```
http://localhost:3000
```

---

## Features Overview

### CRUD Operations

* Create new users with validations
* Edit existing users
* Delete users with confirmation dialogs
* All actions auto-refresh the table

### Bulk Upload

* Upload `.xlsx` files with multiple users
* Full validation per row:

  * Required fields
  * Valid email format
  * 10-digit phone number
  * Valid PAN format (5 letters, 4 digits, 1 letter)
* Display error summary if any rows are invalid
* Reject partial uploads

### Sample Excel Template

* Download a pre-formatted `.xlsx` file with correct headers and sample data

### PAN Masking

* PAN number displayed masked by default
* Toggle visibility using an eye icon

### Responsive Design

* Works on desktop and mobile screens

---

## How to Use

1. **Create Users**

   * Fill the form on the main page
   * Submit to create

2. **Edit Users**

   * Click the Edit icon in the table
   * Update and save

3. **Delete Users**

   * Click the Delete icon
   * Confirm deletion

4. **Bulk Upload**

   * Download the sample template
   * Populate your user data
   * Upload
   * See success or error messages

---

## Sample Excel Template and DB Dump are uploaded

---

## Known Issues

* If the database credentials are incorrect, the server will throw connection errors.
* The Excel file must be properly formatted or it will reject all rows.
  
---
