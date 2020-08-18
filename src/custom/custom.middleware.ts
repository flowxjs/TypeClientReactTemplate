import { MiddlewareTransform, ComposeNextCallback, Context, Middleware } from "@typeclient/core";
import { TCustomRouteData } from "./custom.interface";

@Middleware()
export class CustomMiddleware<T extends Context<TCustomRouteData>> implements MiddlewareTransform<T> {
  async use(ctx: T, next: ComposeNextCallback) {
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        ctx.state.count = 999;
        resolve();
        unbind();
      }, 3000);
      const unbind = ctx.useReject(() => {
        clearTimeout(timer);
        reject();
      });
    });
    await next();
  }
}

@Middleware()
export class CustomMiddleware2<T extends Context<TCustomRouteData>> implements MiddlewareTransform<T> {
  async use(ctx: T, next: ComposeNextCallback) {
    await new Promise((resolve, reject) => {
      let i = 0;
      const timer = setInterval(() => {
        ctx.state.count = i;
        if (i > 3) {
          unbind();
          clearInterval(timer);
          return reject(new Error('中间件中抛出错误'))
        }
        i++
      }, 1000);
      const unbind = ctx.useReject(() => {
        clearTimeout(timer);
        reject();
      });
    });
    await next();
  }
}

@Middleware()
export class CustomRedirection<T extends Context<TCustomRouteData>> implements MiddlewareTransform<T> {
  async use(ctx: T) {
    await new Promise(resolve => setTimeout(resolve, 3000));
    ctx.redirect('/stage/1');
  }
}
