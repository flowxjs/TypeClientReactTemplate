import { injectable } from 'inversify';

@injectable()
export class CustomService {
  getdefaultCount() {
    return (Math.random() * 10000).toFixed(2);
  }
}