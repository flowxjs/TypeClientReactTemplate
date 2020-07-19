import { MiddlewareTransform, ComposeNextCallback, Context } from "@typeclient/core";
import { TCustomRouteData } from "./custom.interface";
import { injectable } from 'inversify';

@injectable()
export class CustomMiddleware<T extends Context<TCustomRouteData>> implements MiddlewareTransform<T> {
  async use(ctx: T, next: ComposeNextCallback) {
    console.log('in middleware')
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        ctx.state.count = 999;
        console.log('setted data 999')
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