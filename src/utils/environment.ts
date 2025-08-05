// src/utils/environment.ts
export enum Env {
    Development = 'development',
    Production = 'production',
    Test = 'test',
}

export const getEnv = () => process.env.NODE_ENV || Env.Development;

export const isDev = () => getEnv() === Env.Development;
export const isProd = () => getEnv() === Env.Production;
export const isTest = () => getEnv() === Env.Test;
