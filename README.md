# E-Commerce Project Nexora

A modern, full-stack e-commerce platform built with Next.js, featuring a robust frontend and backend architecture.

## 🚀 Features

### Frontend
- Modern UI with Radix UI Primitives and Tailwind CSS
- Dark mode support using `next-themes`
- Responsive design
- User authentication and authorization
- Product catalog with search and filtering
- Shopping cart functionality
- Secure checkout process
- User profile management
- Order history tracking

### Backend
- RESTful API endpoints
- Secure user authentication
- Product management system
- Order processing
- Payment integration
- Data validation and sanitization

## 🛠 Tech Stack

- **Frontend**:
  - Next.js 13 (App Directory)
  - Radix UI Primitives
  - Tailwind CSS
  - TypeScript
  - Lucide Icons
  - Next-themes for dark mode

- **Backend**:
  - Next.js API Routes
  - TypeScript
  - Database (Your database choice)
  - Authentication system

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/e-commerce-project-nexora.git
cd e-commerce-project-nexora
```

2. Install dependencies:
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables:
- Copy the `.env.example` files in both frontend and backend directories
- Create `.env.local` files and fill in your environment variables

## 🚀 Running the Project

### Development Mode

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. In a new terminal, start the frontend:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:3001](http://localhost:3001)

### Production Mode

1. Build the project:
```bash
# Build backend
cd backend
npm run build

# Build frontend
cd frontend
npm run build
```

2. Start the production servers:
```bash
# Start backend
cd backend
npm start

# Start frontend
cd frontend
npm start
```

## 📚 Documentation

Detailed documentation for various setups:
- [Location Setup](frontend/LOCATION_SETUP.md)
- [Email Configuration](frontend/EMAIL_SETUP.md)
- [OAuth2 Setup](frontend/OAuth2_SETUP.md)
- [Resend Integration](frontend/RESEND_SETUP.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Bilwamoy chakraborty

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) team for the amazing framework
- [Radix UI](https://www.radix-ui.com/) for the component primitives
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework