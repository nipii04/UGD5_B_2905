'use client';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function GameTebakAngka() {
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [guess, setGuess] = useState<string>('');
  const [message, setMessage] = useState<string>('Tebak angka antara 1 sampai 100!');
  const [attempts, setAttempts] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  useEffect(() => {
    generateRandomNumber();
  }, []);

  const generateRandomNumber = () => {
    const random = Math.floor(Math.random() * 100) + 1;
    setTargetNumber(random);
    setAttempts(0);
    setIsGameOver(false);
    setMessage('Tebak angka antara 1 sampai 100!');
    setGuess('');
  };

  const handleGuess = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isGameOver) return;

    if (!guess) {
      toast.warning('Masukkan angka terlebih dahulu!', { autoClose: 1500 });
      return;
    }

    const guessNumber = parseInt(guess, 10);
    
    if (isNaN(guessNumber) || guessNumber < 1 || guessNumber > 100) {
      toast.warning('Masukkan angka yang valid (1-100)!', { autoClose: 1500 });
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (guessNumber === targetNumber) {
      setMessage(`🎉 Benar! Angkanya adalah ${targetNumber}.`);
      setIsGameOver(true);
      toast.success(`Hebat! Kamu menebak dalam ${newAttempts} percobaan.`, { theme: 'dark' });
    } else if (guessNumber < targetNumber) {
      setMessage('📈 Terlalu Kecil! Coba angka yang lebih besar.');
    } else {
      setMessage('📉 Terlalu Besar! Coba angka yang lebih kecil.');
    }
    
    setGuess('');
  };

  return (
    <div className="flex flex-col items-center bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md text-gray-800">
      <h2 className="text-3xl font-bold mb-2 text-blue-600">Tebak Angka 🎯</h2>
      <p className="text-sm mb-6 text-gray-500 font-medium text-center">{message}</p>

      <div className="bg-blue-50 w-full rounded-xl p-4 mb-6 text-center shadow-inner border border-blue-100">
        <p className="text-xl font-bold text-blue-800">Percobaan: {attempts}</p>
      </div>

      <form onSubmit={handleGuess} className="w-full flex flex-col gap-4">
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          disabled={isGameOver}
          placeholder="Masukkan tebakanmu..."
          className="w-full px-4 py-3 text-center text-xl rounded-xl border-2 border-gray-300 focus:outline-none focus:border-blue-500 disabled:bg-gray-100 transition-colors"
        />
        
        {!isGameOver ? (
          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-transform hover:scale-[1.02] active:scale-95 shadow-md"
          >
            Tebak!
          </button>
        ) : (
          <button 
            type="button"
            onClick={generateRandomNumber}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl transition-transform hover:scale-[1.02] active:scale-95 shadow-md animate-bounce"
          >
            Main Lagi 🔄
          </button>
        )}
      </form>
    </div>
  );
}