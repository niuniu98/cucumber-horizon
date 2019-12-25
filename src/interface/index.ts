export interface LocationInfo {
    address: string;
    longitude?: number;
    latitude?: number;
    radius?: number;
}

export interface LocationExample {
    [index: string]: LocationInfo;
}
