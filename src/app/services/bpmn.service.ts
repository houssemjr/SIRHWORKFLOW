import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BpmnService {

  private xml!: string;

  getXML(): string {
    return this.xml;
  }

  setXML(xml: string): void {
    this.xml = xml;
  }}
