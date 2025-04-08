import { config } from 'dotenv';

config({ path: '.env.production.local' });

export const { PORT } = process.env;