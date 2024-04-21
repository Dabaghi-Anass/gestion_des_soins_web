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
export const calculateAgeFromBirtDate = (date: string) => {
    const birthDate = new Date(date);
    const diff = Date.now() - birthDate.getTime();
    const age = new Date(diff);
    return Math.abs(age.getUTCFullYear() - 1970);
}