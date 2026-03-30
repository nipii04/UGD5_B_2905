'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; 
import { FaArrowLeft } from 'react-icons/fa';


import NotAuthorizedImage from './R.jpg';

export default function NotAuthorized() {
  const router = useRouter();


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative bg-transparent">
      
      <div className="bg-[#9cb6fa] p-6 rounded-3xl shadow-2xl text-center w-full max-w-sm flex flex-col items-center border border-white/20 animate-fade-in">
        
        <div className="w-full h-44 relative mb-5 overflow-hidden rounded-2xl shadow-inner border border-black/10">
          <Image 
            src={NotAuthorizedImage} 
            alt="Akses Ditolak - Belum Login" 
            fill 
            className="object-cover" 
            priority 
          />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5 drop-shadow-sm">
          <span className="text-red-500">❌</span> Anda belum login
        </h1>
        
        <p className="mt-2 text-sm text-gray-700 font-medium px-2">
          Halaman ini dikunci. Silakan login terlebih dahulu untuk mengakses game.
        </p>

        <button 
          onClick={() => router.push('/auth/login')} 
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5 shadow-lg"
        >
          <FaArrowLeft className="text-xs" /> Kembali ke Halaman Login
        </button>

      </div>
    </div>
  );
}