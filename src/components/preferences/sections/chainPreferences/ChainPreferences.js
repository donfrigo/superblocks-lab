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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './style.less';
import * as validations from '../../../../validations';
import TextInput from '../../../textInput';

export default class ChainPreferences extends Component {

    state = {
        errors: null,
        gasLimit: null,
        gasPrice: null
    }

    componentDidMount() {
        const { chainPreferences } = this.props;
        this.gasLimit = chainPreferences.gasLimit;
        this.gasPrice = chainPreferences.gasPrice;
    }

    onChange = (e, key) => {
        var value = e.target.value;
        if (key === "gasLimit") {
            this.gasLimit = Number(value);
        } else if (key === "gasPrice") {
            this.gasPrice = Number(value);
        }

        const errors = validations.validateGasLimit(this.gasLimit);
        this.setState({ errors });

        if (!errors) {
            this.props.onPreferenceChange({
                gasLimit: this.gasLimit,
                gasPrice: this.gasPrice
            });
        }
    }

    render() {
        const { chainPreferences } = this.props;
        const { errors } = this.state;
        return (
            <div>
                <h2>Chain Preferences</h2>
                <div className={style.form}>
                    <form action="">
                        <div className={style.field}>
                            <TextInput
                                id="gasLimit"
                                type="number"
                                label="Gas Limit"
                                error={errors}
                                onChangeText={(e)=>{this.onChange(e, 'gasLimit')}}
                                defaultValue={chainPreferences.gasLimit}
                            />
                            <div className={style.note}>Maximum amount of gas available to each block and transaction. <b>Leave blank for default.</b></div>
                            <div className={classNames(["superInputDark", style.inputContainer])}>
                                <label htmlFor="name">Gas Price</label>
                                <input
                                    id="gasPrice"
                                    type="number"
                                    onKeyUp={(e)=>{this.onChange(e, 'gasPrice')}}
                                    defaultValue={chainPreferences.gasPrice}
                                    onChange={(e)=>{this.onChange(e, 'gasPrice')}}
                                    />
                            </div>
                            <div className={style.note}>The price of each unit of gas, in WEI. <b>Leave blank for default.</b></div>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}

ChainPreferences.propTypes = {
    onPreferenceChange: PropTypes.func.isRequired
}

