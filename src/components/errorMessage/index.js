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

import React, { PureComponent } from 'react';

// export type MessageError =
//   | 'NOT_AUTHORIZED'
//   | 'NET_ERROR'
//   | 'UNKNOWN'
//   | Max140CharsError
//   | EmailError
//   | PasswordError;

// type ErrorMessageProps = {|
//   ...TextProps,
//   error: ?MessageError,
//   originalErrorMessage?: string,
// |};

class ErrorMessage extends PureComponent {
  static errorToMessage(error) {
    switch (error) {
      case 'GAS_LIMIT':
        const message = "The Gas Limit has to be > 0 and < 7900000";
        return (
          <div id="error.gasLimit">
            {message}
          </div>
        );
      default:
        // eslint-disable-next-line no-unused-expressions
        (error);
        return error;
    }
  }

  render() {
    const {
      bold = true,
      color = 'danger',
      error,
      originalErrorMessage,
      ...props
    } = this.props;
    if (!error) return null;
    const message = ErrorMessage.errorToMessage(error);
    const dev = process.env.NODE_ENV !== 'production';
    return (
      <div {...props}>
        {message}
        {dev && originalErrorMessage != null && `\n${originalErrorMessage}`}
      </div>
    );
  }
}

export default ErrorMessage;