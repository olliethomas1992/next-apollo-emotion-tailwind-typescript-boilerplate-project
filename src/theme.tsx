import defaults from 'lodash/defaults';
import isFunction from 'lodash/isFunction';
import map from 'lodash/map';
import mergeWith from 'lodash/mergeWith';
import toPath from 'lodash/toPath';
import { ReactNode } from 'react';
import reduceCalc from 'reduce-css-calc';

import tailwindConfig from '../tailwind.config';

interface ColorRange {
    '100': string;
    '200': string;
    '300': string;
    '400': string;
    '500': string;
    '600': string;
    '700': string;
    '800': string;
    '900': string;
}

interface SpacingRange {
    px: string;
    '0': string;
    '1': string;
    '2': string;
    '3': string;
    '4': string;
    '5': string;
    '6': string;
    '8': string;
    '10': string;
    '12': string;
    '16': string;
    '20': string;
    '24': string;
    '32': string;
    '40': string;
    '48': string;
    '56': string;
    '64': string;
}

interface AutoFullScreen {
    auto: string;
    full: string;
    screen: string;
}

interface Width extends SpacingRange, AutoFullScreen {
    '1/2': string;
    '1/3': string;
    '2/3': string;
    '1/4': string;
    '2/4': string;
    '3/4': string;
    '1/5': string;
    '2/5': string;
    '3/5': string;
    '4/5': string;
    '1/6': string;
    '2/6': string;
    '3/6': string;
    '4/6': string;
    '5/6': string;
    '1/12': string;
    '2/12': string;
    '3/12': string;
    '4/12': string;
    '5/12': string;
    '6/12': string;
    '7/12': string;
    '8/12': string;
    '9/12': string;
    '10/12': string;
    '11/12': string;
}

interface Height extends SpacingRange, AutoFullScreen {}

interface ScreenSize {
    sm: string;
    md: string;
    lg: string;
    xl: string;
}

interface FontSize {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
    '6xl': string;
}

interface LineHeight {
    none: string;
    tight: string;
    snug: string;
    normal: string;
    relaxed: string;
    loose: string;
}

interface BorderRadius {
    none: string;
    sm: string;
    default: string;
    lg: string;
    full: string;
}

export interface Color {
    transparent: string;
    primary: string;
    secondary: string;
    info: string;
    success: string;
    warning: string;
    error: string;
    black: string;
    white: string;
    red: ColorRange;
    gray: ColorRange;
    orange: ColorRange;
    yellow: ColorRange;
    green: ColorRange;
    teal: ColorRange;
    blue: ColorRange;
    indigo: ColorRange;
    purple: ColorRange;
    pink: ColorRange;
}

export interface Theme {
    screens: ScreenSize;
    colors: Color;
    spacing: SpacingRange;
    height: Height;
    width: Width;
    fontSize: FontSize;
    lineHeight: LineHeight;
    borderRadius: BorderRadius;
}

export interface ThemeProp {
    theme?: Theme;
    children?: ReactNode;
}

function negateValue(value) {
    try {
        return reduceCalc(`calc(${value} * -1)`);
    } catch (e) {
        return value;
    }
}

const configUtils = {
    negative(scale) {
        return Object.keys(scale)
            .filter(key => scale[key] !== '0')
            .reduce(
                (negativeScale, key) => ({
                    ...negativeScale,
                    [`-${key}`]: negateValue(scale[key])
                }),
                {}
            );
    }
};

function value(valueToResolve, ...args) {
    return isFunction(valueToResolve)
        ? valueToResolve(...args)
        : valueToResolve;
}

function mergeExtensions({ extend, ...theme }) {
    return mergeWith(theme, extend, (themeValue, extensions) => {
        if (!isFunction(themeValue) && !isFunction(extensions)) {
            return {
                ...themeValue,
                ...extensions
            };
        }

        return (resolveThemePath, utils) => ({
            ...value(themeValue, resolveThemePath, utils),
            ...value(extensions, resolveThemePath, utils)
        });
    });
}

function resolveFunctionKeys(object): any {
    const resolveThemePath = (key, defaultValue) => {
        const path = toPath(key);

        let index = 0;
        let val = object;

        while (val !== undefined && val !== null && index < path.length) {
            val = val[path[index++]];
            val = isFunction(val) ? val(resolveThemePath) : val;
        }

        return val === undefined ? defaultValue : val;
    };

    return Object.keys(object).reduce((resolved, key) => {
        return {
            ...resolved,
            [key]: isFunction(object[key])
                ? object[key](resolveThemePath, configUtils)
                : object[key]
        };
    }, {});
}

function resolveConfig(configs) {
    return defaults(
        {
            theme: resolveFunctionKeys(
                mergeExtensions(defaults({}, ...map(configs, 'theme')))
            ),
            variants: (firstVariants => {
                return Array.isArray(firstVariants)
                    ? firstVariants
                    : defaults({}, ...map(configs, 'variants'));
            })(defaults({}, ...map(configs)).variants)
        },
        ...configs
    );
}

const theme = resolveFunctionKeys(tailwindConfig.theme);

export { theme };
