import { Injectable } from '@angular/core';

import { AuthTokenParceler } from './token-parceler';
import { AuthToken } from '../models/auth-token';

export abstract class TokenStorage {

    abstract get(): AuthToken;
    abstract set(token: AuthToken);
    abstract clear();
}

/**
 * Service that uses browser localStorage as a storage.
 *
 * The token storage is provided into auth module the following way:
 * ```ts
 * { provide: NbTokenStorage, useClass: NbTokenLocalStorage },
 * ```
 *
 * If you need to change the storage behaviour or provide your own - just extend your class from basic `NbTokenStorage`
 * or `NbTokenLocalStorage` and provide in your `app.module`:
 * ```ts
 * { provide: NbTokenStorage, useClass: NbTokenCustomStorage },
 * ```
 *
 */
@Injectable()
export class NbTokenLocalStorage extends TokenStorage {

    protected key = 'auth_app_token';

    constructor(private parceler: AuthTokenParceler) {
        super();
    }

    /**
     * Returns token from localStorage
     * @returns {NbAuthToken}
     */
    get(): AuthToken {
        const raw = localStorage.getItem(this.key);
        return this.parceler.unwrap(raw);
    }

    /**
     * Sets token to localStorage
     * @param {NbAuthToken} token
     */
    set(token: AuthToken) {
        const raw = this.parceler.wrap(token);
        localStorage.setItem(this.key, raw);
    }

    /**
     * Clears token from localStorage
     */
    clear() {
        localStorage.removeItem(this.key);
    }
}
