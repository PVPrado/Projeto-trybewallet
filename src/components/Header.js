import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      spent: 0,
    };
  }

  render() {
    const { user } = this.props;
    const { spent } = this.state;
    return (
      <header>
        <p data-testid="email-field">{ user }</p>
        <p data-testid="total-field">
          {' '}
          { spent }
          {' '}
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
});

Header.propTypes = {
  user: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
