import React, { Component } from 'react';
import { view } from '@risingstack/react-easy-state';
import { Plus } from 'react-feather';
import { withRouter } from 'react-router-dom';

import Button from '../../ui/Button';
import Layout from '../../ui/Layout';
import TextInput from '../../ui/TextInput';
import IconSelect from './IconSelect';

import appStore from '../../storage/appStore';

class NewService extends Component {
  state = {
    name: '',
    description: '',
    icon: '/icons/0_unknown.svg',
    token: '',
    withError: [],
    iconMode: 'buildin',
  };

  updateValue(name, value) {
    this.setState({
      [name]: value,
    });
  }

  hasError(name) {
    return this.state.withError.includes(name);
  }

  addError(name) {
    this.setState((state) => {
      state.withError.push(name);
      return state;
    });
  }

  checkErrors() {
    const {
      name,
      description,
      icon,
      token,
    } = this.state;

    this.setState({
      withError: [],
    });

    let hasErrors = false;

    if (name === '') {
      this.addError('name');
      hasErrors = true;
    }
    if (description === '') {
      this.addError('description');
      hasErrors = true;
    }
    if (icon === '') {
      this.addError('icon');
      hasErrors = true;
    }
    if (token === '') {
      this.addError('token');
      hasErrors = true;
    }

    return hasErrors;
  }

  saveItem() {
    const {
      name,
      description,
      icon,
      token,
    } = this.state;

    if (this.checkErrors()) {
      return;
    }

    appStore.apps.push({
      name,
      description,
      icon,
      token,
    });
    this.props.history.push('/');
  }

  switchIconMode() {
    const { iconMode } = this.state;
    let newIconMode = 'url';
    if (iconMode === 'url') {
      newIconMode = 'buildin';
    }

    this.setState({
      iconMode: newIconMode,
    });
  }

  render() {
    const { iconMode } = this.state;
    let iconModeSwitch = 'Use icon from URL instead';
    if (iconMode === 'url') {
      iconModeSwitch = 'Use build-in icon instead';
    }

    return (
      <Layout>
        <div>
          <TextInput
            label="Name"
            placeholder="Google"
            onChange={(v) => this.updateValue('name', v)}
            hasError={this.hasError('name')}
          />
        </div>
        <div className="mt-6">
          <TextInput
            label="Description"
            placeholder="John Doe"
            onChange={(v) => this.updateValue('description', v)}
            hasError={this.hasError('description')}
          />
        </div>
        <div className="mt-6">
          <TextInput
            label="TOTP Token"
            placeholder="HHPCZGQ3ZZLTRICKIPL36MO53ACFFJDJ"
            onChange={(v) => this.updateValue('token', v)}
            hasError={this.hasError('token')}
          />
        </div>
        <div className="mt-6">
          {iconMode === 'buildin' && (
            <IconSelect
              onChange={(v) => this.updateValue('icon', v)}
              selected={this.state.icon}
            />
          )}
          {iconMode === 'url' && (
            <TextInput
              label="Service Icon"
              placeholder="https://example.com/icon.png"
              onChange={(v) => this.updateValue('icon', v)}
              hasError={this.hasError('icon')}
            />
          )}
          <div className="mt-1">
            <Button fullWidth onClick={() => this.switchIconMode()}>
              {iconModeSwitch}
            </Button>
          </div>
        </div>

        <div className="mt-6">
          <Button fullWidth onClick={() => this.saveItem()}>
            <div className="flex items-center">
              <Plus style={{ display: 'inline' }} />
              Add service
            </div>
          </Button>
        </div>
      </Layout>
    );
  }
}

// This file is a .jsx instead of .tsx as TypeScript has some problems with the "withRouter" function
export default withRouter(view(NewService));