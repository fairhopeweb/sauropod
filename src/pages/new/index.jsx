import React, { Component } from 'react';
import { view } from '@risingstack/react-easy-state';
import { Plus, Edit, XSquare } from 'react-feather';
import { withRouter } from 'react-router-dom';

import Button from '../../ui/Button';
import Layout from '../../ui/Layout';
import TextInput from '../../ui/TextInput';
import IconSelect from './IconSelect';

import appStore from '../../storage/appStore';

import notify from '../../helpers/noty';

class NewService extends Component {
  state = {
    name: '',
    description: '',
    icon: '/icons/0_unknown.svg',
    token: '',
    withError: [],
    iconMode: 'buildin',
    editMode: false,
  };

  componentDidMount() {
    this.useEditValues();
  }

  componentDidUpdate(props) {
    if (props !== this.props) {
      this.useEditValues();
    }
  }

  useEditValues() {
    const { match } = this.props;
    if (match && match.path === '/edit/:id') {
      // We are editing a service
      const service = appStore.apps[match.params.id];

      if (!service) {
        alert('The service you are trying to edit doesn\'t exist');
        return;
      }

      this.setState({
        ...service,
        editMode: match.params.id,
      });
    } else {
      // We are creating a new service
      this.setState({
        editMode: false,
      });
    }
  }

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
      editMode,
    } = this.state;

    if (this.checkErrors()) {
      return;
    }

    if (editMode === false) {
      appStore.apps.push({
        name,
        description,
        icon,
        token,
      });
    } else {
      appStore.apps[editMode] = {
        name,
        description,
        icon,
        token,
      };
    }
    this.props.history.push('/');
  }

  removeService() {
    // eslint-disable-next-line no-restricted-globals
    const confirmation = confirm('Are you sure you want to delete this service? This action is permanent and can\'t be reversed.');

    if (confirmation) {
      const { editMode } = this.state;
      appStore.apps.splice(editMode, 1);

      notify('Successfully removed the service');
      this.props.history.push('/');
    }
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

    const {
      name,
      description,
      token,
      editMode,
    } = this.state;

    return (
      <Layout>
        <div>
          <TextInput
            label="Name"
            placeholder="Google"
            onChange={(v) => this.updateValue('name', v)}
            hasError={this.hasError('name')}
            value={name}
          />
        </div>
        <div className="mt-6">
          <TextInput
            label="Description"
            placeholder="John Doe"
            onChange={(v) => this.updateValue('description', v)}
            hasError={this.hasError('description')}
            value={description}
          />
        </div>
        <div className="mt-6">
          <TextInput
            label="TOTP Token"
            placeholder="HHPCZGQ3ZZLTRICKIPL36MO53ACFFJDJ"
            onChange={(v) => this.updateValue('token', v)}
            hasError={this.hasError('token')}
            value={token}
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
              {editMode === false ? (
                <>
                  <Plus style={{ display: 'inline' }} />
                  <span className="ml-3">
                    Add service
                  </span>
                </>
              ) : (
                <>
                  <Edit style={{ display: 'inline' }} />
                  <span className="ml-3">
                    Edit service
                  </span>
                </>
              )}
            </div>
          </Button>
        </div>
        {editMode !== false && (
          <div className="mt-6">
            <Button fullWidth onClick={() => this.removeService()} className="bg-red-500">
              <div className="flex items-center text-white">
                <XSquare style={{ display: 'inline' }} />
                <span className="ml-3">
                  Delete service
                </span>
              </div>
            </Button>
          </div>
        )}
      </Layout>
    );
  }
}

// This file is a .jsx instead of .tsx as TypeScript has some problems with the "withRouter" function
export default withRouter(view(NewService));