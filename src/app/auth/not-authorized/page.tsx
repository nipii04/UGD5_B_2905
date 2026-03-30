'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotAuthorized() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/auth/login');
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 w-full p-10">
      <div className="bg-blue-100 text-black p-8 rounded-xl shadow-lg text-center w-full max-w-md">
        <h1 className="text-2xl font-bold text-red-600 mb-2">❌ Anda belum login</h1>
        <p className="mb-6 text-gray-600">Silakan login terlebih dahulu untuk mengakses game.</p>
        <button 
          onClick={() => router.push('/auth/login')} 
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors"
        >
          Kembali
        </button>
      </div>
    </div>
  );
}