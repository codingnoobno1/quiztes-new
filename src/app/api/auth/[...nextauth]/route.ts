import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUserDataByEmail } from './dashboard_data'; // Import the function from dashboard_data.ts

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required.');
        }

        // Fetch user data by email
        const user = await getUserDataByEmail(credentials.email);

        if (!user) {
          throw new Error('Invalid credentials.');
        }

        // Verify password (plaintext here; in production, hash and compare)
        if (user.password !== credentials.password) {
          throw new Error('Invalid password.');
        }

        // Return user object for session
        return {
          id: user.enrollmentNumber, // Use enrollmentNumber as the unique identifier
          email: user.email,
          name: user.name,
          course: user.course,
          semester: user.semester,
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin', // Custom sign-in page (optional)
  },
  session: {
    strategy: 'jwt', // Use JWT for session management
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.enrollmentNumber = user.enrollmentNumber;
        token.course = user.course;
        token.semester = user.semester;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name,
        enrollmentNumber: token.enrollmentNumber,
        course: token.course,
        semester: token.semester,
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is set in your .env
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
