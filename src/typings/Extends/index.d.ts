
declare module '*.json';

type KeyofUnion<T> = T extends object ? keyof T : never;
