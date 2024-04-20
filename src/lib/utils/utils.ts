import _ from 'lodash';


export function paginate(array: any[], pageSize: number, pageNumber: number) {
    return _.chunk(array, pageSize)[pageNumber - 1] || [];
}

export const generateNumberArray = (start: number, count: number, max: number) => {
    const array = []
    for (let i = start - 1; i < Math.min(start + count, max); i++) {
      array.push(i)
    }
    return array.filter(e => e > -1);
}