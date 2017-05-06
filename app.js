const Koa = require('koa');
const serve = require('koa-static');
const views = require('koa-views');
const Router = require('koa-router');
const queryString = require('query-string');
const app = new Koa();
const router = new Router();
const service = require('./service/webAppService');
const PORT = process.env.PORT || 3001;

//  CORS 
app.use(async(ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  ctx.set("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  await next();
});

// 静态资源
app.use(serve(__dirname + '/public', {maxage: 0}));

// 模板
app.use(views(__dirname + '/views', {extension: 'pug'}));

// 路由
router.get('/', async(ctx) => {
  ctx.state = {
    title: 'API说明',
    items: [{
      url: '/api/home',
      desc: '首页'
    }, {
      url: '/api/rank',
      desc: '排行'
    }, {
      url: '/api/category',
      desc: '分类'
    }, {
      url: '/api/bookbacket',
      desc: '书架'
    }, {
      url: '/api/male',
      desc: '男频'
    }, {
      url: '/api/female',
      desc: '女频'
    }, {
      url: '/api/search?keyword=爱情',
      desc: '搜索'
    }, {
      url: '/api/book?id=18218',
      desc: '书籍信息'
    }]
  };
  await ctx.render('index')
});

router.get('/api/home', (ctx) => {
  ctx.body = JSON.parse(service.get_home_data());
});

router.get('/api/rank', (ctx) => {
  ctx.body = JSON.parse(service.get_rank_data());
});

router.get('/api/category', (ctx) => {
  ctx.body = JSON.parse(service.get_category_data());
});

router.get('/api/bookbacket', (ctx) => {
  ctx.body = JSON.parse(service.get_bookbacket_data());
});

router.get('/api/male', (ctx) => {
  ctx.body = JSON.parse(service.get_male_data());
});

router.get('/api/female', (ctx) => {
  ctx.body = JSON.parse(service.get_female_data());
});

router.get('/api/search', async(ctx) => {
  let qs = queryString.parse(ctx.request.url.split('?')[1]);
  let {start, end, keyword} = qs;
  ctx.body = await service.get_search_data(start, end, keyword);
});

router.get('/api/book', async(ctx) => {
  let qs = queryString.parse(ctx.request.url.split('?')[1]);
  let {id} = qs;
  if (!id) {
    id = '';
  }
  ctx.body = JSON.parse(service.get_book_data(id));
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(PORT);
console.log(`Koa server is started on port ${PORT}`);
