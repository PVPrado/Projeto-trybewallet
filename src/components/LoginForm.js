import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import loginAction from '../redux/actions';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      submitted: false,
      isDisabled: true,
    };
  }

  validation = () => {
    const { email, password } = this.state;
    const emailRegex = /\S+@\S+\.\S+/;
    const numberMin = 6;
    const valiInput = !(emailRegex.test(email) && password.length >= numberMin);
    this.setState({ isDisabled: valiInput });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      this.validation();
    });
  };

  handleClick = () => {
    const { dispatch } = this.props;
    const { email } = this.state;
    // console.log(dispatch);
    this.setState({ submitted: true });
    dispatch(loginAction(email));
  };

  render() {
    const { email, password, submitted, isDisabled } = this.state;
    if (submitted) return <Redirect to="/carteira" />;
    return (
      <section>
        <form>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              name="email"
              data-testid="email-input"
              id="inputEmail"
              placeholder="Digite seu Email"
              onChange={ this.handleChange }
              value={ email }
            />
          </label>
          <label htmlFor="inputSenha">
            <input
              type="password"
              name="password"
              data-testid="password-input"
              id="inputSenha"
              placeholder="Digite sua senha"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            onClick={ this.handleClick }
            disabled={ isDisabled }
          >
            Entrar
          </button>
        </form>
      </section>
    );
  }
}

LoginForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(LoginForm);
