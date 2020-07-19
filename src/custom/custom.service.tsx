import { injectable } from 'inversify';
import React from 'react';
import { Component } from '@typeclient/react';
import { TCustomRouteData } from './custom.interface';

@injectable()
export class CustomService {
  getdefaultCount() {
    return (Math.random() * 10000).toFixed(2);
  }
  
  @Component()
  cumstomComponent(props: TCustomRouteData) {
    return <p>component count++: { props.count + 1 }</p>
  }
}