import React from 'react';
import { Component, ComponentTransform } from '@typeclient/react';
import { inject } from 'inversify';
import { CustomService } from './custom.service';

@Component()
export class CustomComponent implements ComponentTransform {
  @inject(CustomService) private readonly CustomService: CustomService;
  public render(props: React.PropsWithoutRef<{ text: string }>) {
    const val = this.CustomService.getdefaultCount();
    return <div>{val} - {props.text}</div>
  }
}