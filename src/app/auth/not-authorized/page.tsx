'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

export default function NotAuthorized() {
  const router = useRouter();

  // Redirect otomatis setelah 3 detik
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/auth/login');
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 p-4 relative">
      
      <div className="bg-[#9cb6fa] p-5 rounded-2xl shadow-2xl text-center w-full max-w-sm flex flex-col items-center">
        
        <img 
          src="https://media.tenor.com/n14M58g1K3YAAAAC/traffic-cars.gif" 
          alt="Belum Login" 
          className="w-full h-44 object-cover rounded-xl mb-4 shadow-sm"
        />

        {/* Teks Judul */}
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <span className="text-red-500">❌</span> Anda belum login
        </h1>
        
        {/* Sub Teks */}
        <p className="mt-1.5 text-sm text-gray-700 font-medium">
          Silakan login terlebih dahulu
        </p>

        {/* Tombol Kembali */}
        <button 
          onClick={() => router.push('/auth/login')} 
          className="mt-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2 rounded-lg transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-md"
        >
          <FaArrowLeft className="text-xs" /> Kembali
        </button>

      </div>
    </div>
  );
}