const Koa = require('koa');
const moment = require('moment');
const cors = require('@koa/cors')
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();

// 跨域设置
app.use(cors({
  maxAge: 5,
  origin: "*",
  credentials: true,
  allowMethods: ['GET', 'POST'],
  allowHeaders: ['Content-Type'],
  exposeHeaders: ['Content-Type'],
}));

// 1. expires
router.get('/api/expires', async (ctx) => {
  ctx.status = 200;
  ctx.body = 111111111;
  ctx.set('expires', `${moment().utc().add(2, 'm').format('ddd, DD MMM YYYY HH:mm:ss')} GMT`);
});

// 2. Cache-Control
router.get('/api/cache-control', async (ctx) => {
  ctx.status = 200;
  ctx.body = 111111111;
  ctx.set('Cache-Control', `public,max-age=120`);
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);