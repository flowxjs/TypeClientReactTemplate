import React from 'react';
import { Slot } from '..';
import './custom.style.css';
export function CustomTemplate(props: React.PropsWithoutRef<{}>) {
  return <div className="app">
    <h1 className="title">TypeClient Router Manager</h1>
    <Slot {...props} />
  </div>
}