import { InjectionToken } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { AuthStrategy } from './strategies/auth-strategy';
import { AuthStrategyOptions } from './strategies/auth-strategy-options';
import { AuthToken, AuthTokenClass } from './models/auth-token';

export type AuthStrategyClass = new (...params: any[]) => AuthStrategy;

export type AuthStrategies = [AuthStrategyClass, AuthStrategyOptions][];

export interface AuthOptions {
    forms?: any;
    strategies?: AuthStrategies;
}

export interface AuthSocialLink {
    link?: string;
    url?: string;
    target?: string;
    title?: string;
    icon?: string;
}

const socialLinks: AuthSocialLink[] = [];

export const defaultAuthOptions: any = {
    strategies: [],
    forms: {
        login: {
            redirectDelay: 500, // delay before redirect after a successful login, while success message is shown to the user
            strategy: 'email',  // provider id key. If you have multiple strategies, or what to use your own
            rememberMe: true,   // whether to show or not the `rememberMe` checkbox
            showMessages: {     // show/not show success/error messages
                success: true,
                error: true,
            },
            socialLinks: socialLinks, // social links at the bottom of a page
        },
        register: {
            redirectDelay: 500,
            strategy: 'email',
            showMessages: {
                success: true,
                error: true,
            },
            terms: true,
            socialLinks: socialLinks,
        },
        requestPassword: {
            redirectDelay: 500,
            strategy: 'email',
            showMessages: {
                success: true,
                error: true,
            },
            socialLinks: socialLinks,
        },
        resetPassword: {
            redirectDelay: 500,
            strategy: 'email',
            showMessages: {
                success: true,
                error: true,
            },
            socialLinks: socialLinks,
        },
        logout: {
            redirectDelay: 500,
            strategy: 'email',
        },
        validation: {
            password: {
                required: true,
                minLength: 4,
                maxLength: 50,
            },
            email: {
                required: true,
            },
            fullName: {
                required: false,
                minLength: 4,
                maxLength: 50,
            },
        },
    },
};

export const NB_AUTH_OPTIONS = new InjectionToken<AuthOptions>('Nebular Auth Options');
export const NB_AUTH_USER_OPTIONS = new InjectionToken<AuthOptions>('Nebular User Auth Options');
export const NB_AUTH_STRATEGIES = new InjectionToken<AuthStrategies>('Nebular Auth Strategies');
export const NB_AUTH_TOKENS = new InjectionToken<AuthTokenClass<AuthToken>[]>('Nebular Auth Tokens');
export const NB_AUTH_INTERCEPTOR_HEADER = new InjectionToken<string>('Nebular Simple Interceptor Header');
export const NB_AUTH_TOKEN_INTERCEPTOR_FILTER =
    new InjectionToken<(req: HttpRequest<any>) => boolean>('Nebular Interceptor Filter');