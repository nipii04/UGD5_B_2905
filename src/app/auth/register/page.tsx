'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthFromWrapper from '@/components/AuthFormWrapper';
import SocialAuth from '@/components/SocialAuth';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaSync } from 'react-icons/fa';

const generateCaptcha = () => Math.random().toString(36).substring(2, 8);

export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
  const [currentCaptcha, setCurrentCaptcha] = useState<string>('');
  const [captchaInput, setCaptchaInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [strength, setStrength] = useState<number>(0);

  const passwordValue = watch('password') || '';

  useEffect(() => {
    setCurrentCaptcha(generateCaptcha());
  }, []);

  useEffect(() => {
    const pwd = passwordValue || '';
    const str = Math.min(
      (pwd.length > 7 ? 25 : 0) +
      (/[A-Z]/.test(pwd) ? 25 : 0) +
      (/[0-9]/.test(pwd) ? 25 : 0) +
      (/[^A-Za-z0-9]/.test(pwd) ? 25 : 0),
      100
    );
    setStrength(str);
  }, [passwordValue]);

  const refreshCaptcha = () => {
    setCurrentCaptcha(generateCaptcha());
    setCaptchaInput('');
  };

  const onSubmit = (data: any) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Konfirmasi password tidak cocok!', { theme: 'dark' });
      return;
    }
    if (captchaInput !== currentCaptcha) {
      toast.error('Captcha salah!', { theme: 'dark' });
      return;
    }

    toast.success('Register Berhasil!', { theme: 'dark', position: 'top-right' });
    router.push('/auth/login');
  };

  return (
    <AuthFromWrapper title="Register">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Username <span className="text-gray-500 text-xs">(3-8 karakter)</span></label>
          <input
            {...register('username', { 
              required: 'Username wajib diisi',
              minLength: { value: 3, message: 'Minimal 3 karakter' },
              maxLength: { value: 8, message: 'Maksimal 8 karakter' }
            })}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.username ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500`}
            placeholder="Masukkan username"
          />
          {errors.username && <p className="text-red-500 text-sm italic mt-1">{errors.username.message as string}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            {...register('email', { 
              required: 'Email wajib diisi',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|co)$/,
                message: 'Format email tidak valid (harus mengandung @ dan diakhiri .com/.net/.co)'
              }
            })}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500`}
            placeholder="Masukkan email"
          />
          {errors.email && <p className="text-red-500 text-sm italic mt-1">{errors.email.message as string}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Nomor Telepon</label>
          <input
            type="tel"
            {...register('nomortelp', { 
              required: 'Nomor telepon wajib diisi',
              minLength: { value: 10, message: 'Minimal 10 karakter' },
              pattern: { value: /^[0-9]+$/, message: 'Hanya boleh berisi angka' }
            })}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.nomortelp ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500`}
            placeholder="Masukkan nomor telepon"
          />
          {errors.nomortelp && <p className="text-red-500 text-sm italic mt-1">{errors.nomortelp.message as string}</p>}
        </div>

        <div className="space-y-2 relative">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password', { 
                required: 'Password wajib diisi',
                minLength: { value: 8, message: 'Minimal 8 karakter' }
              })}
              className={`w-full px-4 py-2.5 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500`}
              placeholder="Masukkan password"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-500">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2">
            <div className={`h-1.5 rounded-full ${strength === 100 ? 'bg-green-500' : strength >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${strength}%`, transition: 'width 0.3s' }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">Strength: {strength}%</p>
          {errors.password && <p className="text-red-500 text-sm italic mt-1">{errors.password.message as string}</p>}
        </div>

        <div className="space-y-2 relative">
          <label className="text-sm font-medium text-gray-700">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              {...register('confirmPassword', { required: 'Konfirmasi password wajib diisi' })}
              className={`w-full px-4 py-2.5 rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500`}
              placeholder="Masukkan ulang password"
            />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3 text-gray-500">
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-sm italic mt-1">{errors.confirmPassword.message as string}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Captcha:</span>
            <span className="font-mono text-lg font-bold text-gray-900 bg-gray-100 px-3 py-1.5 rounded select-none">
              {currentCaptcha}
            </span>
            <FaSync className="cursor-pointer text-gray-600 hover:text-blue-600" onClick={refreshCaptcha} />
          </div>
          <input
            type="text"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Masukkan captcha"
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg mt-4">
          Register
        </button>

        <SocialAuth />

        <p className="mt-6 text-center text-sm text-gray-600">
          Sudah punya akun? <Link href="/auth/login" className="text-blue-600 hover:text-blue-800 font-semibold">Login</Link>
        </p>
      </form>
    </AuthFromWrapper>
  );
}