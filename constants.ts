import 'dotenv/config'
export default {
  APP: parseInt(process.env.APP as string) || 3000,
  SERVER: parseInt(process.env.SERVER as string) || 3001,
  RUNNING_VITE_SERVER: process.env.RUNNING_VITE_SERVER === 'true',
  PROXY_SERVER: parseInt(process.env.PROXY_SERVER) || undefined,
}