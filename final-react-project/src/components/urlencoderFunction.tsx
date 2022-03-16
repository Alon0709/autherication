import { formValueInterface } from './CreateDialog';

export default function encodeDate(data: formValueInterface) {
    const dataEncoded = Object.keys(data).map((key) => `${key}=${encodeURIComponent(data[key])}`);
    return dataEncoded.join('&');
}
