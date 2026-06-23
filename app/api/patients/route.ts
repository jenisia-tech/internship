import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import { Patient } from '@/models/Patient';

export async function GET() {
  await dbConnect();

  const patients = await Patient.find();

  return NextResponse.json(patients);
}

export async function POST(req: Request) {
  await dbConnect();

  const data = await req.json();

  const patient = await Patient.create(data);

  return NextResponse.json(patient);
}
