import { config } from 'dotenv';

config({ path: '.env.production.local' });

export const { PORT, DB_URI, SMTP_USER, SMTP_PASS, SEC_KEY, PUB_KEY, CHAT_API_KEY, SYSTEM_WALLET_MN, SYSTEM_WALLET_ADDR } = process.env;

