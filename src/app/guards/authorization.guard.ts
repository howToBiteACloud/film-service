import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { AuthorizationService } from '../shared/services/authorization.service';

export const AuthorizationGuard: CanActivateFn = () => {
    const authorizationService = inject(AuthorizationService);
    const router = inject(Router);

    return authorizationService.account$.pipe(
        map((account) => {
            return account ? true : router.parseUrl('/');
        }),
    );
};
