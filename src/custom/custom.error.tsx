import { Context, ExceptionTransfrom, Exception } from '@typeclient/core';
import { TCustomRouteData } from './custom.interface';
import React from 'react';

@Exception()
export class CustomError<T extends Context<TCustomRouteData>> implements ExceptionTransfrom<T> {
  catch(e: Error) {
    return <>
      <h1>TypeClient React Error:</h1>
      <p>{e.message}</p>
    </>
  }
}
