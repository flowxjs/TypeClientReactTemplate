import React, { useCallback, Fragment } from 'react';
import { Controller, Route, Context, State, useMiddleware, useException } from "@typeclient/core";
import { TCustomRouteData, CustomRouteData } from "./custom.interface";
import { Template, useContextState, useContextEffect, useComponent } from '@typeclient/react';
import { CustomTemplate } from './custom.template';
import { CustomMiddleware, CustomMiddleware2 } from './custom.middleware';
import { CustomError } from './custom.error';
import { inject } from 'inversify';
import { CustomService } from './custom.service';
import { ErrorCatcher } from './custom.exception';
import { CustomComponent } from './custom.component';

@Controller()
@Template(CustomTemplate)
@useException(CustomError)
export class CustomController {
  @inject(CustomService) private readonly CustomService: CustomService;
  @inject(CustomComponent) private readonly CustomComponent: CustomComponent;

  @Route()
  IndexPage(ctx: Context) {
    return <div className="content">
      <p>它是一套通用的路由管理的微应用架构，支持通过驱动方式接入的任意渲染架构或者库。它具有以下有点：</p>
      <ol>
        <li>快速匹配路由到组件</li>
        <li>基于 <a href="https://baike.baidu.com/item/AOP/1332219" target="_blank" rel="noopener noreferrer">AOP</a> 模式快速编写路由</li>
        <li>基于 <a href="https://baike.baidu.com/item/%E6%8E%A7%E5%88%B6%E5%8F%8D%E8%BD%AC?fromtitle=Inversion+of+Control&fromid=11298462" target="_blank" rel="noopener noreferrer">IOC: Inversion of Control</a> 模型，快速实现服务的反转控制。</li>
        <li>支持中间件模型</li>
        <li>支持路由生命周期</li>
        <li>通过事件分发快速构建不同渲染架构的驱动</li>
        <li>轻量的体积 gzip &lt; 30KB</li>
      </ol>
      <h2>Example</h2>
      <ul>
        <li><span className="cur" onClick={() => ctx.redirect('/stage/1')}>普通跳转页面</span></li>
        <li><span className="cur" onClick={() => ctx.redirect('/stage/2')}>使用IOC调用数据</span></li>
        <li><span className="cur" onClick={() => ctx.redirect('/stage/3')}>使用中间件修改数据</span></li>
        <li><span className="cur" onClick={() => ctx.redirect('/stage/4')}>调用缓存式函数组件</span></li>
        <li><span className="cur" onClick={() => ctx.redirect('/stage/5')}>查看页面状态</span></li>
        <li><span className="cur" onClick={() => ctx.redirect('/stage/6')}>错误捕获</span></li>
        <li><span className="cur" onClick={() => ctx.redirect('/stage/7')}>使用路由生命周期</span></li>
        <li><span className="cur" onClick={() => ctx.redirect('/stage/8#hash-anchor')}>Hash Anchor 锚点功能</span></li>
      </ul>
      <h2>Repository</h2>
      <a href="https://github.com/flowxjs/TypeClient" target="_blank" rel="noopener noreferrer">View on github.</a>
    </div>
  }

  @Route('/stage/1')
  stage1() {
    return <p>这是一个普通页面</p>
  }

  @Route('/stage/2')
  @State(CustomRouteData)
  stage2(ctx: Context<TCustomRouteData>) {
    const { count } = useContextState(() => ({ count: ctx.state.count }));
    const click = useCallback(() => {
      ctx.state.count = Number(this.CustomService.getdefaultCount());
    }, [ctx.state.count]);
    return <p>
      {count} <button onClick={click}>点击修改</button>
    </p>
  }

  @Route('/stage/3')
  @State(CustomRouteData)
  @useMiddleware(CustomMiddleware)
  stage3(ctx: Context<TCustomRouteData>) {
    const { count } = useContextState(() => ({ count: ctx.state.count }));
    return <p>
      {count} - 
      <span>等待3秒后看到结果</span>
    </p>
  }

  @Route('/stage/4')
  @State(CustomRouteData)
  @useMiddleware(CustomMiddleware)
  stage4(ctx: Context<TCustomRouteData>) {
    const Cmp = useComponent(this.CustomComponent);
    return <div>
      以下是一个缓存是组件，同时3秒后看到中间件对其更改。
      <Cmp text="hello world" />
    </div>
  }

  @Route('/stage/5')
  @State(CustomRouteData)
  @useMiddleware(CustomMiddleware)
  stage5(ctx: Context<TCustomRouteData>) {
    const { status } = useContextState(() => ({ status: ctx.status.value }));
    return <p>当前页面状态：{status}，需要等3秒后看到变化</p>
  }

  @Route('/stage/6')
  @State(CustomRouteData)
  @useMiddleware(CustomMiddleware2)
  @useException(ErrorCatcher)
  stage6(ctx: Context<TCustomRouteData>) {
    const { count } = useContextState(() => ({ count: ctx.state.count }));
    return <p>当前数据：{count}，需要等3秒后看到错误捕获的变化</p>
  }

  @Route('/stage/7')
  @State(CustomRouteData)
  @useMiddleware(CustomMiddleware)
  stage7(ctx: Context<TCustomRouteData>) {
    const { count } = useContextState(() => ({ count: ctx.state.count }));
    useContextEffect(() => {
      console.log('/stage/7 路由生命周期 mount')
      return () => console.log('/stage/7 路由生命周期 unmount')
    })
    return <p>当前数据：{count}，需要等3秒后看到错误捕获的变化，请同时打开console看控制台</p>
  }

  @Route('/stage/8')
  stage8() {
    return <Fragment>
      <p>这是一个普通页面</p>
      <div style={{ width: '100%', height: '10000px' }}></div>
      <div id="hash-anchor" style={{ width: '100%', height: '30px', lineHeight: '30px', color: 'red' }}>Hash Anchor Area! [id="hash-anchor"]</div>
      <div style={{ width: '100%', height: '10000px' }}>2. Block area!</div>
    </Fragment>
  }
}