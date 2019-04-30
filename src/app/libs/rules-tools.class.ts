export class RuleTools {

  public static testByCondition(condition1: any, condition2: any, operator: '==' | '!=' | '>' | '<' | '<=' | '>=' = '==') {
    if(operator == '==') {
      return condition1 == condition2;
    }

    if(operator == '!=') {
      return condition1 != condition2;
    }

    if(operator == '>') {
      return condition1 > condition2;
    }

    if(operator == '<') {
      return condition1 < condition2;
    }

    if(operator == '<=') {
      return condition1 <= condition2;
    }

    if(operator == '>=') {
      return condition1 >= condition2;
    }
      
  }
}