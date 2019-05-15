// Copyright 2019 Superblocks AB
//
// This file is part of Superblocks Lab.
//
// Superblocks Lab is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation version 3 of the License.
//
// Superblocks Lab is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Superblocks Lab.  If not, see <http://www.gnu.org/licenses/>.

import { empty } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { sidemenuActions } from '../../actions';

export const toggleSidemenu: Epic = (action$: any, state$: any) => action$.pipe(
    ofType(sidemenuActions.TOGGLE_SIDEMENU_IN_LOCALSTORAGE),
    withLatestFrom(state$),
    switchMap(([action]) => {
        localStorage.setItem('sideMenuCollapsed', String(action.data.collapsed));
        return empty();
    })
);