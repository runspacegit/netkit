export function str2ab(str: string): ArrayBuffer {
    var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
};


export function ab2str(buf: ArrayBuffer): string {
    // @ts-ignore
    return String.fromCharCode.apply(null, new Uint16Array(buf));
}

export default { ab2str, str2ab };
