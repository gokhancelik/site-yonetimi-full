/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AuthTokenClass, AuthSimpleToken } from '../../models/auth-token';
import { AuthStrategyOptions } from '../auth-strategy-options';
import { getDeepFromObject } from '../../helpers/helpers';

export interface PasswordStrategyModule {
    alwaysFail?: boolean;
    endpoint?: string;
    method?: string;
    redirect?: {
        success?: string | null;
        failure?: string | null;
    };
    requireValidToken?: boolean;
    defaultErrors?: string[];
    defaultMessages?: string[];
}

export interface PasswordStrategyReset extends PasswordStrategyModule {
    resetPasswordTokenKey?: string;
}

export interface PasswordStrategyToken {
    class?: AuthTokenClass;
    key?: string;
    getter?: Function;
}

export interface PasswordStrategyMessage {
    key?: string;
    getter?: Function;
}

export class UsernamePasswordAuthStrategyOptions extends AuthStrategyOptions {
    baseEndpoint?= '/api/auth/';
    login?: boolean | PasswordStrategyModule = {
        alwaysFail: false,
        endpoint: 'login',
        method: 'post',
        requireValidToken: false,
        redirect: {
            success: '/',
            failure: null,
        },
        defaultErrors: ['Login/Email combination is not correct, please try again.'],
        defaultMessages: ['You have been successfully logged in.'],
    };
    register?: boolean | PasswordStrategyModule = {
        alwaysFail: false,
        endpoint: 'register',
        method: 'post',
        requireValidToken: false,
        redirect: {
            success: '/',
            failure: null,
        },
        defaultErrors: ['Something went wrong, please try again.'],
        defaultMessages: ['You have been successfully registered.'],
    };
    requestPass?: boolean | PasswordStrategyModule = {
        endpoint: 'request-pass',
        method: 'post',
        redirect: {
            success: '/',
            failure: null,
        },
        defaultErrors: ['Something went wrong, please try again.'],
        defaultMessages: ['Reset password instructions have been sent to your email.'],
    };
    resetPass?: boolean | PasswordStrategyReset = {
        endpoint: 'reset-pass',
        method: 'put',
        redirect: {
            success: '/',
            failure: null,
        },
        resetPasswordTokenKey: 'reset_password_token',
        defaultErrors: ['Something went wrong, please try again.'],
        defaultMessages: ['Your password has been successfully changed.'],
    };
    logout?: boolean | PasswordStrategyReset = {
        alwaysFail: false,
        endpoint: 'logout',
        method: 'delete',
        redirect: {
            success: '/',
            failure: null,
        },
        defaultErrors: ['Something went wrong, please try again.'],
        defaultMessages: ['You have been successfully logged out.'],
    };
    refreshToken?: boolean | PasswordStrategyModule = {
        endpoint: 'refresh-token',
        method: 'post',
        requireValidToken: false,
        redirect: {
            success: null,
            failure: null,
        },
        defaultErrors: ['Something went wrong, please try again.'],
        defaultMessages: ['Your token has been successfully refreshed.'],
    };
    token?: PasswordStrategyToken = {
        class: AuthSimpleToken,
        key: 'data.token',
        getter: (module: string, res: HttpResponse<Object>, options: UsernamePasswordAuthStrategyOptions) => getDeepFromObject(
            res.body,
            options.token.key,
        ),
    };
    errors?: PasswordStrategyMessage = {
        key: 'data.errors',
        getter: (module: string, res: HttpErrorResponse, options: UsernamePasswordAuthStrategyOptions) => getDeepFromObject(
            res.error,
            options.errors.key,
            options[module].defaultErrors,
        ),
    };
    messages?: PasswordStrategyMessage = {
        key: 'data.messages',
        getter: (module: string, res: HttpResponse<Object>, options: UsernamePasswordAuthStrategyOptions) => getDeepFromObject(
            res.body,
            options.messages.key,
            options[module].defaultMessages,
        ),
    };
    validation?: {
        password?: {
            required?: boolean;
            minLength?: number | null;
            maxLength?: number | null;
            regexp?: string | null;
        };
        username?: {
            required?: boolean;
            regexp?: string | null;
        };
        fullName?: {
            required?: boolean;
            minLength?: number | null;
            maxLength?: number | null;
            regexp?: string | null;
        };
    };
}

export const passwordStrategyOptions: UsernamePasswordAuthStrategyOptions = new UsernamePasswordAuthStrategyOptions();
