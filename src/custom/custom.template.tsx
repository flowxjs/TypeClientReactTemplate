import React from 'react';
import './custom.style.css';
import { Context } from '@typeclient/core';
import { useSlot, ReactApplication, useContextEffect } from '@typeclient/react';
export function CustomTemplate(props: React.PropsWithChildren<Context>) {
  const { Consumer } = useSlot(props.app as ReactApplication);
  useContextEffect(() => {
    console.log('Template use `useContextEffect` created');
    return () => console.log('Template use `useContextEffect` destoryed');
  }, props);
  return <div className="app">
    <h1 className="title">TypeClient Router Manager</h1>
    <p style={{ textAlign: 'center' }}>
      <Consumer name="foo">
        这里是插槽，默认文字。
      </Consumer>
    </p>
    {props.children}
  </div>
}