import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';      // ← add this!
import { getUserByEmail } from '@/lib/models/user';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const user = await getUserByEmail(email);

  if (!user || user.password !== password) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  return NextResponse.json({ token });
}