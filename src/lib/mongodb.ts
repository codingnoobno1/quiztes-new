import mongoose from 'mongoose';

// MongoDB connection URI
const uri = 'mongodb://localhost:27017/pixelclub'; // Your main DB name

let isConnected = false;

export const connectToDatabase = async () => {
  if (isConnected) {
    // Already connected, no need to reconnect
    return;
  }

  try {
    // Establish connection to MongoDB
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};
