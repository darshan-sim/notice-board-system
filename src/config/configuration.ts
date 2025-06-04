export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  database: {
    host: process.env.DATABASE_HOST ?? 'localhost',
    port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
    username: process.env.DATABASE_USERNAME ?? 'postgres',
    password: process.env.DATABASE_PASSWORD ?? 'dev-secret',
    name: process.env.DATABASE_NAME ?? 'notice-sys',
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? 'default-secret-key',
  },
});
