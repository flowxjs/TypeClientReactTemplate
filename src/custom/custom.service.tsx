import { injectable } from 'inversify';
import React from 'react';
import { TCustomRouteData } from './custom.interface';

@injectable()
export class CustomService {
  getdefaultCount() {
    return (Math.random() * 10000).toFixed(2);
  }
}