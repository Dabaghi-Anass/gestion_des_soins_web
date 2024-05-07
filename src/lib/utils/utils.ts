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
export function getBadgeStyle(status: string, withBorder: boolean = false) {
    let getBgOfHue = (hue: number) => {
    return `hsl(${hue},84%, 85%)`
    };
    let getColorOfHue = (hue: number) => {
        return `hsl(${hue},64%, 24%)`
    };
    let style = {
        backgroundColor: getBgOfHue(getStatusHue(status)),
        color: getColorOfHue(getStatusHue(status)),
        border: withBorder ? `1px solid ${getColorOfHue(getStatusHue(status))}` : "none",
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
    return tailwindColors[Math.floor(Math.random() * tailwindColors.length - 1)];
}
export function randomHue() {
    return Math.floor(Math.random() * 360);
}
export function weekStart(d: Date) {
    let date = new Date(d);
    const currentDate = date.getDate();
    const currentDay = date.getDay();
    return new Date(date.setDate(currentDate - currentDay));
};
export function weekEnd(d: Date) {
    let date = new Date(d);
    const currentDate = date.getDate();
    const currentDay = date.getDay();
    return new Date(date.setDate(currentDate + 6 - currentDay));
};
export function getStatusHue(status: string) {
    const Status :any = {
        DONE: 133,
        SCHEDULED: 42,
        CANCELED: 8,
        CONFIRMED: 141,
        IN_PROGRESS: 180,
        PENDING: 270,
        DENIED: 354,
        COMPLETED_TREATMENT: 210
    }
    return Status[status] ?? 270;
}
export function getTypeHue(status: string) {
    const Status :any = {
        Procedure: 180,
        Consultation: 153,
        Surgery: 14,
        Therapy: 141,
        Diagnostic: 180,
        FollowUp: 270,
        Emergency: 0,
        Other: 270
    }
    return Status[status] ?? 270;
}
export function calculateProgress(now: Date, startHour: number,endHour:number): number {
    const startTime = new Date(now);
    startTime.setHours(startHour, 0, 0, 0);
    const endTime = new Date(now);
    endTime.setHours(endHour, 0, 0, 0);

    const totalDuration = endTime.getTime() - startTime.getTime();
    const elapsedTime = now.getTime() - startTime.getTime();

    const progressPercentage = (elapsedTime / totalDuration) * 100;
    return Math.min(Math.max(progressPercentage, 0), 100);
}

export function getTimeString(date: Date) {
    return date.toLocaleTimeString("fr-FR", { hour: '2-digit', minute: '2-digit' });
}