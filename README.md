# Fitness Tracking API

A scalable backend API for a fitness tracking platform built with **Node.js, Express, and MongoDB**.
It supports secure authentication (Local + GitHub OAuth), protected user routes, and structured workout
management with optimized querying.

---

## 🚀 Features

- **User Authentication:** Secure local authentication using JWT (Access + Refresh Tokens).
- **GitHub OAuth Integration:** Login and register using GitHub.
- **Cookie-Based Security:** httpOnly cookies for secure token storage. 
- **Token Refresh Flow:** Access token renewal using refresh token rotation.
- **Profile Management:** Update Profile, change password, and delete account.
- **Workout Tracking:** Create, update, delete, and retrieve Cardio and Resistance workouts.
- **Query Filtering & Pagination:** Search by name, filter by date range, sort, and paginate results.
- **Optimized Database Queries:** Indexed schemas for faster user-date queries.
- **Virtual Computed Fields:** Automatic pace calculation for cardio & volume calculation for resistance.
- **Zod Validation:** Request validation using Zod for strict and safe API inputs.

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- Passport.js (GitHub OAuth)
- JWT (jsonwebtoken)
- Zod
- Bcrypt
- cookie-parser

---

## 🔐 Authentication & Validation

- Passwords hashed using Bcrypt.
- JWT-based authentication with Access + Refresh token pattern.
- Secure httpOnly cookies for token transport.
- Github OAuth using Passport strategy.
- Strict schema validation using Zod.
- Protected routes using authentication middleware.

---

## ⚙️ Workout System

### **Cardio Workouts**
- Name & Description
- Duration (value + unit)
- Distance (value + unit)
- Date Tracking
- Automatic pace calculation (virtual field)

### **Resistance Workouts**
- Name & Description
- Weight (value + unit)
- Sets & Reps
- Date Tracking
- Automatic Volume calculation (virtual field)

All workouts are user-scoped and protected via authentication middleware.

--- 

## 🏁 Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB (Local instance or MongoDB Atlas)
- GitHub OAuth App (for OAuth Login)

### 1️⃣ Clone the Repository

#### HTTPS
```bash
git clone https://github.com/RaghavM117/Fitness_Tracker_App.git
cd Fitness_Tracker_App
```

#### SSH
```bash
git clone git@github.com:RaghavM117/Fitness_Tracker_App.git
cd Fitness_Tracker_App
```

---

### 2️⃣ Install Dependencies
```bash
cd server
npm install
```

---

### 3️⃣ 🔐 Setup Environment Variables
* Create a .env file in the server folder and add:

```bash
PORT=7000 #or your own defined PORT
MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:7000/api/auth/github/callback 
```

### 4️⃣ Run the Application

#### Production Mode
```bash
npm start
```

#### Development Mode (with nodemon)
```bash
npm run dev
```

---

## 📡 API Routes

### 🔐 Authentication Routes

### Authentication API Endpoints

| Method | Endpoint | Description |
|:--- |:--- |:--- |
| **POST** | `/api/auth/register` | Register a new user with email and password |
| **POST** | `/api/auth/login` | Login with email or username |
| **GET** | `/api/auth/github` | Initiates GitHub OAuth authentication flow |
| **POST** | `/api/auth/refresh` | Generates a new Access Token using a Refresh Token |
| **POST** | `/api/auth/logout` | Invalidates the session and clears authentication tokens |

---

### 👤 User Routes

| Method | Endpoint | Description | Auth Required |
|:--- |:--- |:--- |:---:|
| **GET** | `/api/users/meProfile` | Retrieve the currently logged-in user's profile | Yes |
| **PATCH** | `/api/users/meProfile` | Update account details (e.g., name) | Yes |
| **PATCH** | `/api/users/changePassword` | Securely update the user's password | Yes |
| **DELETE** | `/api/users/meProfile` | Permanently remove the user account and data | Yes |

---

### 🏋️ Workout Routes

### Resistance Workout Endpoints

| Method | Endpoint | Description |
|:--- |:--- |:--- |
| **POST** | `/api/workout/resistance` | Log a new resistance session (e.g., Weights, Calisthenics) |
| **GET** | `/api/workout/resistance` | Retrieve all resistance logs (supports filtering by date/type) |
| **GET** | `/api/workout/resistance/:id` | Fetch details of a specific resistance workout |
| **PATCH** | `/api/workout/resistance/:id` | Update sets, reps, or weight for a specific entry |
| **DELETE** | `/api/workout/resistance/:id` | Remove a resistance workout record |

### Cardio Workout Endpoints

| Method | Endpoint | Description |
|:--- |:--- |:--- |
| **POST** | `/api/workout/cardio` | Log a new cardio session (e.g., Running, Cycling) |
| **GET** | `/api/workout/cardio` | Retrieve all cardio logs (supports filtering by date/intensity) |
| **GET** | `/api/workout/cardio/:id` | Fetch details of a specific cardio workout |
| **PATCH** | `/api/workout/cardio/:id` | Update duration, distance, or pace for a specific entry |
| **DELETE** | `/api/workout/cardio/:id` | Remove a cardio workout record |

---

## 📄 License

This project is licensed under the MIT License.  
See the [LICENSE](./LICENSE) file for details.
