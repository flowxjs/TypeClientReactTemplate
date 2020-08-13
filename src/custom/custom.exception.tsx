import React from 'react';
import { Context, ExceptionTransfrom, Exception } from "@typeclient/core";

@Exception()
export class ErrorCatcher implements ExceptionTransfrom<Context> {
  catch(error: Error) {
    return <p>这是一个错误捕获页面。捕获到错误: {error.message}</p>;
  }
}