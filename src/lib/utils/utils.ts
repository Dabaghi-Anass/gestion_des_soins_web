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
export function randomHslaCombination(alpha: number = 0.5) {
    let hue = Math.floor(Math.random() * 360);
    return {
        backgroundColor: `hsla(${hue}, 80%, 50%, ${alpha})`,
        color: `hsla(${hue}, 100%, 20%)`
    };
}
export function getBadgeStyle(status: string) {
    let getBgOfHue = (hue: number) => {
        return `hsl(${hue},100%, 50%, 0.5)`
    };

    let style = {
        backgroundColor: getBgOfHue(270),
    }
    enum Status {
        PENDING = 42,
        CONFIRMED = 141,
        DENIED = 8
    }
    if (status === "PENDING") {
        style = {
        backgroundColor: getBgOfHue(Status.PENDING),
        }
    }
    if (status === "CONFIRMED") {
        style = {
        backgroundColor: getBgOfHue(Status.CONFIRMED),
        }
    }
    if (status === "DENIED") {
        style = {
        backgroundColor: getBgOfHue(Status.DENIED),
        }
    }
    return style;
}

export function randomTileWindColor() {
    let tailwindColors = [
        "red",
        "yellow",
        "green",
        "blue",
        "indigo",
        "purple",
        "pink",
        "rose",
        "cyan"
    ]
    return tailwindColors[Math.floor(Math.random() * tailwindColors.length)];
}