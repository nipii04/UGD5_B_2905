'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthFromWrapper from '@/components/AuthFormWrapper';
import SocialAuth from '@/components/SocialAuth';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaSync } from 'react-icons/fa';

// Fungsi helper untuk generate captcha acak (6 karakter)
const generateCaptcha = () => Math.random().toString(36).substring(2, 8);

export default function LoginPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    captchaInput: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [attempts, setAttempts] = useState<number>(3);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [currentCaptcha, setCurrentCaptcha] = useState<string>('');

  // Set captcha saat komponen pertama kali di-render
  useEffect(() => {
    setCurrentCaptcha(generateCaptcha());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Hapus error saat user mulai mengetik lagi
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const refreshCaptcha = () => {
    setCurrentCaptcha(generateCaptcha());
    setFormData((prev) => ({ ...prev, captchaInput: '' }));
  };

  const handleResetAttempts = () => {
    setAttempts(3);
    toast.success('Kesempatan login berhasil direset!', { theme: 'dark', position: 'top-right' });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Cek jika kesempatan sudah habis
    if (attempts <= 0) {
      toast.error('Login gagal / kesempatan login habis', { theme: 'dark', position: 'top-right' });
      return;
    }

    const newErrors: { [key: string]: string } = {};
    
    // Validasi Email (harus sesuai 4 digit terakhir NPM)
    if (!formData.email.trim()) {
      newErrors.email = 'Email tidak boleh kosong';
    } else if (formData.email !== '2905@gmail.com') {
      newErrors.email = 'Email harus 2905@gmail.com';
    }

    // Validasi Password (harus sesuai Full NPM)
    if (!formData.password.trim()) {
      newErrors.password = 'Password tidak boleh kosong';
    } else if (formData.password !== '241712905') {
      newErrors.password = 'Password salah (harus sesuai NPM: 241712905)';
    }

    // Validasi Captcha
    if (!formData.captchaInput.trim()) {
      newErrors.captcha = 'Captcha belum diisi';
    } else if (formData.captchaInput !== currentCaptcha) {
      newErrors.captcha = 'Captcha salah';
    }

    // Jika ada error (login gagal)
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const newAttempts = attempts - 1;
      setAttempts(newAttempts);
      
      if (newAttempts > 0) {
        toast.error(`Login Gagal. Sisa kesempatan: ${newAttempts}`, { theme: 'dark', position: 'top-right' });
      } else {
        toast.error('Login gagal / kesempatan login habis', { theme: 'dark', position: 'top-right' });
      }
    } else {
      // Jika lolos semua validasi (Login Berhasil)
      localStorage.setItem('isLoggedIn', 'true');
      toast.success('Login Berhasil!', { theme: 'dark', position: 'top-right' });
      router.push('/home');
    }
  };

  return (
    <AuthFromWrapper title="Login">
      <div className="text-center mb-4 text-sm text-gray-600">
        Sisa kesempatan: {attempts}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Input Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500`}
            placeholder="Masukkan email (contoh: 2905@gmail.com)"
            disabled={attempts === 0}
          />
          {errors.email && <p className="text-red-500 text-sm italic mt-1">{errors.email}</p>}
        </div>

        {/* Input Password */}
        <div className="space-y-2 relative">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500`}
              placeholder="Masukkan password (contoh: 241712905)"
              disabled={attempts === 0}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 hover:text-blue-600"
              disabled={attempts === 0}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm italic mt-1">{errors.password}</p>}
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center text-gray-700">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="mr-2 rounded border-gray-300"
              disabled={attempts === 0}
            />
            Ingat Saya
          </label>
          <Link href="#" className="text-blue-600 hover:text-blue-800 font-semibold">Forgot password?</Link>
        </div>

        {/* Input Captcha */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Captcha:</span>
            <span className="font-mono text-lg font-bold text-gray-900 bg-gray-100 px-3 py-1.5 rounded select-none">
              {currentCaptcha}
            </span>
            <FaSync 
              className={`cursor-pointer text-gray-600 hover:text-blue-600 transition-transform hover:rotate-180 duration-300 ${attempts === 0 ? 'pointer-events-none opacity-50' : ''}`} 
              onClick={refreshCaptcha} 
            />
          </div>
          <input
            type="text"
            name="captchaInput"
            value={formData.captchaInput}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.captcha ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500`}
            placeholder="Masukkan captcha di atas"
            disabled={attempts === 0}
          />
          {errors.captcha && <p className="text-red-500 text-sm italic mt-1">{errors.captcha}</p>}
        </div>

        {/* Tombol Sign In */}
        <button
          type="submit"
          disabled={attempts === 0}
          className={`w-full font-semibold py-2.5 px-4 rounded-lg transition-colors ${attempts === 0 ? 'bg-gray-400 cursor-not-allowed text-gray-200' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'}`}
        >
          Sign In
        </button>

        {/* Tombol Reset Kesempatan */}
        <button
          type="button"
          disabled={attempts > 0}
          onClick={handleResetAttempts}
          className={`w-full font-semibold py-2.5 px-4 rounded-lg transition-colors ${attempts > 0 ? 'bg-gray-300 cursor-not-allowed text-gray-500' : 'bg-green-500 hover:bg-green-600 text-white shadow-md'}`}
        >
          Reset Kesempatan
        </button>

        <SocialAuth />

        <p className="mt-6 text-center text-sm text-gray-600">
          Tidak punya akun?{' '}
          <Link href="/auth/register" className="text-blue-600 hover:text-blue-800 font-semibold">Daftar</Link>
        </p>
      </form>
    </AuthFromWrapper>
  );
}