// Copyright 2018 Superblocks AB
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
import { appActions } from '../../actions';
import * as analitics from '../../utils/analytics';

// TODO - To fix before 2.0
// deleteProject = (e, project) => {
//     e.stopPropagation();

//     this.props.router.control.deleteProject(project, () => {
//         this.forceUpdate();
//     });
// };

const initTrackingAnalytics: Epic = (action$: any, state$: any) => action$.pipe(
    ofType(appActions.APP_START),
    withLatestFrom(state$),
    switchMap(([, state]) => {
        const { trackAnalytics } = state.settings.preferences.advanced;
        analitics.setEnable(trackAnalytics)
        return empty();
    }))

export default initTrackingAnalytics;
