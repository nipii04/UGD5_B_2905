'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Game1 from "@/components/Game1";
import GameTebakAngka from "@/components/GameTebakAngka";
import { FaPowerOff } from "react-icons/fa"; // Import icon power untuk tombol logout

export default function Home() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [activeGame, setActiveGame] = useState<string | null>(null);

  useEffect(() => {

    const loggedIn = localStorage.getItem('isLoggedIn');
    if (!loggedIn) {
      router.push('/auth/not-authorized');
    } else {
      setIsAuth(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/auth/login');
  };

  if (!isAuth) return null;

  return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 relative overflow-hidden">
      
      {/* Header */}
      <div className="absolute top-10 flex flex-col items-center w-full z-20">
        <h1 className="text-4xl font-bold text-white tracking-wide mb-4 drop-shadow-md">
          Selamat Datang!
        </h1>
        <button 
          onClick={handleLogout} 
          className="bg-red-500 hover:bg-red-600 text-white p-3.5 rounded-full transition-transform hover:scale-110 active:scale-95 shadow-lg flex items-center justify-center"
          title="Logout"
        >
          <FaPowerOff size={22} />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="w-full flex flex-col items-center justify-center mt-32 z-10 px-4">
        
        {/* Menu Pilihan Game */}
        {!activeGame && (
          <div className="bg-[#111827] p-10 rounded-2xl shadow-2xl flex flex-col items-center text-center w-full max-w-lg border border-gray-800 animate-fade-in">
            <h2 className="text-3xl font-bold text-white mb-8">Choose Your Game</h2>
            
            <div className="flex flex-wrap gap-5 justify-center mb-6">
              {/* Tombol Game 1 */}
              <button 
                onClick={() => setActiveGame('game1')}
                className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-3 px-6 rounded-xl shadow-[0_5px_0_#c2410c] hover:shadow-[0_2px_0_#c2410c] hover:translate-y-[3px] active:shadow-none active:translate-y-[5px] transition-all flex items-center gap-2"
              >
                Tap the Mouse 🐭
              </button>

              {/* Tombol Game 2*/}
              <button 
                onClick={() => setActiveGame('gameTebakAngka')}
                className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-xl shadow-[0_5px_0_#15803d] hover:shadow-[0_2px_0_#15803d] hover:translate-y-[3px] active:shadow-none active:translate-y-[5px] transition-all flex items-center gap-2"
              >
                Tebak Angka 🎯
              </button>
            </div>
            
            <p className="text-gray-400 text-sm mt-4 italic">
              Pick one to start playing and reduce lag!
            </p>
          </div>
        )}

        {/* Render Game 1 */}
        {activeGame === 'game1' && (
          <div className="flex flex-col items-center animate-fade-in w-full">
            <Game1 />
            <button 
              onClick={() => setActiveGame(null)}
              className="mt-8 bg-[#111827] hover:bg-gray-800 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors border border-gray-700 shadow-md"
            >
              Back to Game Selection
            </button>
          </div>
        )}

        {/* Render Game 2*/}
        {activeGame === 'gameTebakAngka' && (
          <div className="flex flex-col items-center animate-fade-in w-full">
            <GameTebakAngka />
            <button 
              onClick={() => setActiveGame(null)}
              className="mt-8 bg-[#111827] hover:bg-gray-800 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors border border-gray-700 shadow-md"
            >
              Back to Game Selection
            </button>
          </div>
        )}

      </div>
    </div>
  );
}