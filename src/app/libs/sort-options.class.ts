export class SortOptions {
    constructor() { }

    public static sortBy(options: Array<any>, sortProperty: string) {
        return options.sort((a, b) => (a[sortProperty] > b[sortProperty]) ? 1 : -1)
    }

    public static buildArrayFromPricesObject(fromObject: any): Array<any> {
        let retrunArr: Array<any> = [];
        let sortStartValue: number = 999999;
        
        for(let property of Object.keys(fromObject)) {
            if(!fromObject[property].sort) {
                fromObject[property].sort = sortStartValue ;
            }

            if(property != 'TotalsList') {
                retrunArr.push(fromObject[property])
            }
        }

        return retrunArr;
    }
}