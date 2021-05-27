import "reflect-metadata";
import { Clazz, TypeGuard } from "../../interface/index.js";
export declare const AutoWired: <T>(selectType?: Clazz | TypeGuard<T> | undefined) => (target: any, propertyKey: string) => void;
