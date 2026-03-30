'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Game1 from "@/components/Game1";
import GameTebakAngka from "@/components/GameTebakAngka";

export default function Home() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
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
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen bg-gradient-to-br from-blue-900 to-indigo-900 relative">
      
      {/* Header */}
      <div className="w-full flex justify-between items-center px-10 pt-5 absolute top-0">
        <h1 className="text-3xl font-bold text-white tracking-wider">Selamat Datang!</h1>
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl font-bold transition-transform hover:scale-105 shadow-lg">
          Logout ⏻
        </button>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-4xl flex flex-col items-center justify-center mt-16">
        
        {/* Menu Pilihan Game */}
        {!activeGame && (
          <div className="bg-gray-900/60 backdrop-blur-md p-10 rounded-3xl border border-gray-700 shadow-2xl flex flex-col items-center text-center animate-fade-in">
            <h2 className="text-4xl font-extrabold text-white mb-8">Choose Your Game</h2>
            
            <div className="flex flex-wrap gap-6 justify-center mb-6">
              <button 
                onClick={() => setActiveGame('game1')}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-2xl shadow-[0_6px_0_#1d4ed8] hover:shadow-[0_4px_0_#1d4ed8] hover:translate-y-[2px] active:shadow-none active:translate-y-[6px] transition-all text-xl"
              >
                Tap the Mouse 🐭
              </button>

              <button 
                onClick={() => setActiveGame('gameTebakAngka')}
                className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-4 px-8 rounded-2xl shadow-[0_6px_0_#047857] hover:shadow-[0_4px_0_#047857] hover:translate-y-[2px] active:shadow-none active:translate-y-[6px] transition-all text-xl"
              >
                Tebak Angka 🎯
              </button>
            </div>
          </div>
        )}

        {/* Render Game 1 */}
        {activeGame === 'game1' && (
          <div className="flex flex-col items-center animate-fade-in">
            <Game1 />
            <button 
              onClick={() => setActiveGame(null)}
              className="mt-8 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              ← Back to Game Selection
            </button>
          </div>
        )}

        {/* Render Game Bonus */}
        {activeGame === 'gameTebakAngka' && (
          <div className="flex flex-col items-center animate-fade-in">
            <GameTebakAngka />
            <button 
              onClick={() => setActiveGame(null)}
              className="mt-8 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              ← Back to Game Selection
            </button>
          </div>
        )}

      </div>
    </div>
  );
}