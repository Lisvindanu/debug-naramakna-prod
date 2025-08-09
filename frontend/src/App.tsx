import React from 'react';
import SimpleRouter from "./components/Router/SimpleRouter";
import { AuthProvider } from './contexts/AuthContext';
import "./App.css";
import "./styles/article.css";
import "./styles/editor.css"; // Kumparan editor styles

// Import API debug untuk development
if (import.meta.env.DEV) {
  import('./utils/api-debug');
}

// Login Page
const LoginPage = () => (
  <div className="bg-gray-50 min-h-screen flex items-center justify-center p-8">
    <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-left">
        Masuk ke Akun Anda
      </h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 text-left mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            placeholder="Masukkan email Anda"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 text-left mb-1">
            Password
          </label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            placeholder="Masukkan password Anda"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors"
        >
          Masuk
        </button>
        <div className="text-center">
          <a href="#" className="text-sm text-yellow-600 hover:text-yellow-700">
            Lupa Password?
          </a>
        </div>
      </form>
    </div>
  </div>
);

// Register Page
const RegisterPage = () => (
  <div className="bg-gray-50 min-h-screen flex items-center justify-center p-8">
    <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-left">
        Daftar Akun Baru
      </h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 text-left mb-1">
            Nama Lengkap
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            placeholder="Masukkan nama lengkap Anda"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 text-left mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            placeholder="Masukkan email Anda"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 text-left mb-1">
            Password
          </label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            placeholder="Minimal 6 karakter"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors"
        >
          Daftar
        </button>
      </form>
    </div>
  </div>
);

// Forgot Password Page
const ForgotPasswordPage = () => (
  <div className="bg-gray-50 min-h-screen flex items-center justify-center p-8">
    <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-left">
        Lupa Password
      </h2>
      <p className="text-gray-600 mb-6 text-left">
        Masukkan email Anda untuk menerima link reset password
      </p>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 text-left mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            placeholder="Masukkan email Anda"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors"
        >
          Kirim Link Reset
        </button>
        <div className="text-center">
          <a href="#" className="text-sm text-yellow-600 hover:text-yellow-700">
            Kembali ke Login
          </a>
        </div>
      </form>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <SimpleRouter />
      </div>
    </AuthProvider>
  );
}

export default App;