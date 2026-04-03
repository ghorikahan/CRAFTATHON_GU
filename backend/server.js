import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import dns from 'dns';

// Force DNS to Google (Bypasses local Windows blocks for Atlas)
dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

// Cloud-Survivor Connection
const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;

  try {
    console.log(`[DATABASE] Forcing Master DNS...`);
    await mongoose.connect(mongoURI, {
      family: 4, 
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 15000,
    });
    console.log(`[DATABASE] SUCCESS: Connected to BehaveGuard Cloud 🛡️`);
  } catch (error) {
    console.warn(`[DATABASE] Master DNS Failed: ${error.message}`);
    console.log(`[DATABASE] Switching to Local Emergency Storage...`);
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/behaveguard');
      console.log(`[DATABASE] Readiness: Local Backup Active`);
    } catch (localError) {
      console.error(`[DATABASE] Critical Failure: No database detected.`);
    }
  }
};

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('Secure API Active'));

// Global Shield
app.use((err, req, res, next) => {
  console.error('[CRASH PREVENTED]', err.stack);
  res.status(500).json({ success: false, message: 'Internal Engine Exception' });
});

const PORT = 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`[SERVER] Success: API Port ${PORT}`);
  console.log(`[EMAIL] System: Ready for ${process.env.EMAIL_USER}`);
});
