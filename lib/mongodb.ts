import mongoose from 'mongoose';

// Define the connection structure
interface Cached {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Initialize the cached variable
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cached: Cached = (global as any).mongoose || { conn: null, promise: null };

// Store in global to reuse the connection
// eslint-disable-next-line @typescript-eslint/no-explicit-any
if (!(global as any).mongoose) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).mongoose = cached;
}

// Get MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Connect to MongoDB using Mongoose
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
async function connectDB() {
  // If there's already a connection, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If there's no existing connection promise, create one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  // Try to resolve the connection promise
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB; 