import { Service } from '@typeclient/core';

@Service()
export class CustomService {
  getdefaultCount() {
    return (Math.random() * 10000).toFixed(2);
  }
}