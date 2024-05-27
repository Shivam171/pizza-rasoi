![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white) ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

# 🍕 Pizza Rasoi

Pizza Rasoi is a full-stack web application built using Next.js 14, Node.js, and MongoDB with Tailwind CSS. It offers a complete online pizza ordering experience, including user authentication, shopping cart functionality, and an admin dashboard for managing products, categories, users, and orders.

## ✨ Features

### General

- **Home Page:** Includes a Hero section, Menu, About, and Contact sections.
- **Navigation:** Easily navigate through different sections and pages.

### User Functionality

- **🍽️Menu:** Browse a variety of pizzas available for order.
- **🛒Shopping Cart:** Add pizzas to the cart, choose pizza sizes, add extra toppings, and view the cart with subtotal, delivery charges, and total charges.
- **💳Checkout:** Fill in delivery details and proceed to payment via Stripe.
- **📜Order Page:** View order details after successful payment.

### 🔐 Authentication

- **User Login:** Login with Google or create an account.
- **Profile Management:** Update profile information, including uploading a profile image to AWS.

### 🔧 Admin Functionality

- **Admin Dashboard:** Accessible only to admins.
  - **Categories:** Perform CRUD operations on categories (add, edit, delete, and search).
  - **Menu Items:** Perform CRUD operations on menu items.
  - **Users:** View all users and manage user roles (e.g., promote users to admin).
  - **Orders:** View and manage all orders.

## 🛠️ Technologies Used

### Frontend

- **[Next.js 14](https://nextjs.org/):** The main framework for building the application.
- **[Tailwind CSS](https://tailwindcss.com/):** For styling the application.
- **[React-Hot-Toast](https://react-hot-toast.com/):** For notifications and toasts.

### Backend

- **Node.js:** The runtime environment.
- **MongoDB:** The database for storing application data.
- **Mongoose:** An ODM for MongoDB.

### Other Libraries

- **[Next-Auth](https://next-auth.js.org/getting-started/example):** For authentication and session management.
- **[Next Adapters](https://next-auth.js.org/adapters):** For adapting various Next.js features.
- **[Uniqid](https://classic.yarnpkg.com/en/package/uniqid):** For generating unique IDs.
- **[AWS SDK / Client](https://classic.yarnpkg.com/en/package/@aws-sdk/client-location):** For handling image uploads to AWS S3.

## 🚀 Getting Started

### Prerequisites

- Node.js
- MongoDB
- AWS S3 Account (for image uploads)
- Stripe Account (for payment processing)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Shivam171/pizza-rasoi.git
   cd pizza-rasoi
   ```

2. **Install dependencies:**

   ```sh
   yarn install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root of the project or use the `.env.example` for refrence and add the following environment variables:

   ```env
   MONGO_URL=<Your MongoDB connection string>
   NEXTAUTH_URL=<Your NextAuth URL>
   NEXTAUTH_SECRET=<Your NextAuth secret>
   AWS_ACCESS_KEY_ID=<Your AWS access key ID>
   AWS_SECRET_ACCESS_KEY=<Your AWS secret access key>
   AWS_REGION=<Your AWS region>
   AWS_BUCKET_NAME=<Your S3 bucket name>
   STRIPE_SECRET_KEY=<Your Stripe secret key>
   ```

4. **Run the development server:**

   ```sh
   npm run dev
   ```

5. **Open the application in your browser:**
   ```sh
   http://localhost:3000
   ```

## 💡 Usage

### User Experience

1. **Browse Menu:** Navigate to the menu to see different pizzas.
2. **Add to Cart:** Customize your pizza with size and toppings and add it to the cart.
3. **Checkout:** Proceed to checkout, fill in your details, and pay via Stripe.
4. **View Order:** After payment, view your order details on the order page.

### Admin Experience

1. **Login as Admin:** Access the admin dashboard.
2. **Manage Categories:** Add, edit, delete, or search categories.
3. **Manage Menu Items:** Perform CRUD operations on menu items.
4. **Manage Users:** View and manage user roles.
5. **Manage Orders:** View and manage all orders.

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature/feature-name`).
6. Open a pull request.

## 📜 License

This project is licensed under the MIT License.

## 🙏 Acknowledgements

- Thanks to the creators of Next.js, Tailwind CSS, MongoDB, and all the other libraries used in this project.

---

Feel free to contribute, open issues, and submit pull requests to make Pizza Rasoi even better! Enjoy your pizza ordering experience!
