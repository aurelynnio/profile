import 'dotenv/config';

const required = (name: string) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}`,
    );
  }
  return value;
};

export const config = {
  port: Number(process.env.PORT || 4000),
  clientOrigin:
    process.env.CLIENT_ORIGIN ||
    'http://localhost:3001',
  supabaseUrl: required('SUPABASE_URL'),
  supabaseSecretKey: required(
    'SUPABASE_SECRET_KEY',
  ),
  databaseUrl: required('DATABASE_URL'),
  adminEmails: new Set(
    (process.env.ADMIN_EMAILS || '')
      .split(',')
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  ),
};
