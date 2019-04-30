export interface Options {
    value: number;
    option: string;
    description: string;
    sort?: number;
  }
  
  export interface CustomWindow extends Window {
    CostCalcValue: DynamicProperty;
    TotalsList?: Array<any>;
  }
  
  export interface DynamicProperty {
    [key: string]: any
  }

  export interface Rules {
    value: any;
    operator: '==' | '!=' | '>' | '<' | '<=' | '>=';
    path: string;
    placeholder?: string;
    display?: boolean;
  }
