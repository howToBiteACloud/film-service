import { inject, Injectable } from '@angular/core';

import { TmdbApiService } from '../../../apis/tmdb-api.service';
import { AuthorizationService } from '../../../shared/services/authorization.service';

@Injectable({
    providedIn: 'root',
})
export class ProfileDataService {
    private readonly authorizationService = inject(AuthorizationService);
    private readonly tmdbService = inject(TmdbApiService);

    readonly account$ = this.authorizationService.account$;
}
