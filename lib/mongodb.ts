import mongoose from 'mongoose';

let cached = (global as any)._mongoose || ((global as any)._mongoose = {
  conn: null,
});

export async function dbConnect() {
  if (cached.conn) return cached.conn;

  cached.conn = await mongoose.connect(
    process.env.MONGODB_URI!
  );

  return cached.conn;
}