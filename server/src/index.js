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
  allowMethods: ['GET', 'POST', 'PUT'],
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

// 3. Pragma
router.get('/api/pragma', async (ctx) => {
  ctx.status = 200;
  ctx.body = 111111111;
  ctx.set('Pragma', 'no-cache');
});

// 4. Last-Modified / If-Modified-Since
const lastModified = 'Thu, 09 Nov 2023 06:37:41 GMT'
router.put('/api/last-modified', async (ctx) => {
  // 客户端本地缓存最新更改时间和当前的一致 => 让客户端直接使用缓存吧
  if (ctx.request.header['if-modified-since'] === lastModified) {
    ctx.status = 304;
    ctx.body = '2222'
  } else {
    // 返回最新内容
    ctx.status = 200;
    ctx.body = '111111111'
  }

  ctx.set('Last-Modified', lastModified);
  ctx.set('Cache-Control', 'no-cache');
});

// 5. ETag / If-None-Match
const ETag = '33a64df551425fcc55e4d42a148795d9f25f89d4'
router.get('/api/etag', async (ctx) => {
  // 客户端本地缓存最新 ETag 和当前的一致 => 让客户端直接使用缓存吧
  if (ctx.request.header['if-none-match'] === ETag) {
    ctx.status = 304;
    ctx.body = '2222'
  } else {
    // 返回最新内容
    ctx.status = 200;
    ctx.body = '111111111'
  }

  ctx.set('ETag', ETag);
  ctx.set('Cache-Control', 'no-cache');
});


app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);