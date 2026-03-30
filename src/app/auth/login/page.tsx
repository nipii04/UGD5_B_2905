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

  const [errors, setErrors] = useState<any>({});
  const [attempts, setAttempts] = useState(3);
  const [showPassword, setShowPassword] = useState(false);
  const [currentCaptcha, setCurrentCaptcha] = useState('');

  // Set captcha saat komponen pertama kali di-render
  useEffect(() => {
    setCurrentCaptcha(generateCaptcha());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev: any) => ({ ...prev, [name]: '' }));
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

    if (attempts <= 0) {
      toast.error('Login gagal / kesempatan login habis', { theme: 'dark', position: 'top-right' });
      return;
    }

    const newErrors: any = {};
    const emailPrefix = formData.email.split('@')[0];
    const emailRegex = /^\d{4}@gmail\.com$/;
    
    // Validasi Email
    if (!formData.email.trim()) {
      newErrors.email = 'Email tidak boleh kosong';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Format email harus [4-digit-NPM]@gmail.com';
    }

    // Validasi Password
    if (!formData.password.trim()) {
      newErrors.password = 'Password tidak boleh kosong';
    } else if (formData.password !== `22071${emailPrefix}`) {
      newErrors.password = 'Password salah (harus 22071 + 4 digit NPM email)';
    }

    // Validasi Captcha
    if (!formData.captchaInput.trim()) {
      newErrors.captcha = 'Captcha belum diisi';
    } else if (formData.captchaInput !== currentCaptcha) {
      newErrors.captcha = 'Captcha salah';
    }

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
      // Login Berhasil
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
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500`}
            placeholder="Masukkan email"
            disabled={attempts === 0}
          />
          {errors.email && <p className="text-red-500 text-sm italic mt-1">{errors.email}</p>}
        </div>

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
              placeholder="Masukkan password"
              disabled={attempts === 0}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
              disabled={attempts === 0}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm italic mt-1">{errors.password}</p>}
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center text-gray-700">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={(e) => setFormData((prev) => ({ ...prev, rememberMe: e.target.checked }))}
              className="mr-2 rounded border-gray-300"
              disabled={attempts === 0}
            />
            Ingat Saya
          </label>
          <Link href="#" className="text-blue-600 hover:text-blue-800 font-semibold">Forgot password?</Link>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Captcha:</span>
            <span className="font-mono text-lg font-bold text-gray-900 bg-gray-100 px-3 py-1.5 rounded select-none">
              {currentCaptcha}
            </span>
            <FaSync className={`cursor-pointer text-gray-600 hover:text-blue-600 ${attempts === 0 ? 'pointer-events-none opacity-50' : ''}`} onClick={refreshCaptcha} />
          </div>
          <input
            type="text"
            name="captchaInput"
            value={formData.captchaInput}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.captcha ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500`}
            placeholder="Masukkan captcha"
            disabled={attempts === 0}
          />
          {errors.captcha && <p className="text-red-500 text-sm italic mt-1">{errors.captcha}</p>}
        </div>

        <button
          type="submit"
          disabled={attempts === 0}
          className={`w-full font-semibold py-2.5 px-4 rounded-lg transition-colors ${attempts === 0 ? 'bg-gray-400 cursor-not-allowed text-gray-200' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
        >
          Sign In
        </button>

        <button
          type="button"
          disabled={attempts > 0}
          onClick={handleResetAttempts}
          className={`w-full font-semibold py-2.5 px-4 rounded-lg transition-colors ${attempts > 0 ? 'bg-gray-400 cursor-not-allowed text-gray-200' : 'bg-green-500 hover:bg-green-600 text-white'}`}
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