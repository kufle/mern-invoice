import chalk from 'chalk';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import connectionToDB from './config/connectDB.js';
import { morganMiddleware, systemLogs } from './utils/Logger.js';
import mongoSanitize from 'express-mongo-sanitize';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { apiLimiter } from './middleware/apiLimiter.js';
import passport from 'passport';
import googleAuth from './config/passportSetup.js';

const startServer = async () => {
  await connectionToDB();

  const app = express();

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(passport.initialize());
  app.use(cookieParser());
  app.use(mongoSanitize());
  app.use(morganMiddleware);

  googleAuth();

  app.get('/api/v1/test', (req, res) => {
    res.json({ hi: 'welcome to invoice app' });
  });

  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/user', apiLimiter, userRoutes);

  app.use(notFound);
  app.use(errorHandler);

  const PORT = process.env.PORT || 1997;

  app.listen(PORT, () => {
    console.log(
      `${chalk.green.bold('✅')} 👍 Server running in ${chalk.yellow.bold(process.env.NODE_ENV)} mode on port ${chalk.blue.bold(PORT)}`
    );
    systemLogs.info(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
  });
};

//start server
startServer().catch((error) => {
  console.error(chalk.red('Failed to start the server'));
  console.error(error);
  systemLogs.error('Failed to start the server', error);
});
