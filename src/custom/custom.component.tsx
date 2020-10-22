import React from 'react';
import { Component, ComponentTransform } from '@typeclient/react';
import { CustomService } from './custom.service';
import { inject } from '@typeclient/core';

@Component()
export class CustomComponent implements ComponentTransform {
  @inject(CustomService) private readonly CustomService: CustomService;
  public render(props: React.PropsWithoutRef<{ text: string }>) {
    const val = this.CustomService.getdefaultCount();
    return <div>{val} - {props.text}</div>
  }
}