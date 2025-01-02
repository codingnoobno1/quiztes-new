'use client'; // Mark this file as a client component

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut, SessionProvider } from 'next-auth/react';

function Welcome() {
  const router = useRouter();
  const { data: session, status } = useSession(); // Reactively monitor session state

  // Redirect based on session status
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login'); // Redirect to login if not authenticated
    }
  }, [status, router]);

  // Logout handler
  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-tl from-green-900 via-black to-transparent">
      {status === 'authenticated' && session?.user ? (
        <div className="flex flex-col items-center space-y-6">
          {/* User Information Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h1 className="text-4xl text-black font-bold mb-4">
              Welcome, {session.user.name || 'User'}!
            </h1>
            <div className="text-black text-lg mb-6">
              <p><strong>Enrollment Number:</strong> {session.user.id}</p>
              <p><strong>Course:</strong> {session.user.course}</p>
              <p><strong>Semester:</strong> {session.user.semester}</p>
              <p><strong>Email:</strong> {session.user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 bg-red-500 text-white rounded-full font-medium shadow-md transform hover:scale-105 transition-all duration-300"
            >
              Logout
            </button>
          </div>

          {/* Quiz Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-3xl text-black font-bold mb-4">KBC Quiz</h2>
            <img src="/kbc.jpg" alt="KBC" className="w-full h-auto rounded-lg shadow-md mb-4" />
            <button
              onClick={() => router.push('/quiz')}
              className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black rounded-full text-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Start Quiz
            </button>
          </div>
        </div>
      ) : (
        <p className="text-white">Loading...</p>
      )}
    </div>
  );
}

// Wrap Welcome in SessionProvider
export default function App() {
  return (
    <SessionProvider>
      <Welcome />
    </SessionProvider>
  );
}
