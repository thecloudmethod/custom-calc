export interface Options {
    value: number;
    option: string;
  }
  
  export interface CustomWindow extends Window {
    CostCalcValue: DynamicProperty;
  }
  
  export interface DynamicProperty {
    [key: string]: any
  }