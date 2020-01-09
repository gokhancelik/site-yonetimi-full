import { AuthTokenClass } from '../models/auth-token';

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

export class AuthStrategyOptions {
    name: string;
    token?: {
        class?: AuthTokenClass;
        [key: string]: any;
    };
}
