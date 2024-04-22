import axios from 'axios';
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
export async function toDataUrl(url: string) {
    try {
        const response = await axios.get(url, {
            responseType: 'blob'
        });

        const reader = new FileReader();
        const dataUrlPromise = new Promise((resolve, reject) => {
            reader.onloadend = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
        });

        reader.readAsDataURL(response.data);
        return await dataUrlPromise;
    } catch (error : any) {
        throw new Error(`Failed to fetch or convert URL to data URL: ${error.message}`);
    }
}
