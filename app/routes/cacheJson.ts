import {LRUCache} from "lru-cache";


function uuid(len: number, radix: number): string {
    let chars: string[] = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    let uuid: string[] = [], i: number;
    radix = radix || chars.length;

    if (len) {
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        let r: number;

        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    return uuid.join('');
}

const cache = new LRUCache<string, string>({
    max: 100,
    ttl: 1000 * 60 * 10,
    allowStale: false,
    updateAgeOnGet: false,
    updateAgeOnHas: false,
});

export const saveJSON = (str: string): string => {
    const uuidStr = uuid(12, 16);
    cache.set(uuidStr, str);
    return uuidStr;
};