'use client'; 

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import io from 'socket.io-client';

export default function QuizStarted() {
  const [socket, setSocket] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false); 
  const [quizData, setQuizData] = useState<any>(null); 
  const router = useRouter();

  // Establish WebSocket connection on component mount
  useEffect(() => {
    const socketConnection = io('http://localhost:8000'); 
    setSocket(socketConnection);

    socketConnection.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to WebSocket server');
    });

    socketConnection.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from WebSocket server');
    });

 
    socketConnection.on('quizUpdate', (data) => {
      console.log('Received quiz update:', data);
      setQuizData(data);
    });

    return () => {
      socketConnection.close();
    };
  }, []);

 
  const endQuiz = () => {
    if (socket && isConnected) {
      socket.emit('endQuiz', { quizId: 123 }); 
    }
    router.push('/'); 
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-tl from-blue-900 via-black to-transparent">
      <h1 className="text-4xl text-white font-bold mb-6">Quiz in Progress!</h1>
      {quizData ? (
        <div className="text-white mb-6">
          <p className="text-xl">Quiz Question: {quizData.question}</p>
          <ul className="mt-4 space-y-2">
            {quizData.options.map((option: string, index: number) => (
              <li key={index} className="bg-white text-black px-4 py-2 rounded-lg">
                {option}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-white">Waiting for quiz data...</p>
      )}
      <button
        onClick={endQuiz}
        className="px-6 py-3 bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-black rounded-full text-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
      >
        End Quiz
      </button>
      {isConnected ? (
        <p className="text-white mt-4">Connected to WebSocket server</p>
      ) : (
        <p className="text-white mt-4">Connecting to WebSocket server...</p>
      )}
    </div>
  );
}
