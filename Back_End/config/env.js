import { config } from 'dotenv';

config({ path: '.env.production.local' });

export const { PORT, DB_URI } = process.env;