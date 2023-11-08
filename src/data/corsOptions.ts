import { CorsOptions } from 'cors'

export const corsOptions: CorsOptions = {
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://localhost:5173',
    'https://tania-troshchuk.github.io',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type, Authorization'],
  credentials: true,
}
