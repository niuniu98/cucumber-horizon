import {context, scenario} from "../data/context";


interface IndexSignature {
    [index: string]: string;
}

export const LoggerLevel: IndexSignature = {
    DEBUG: 'D',
    INFO: 'I',
    ERROR: 'E',
    WARN: 'W',
    CONSOLE: 'C'
};

const getDate=() => {
    const date = new Date();
    return date.toLocaleDateString();
};

export const logInfo=(tag = scenario.pickle.name,message: string) => {
    const logStr = messageFormatter(tag, LoggerLevel.INFO, message);
    console.log(logStr);
    context.attach(logStr);
};

export const logDebug=(tag = scenario.pickle.name,message: string) => {
    const logStr = messageFormatter(tag, LoggerLevel.DEBUG, message);
    console.debug(logStr);
};

export const logError=(tag = scenario.pickle.name,message: string) => {
    const logStr = messageFormatter(tag, LoggerLevel.ERROR, message);
    console.error(logStr);
    context.attach(logStr);
};

export const logWarn=(tag = scenario.pickle.name,message: string) => {
    const logStr = messageFormatter(tag, LoggerLevel.WARN, message);
    console.warn(logStr);
    context.attach(logStr);
};

export const logConsole=(tag = scenario.pickle.name,message: string) => {
    const logStr = messageFormatter(tag, LoggerLevel.CONSOLE, message);
    console.log(logStr);
};

const messageFormatter = (tag: string, level: string, message: string) => {
    return `[${getDate()}]${level}/${tag} ${message}`;
};

export const logBulkInfo=(tag = scenario.pickle.name, level: string, message: any) =>{
    const preStr = `[${getDate()}] ${level}/${tag}`;
    console.log(preStr);
    console.log(message);
};

