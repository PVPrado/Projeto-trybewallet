import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <header>
          <Header />
        </header>
        <main>
          <WalletForm />
          <Table />
        </main>
      </div>
    );
  }
}

export default Wallet;
