import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Patient } from "@/models/Patient";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  const { id } = await context.params;
  const patient = await Patient.findById(id);

  return NextResponse.json(patient);
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  const { id } = await context.params;
  const data = await req.json();

  const patient = await Patient.findByIdAndUpdate(id, data, {
    new: true,
  });

  return NextResponse.json(patient);
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  const { id } = await context.params;

  await Patient.findByIdAndDelete(id);

  return NextResponse.json({ message: "Patient deleted" });
}