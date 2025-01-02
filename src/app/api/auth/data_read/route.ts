import { NextRequest, NextResponse } from 'next/server';
import { getUserDataByEmail } from '../../auth/[...nextauth]/dashboard_data'; // Adjusted path

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json(
      { error: 'Email is required and must be a string.' },
      { status: 400 }
    );
  }

  try {
    const user = await getUserDataByEmail(email);
    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
