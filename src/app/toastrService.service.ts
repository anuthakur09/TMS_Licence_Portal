import { Injectable, TemplateRef } from '@angular/core';

export interface ToastInfo {
  textOrTpl?: any;
  delay?: number;
  classname?: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: ToastInfo[] = [];

  success(textOrTpl: string | TemplateRef<any>): void {
    this.toasts.push({
      textOrTpl,
      classname: 'bg-success text-light',
      delay: 8000,
    });
  }

  error(textOrTpl: string | TemplateRef<any>): void {
    
    this.toasts.push({
      textOrTpl,
      classname: 'bg-danger text-light',
      delay: 8000,
      
    });
  }

  warn(textOrTpl: string | TemplateRef<any>, options: any = {}): void {
    this.toasts.push({
      textOrTpl,
      classname: 'bg-warning text-light',
      delay: 8000,
    });
  }

  warnWithDelay(textOrTpl: string | TemplateRef<any>, options: any = {}, delay : number): void {
    this.toasts.push({
      textOrTpl,
      classname: 'bg-warning text-light',
      delay: delay,
    });
  }


  info(textOrTpl: string | TemplateRef<any>, options: any = {}): void {
    this.toasts.push({
      textOrTpl,
      classname: 'bg-info text-light',
      delay: 8000
    });
  }

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast: ToastInfo) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }
}
