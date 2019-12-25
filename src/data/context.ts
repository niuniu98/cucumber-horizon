import {HookScenarioResult, World} from "cucumber";

export let context: World;
export let scenario: HookScenarioResult;
export const setContext = (value: World) => context = value;
export const setScenario = (value: HookScenarioResult) => scenario = value;
