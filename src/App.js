import React, { useReducer } from 'react';
const initialState = {
  loan: 0,
  balance: 0,
  isActive: false
}
function reducer(state, action) {
  switch (action.type) {
    case 'openAccount':

      return { ...state, balance: 500, isActive: true }

    case 'deposit':

      return { ...state, balance: state.balance + action.payload }

    case 'withdraw':
      if (state.balance <= 0) return state;

      return { ...state, balance: state.balance - action.payload }
    case 'requestLoan':
      if (state.loan > 0) return state;
      return { ...state, loan: action.payload, balance: state.balance + action.payload }

    case 'payLoan':

      return { ...state, loan: 0, balance: state.balance - state.loan }
    case 'closeAccount':
      if (state.loan > 0 || state.balance !== 0) return state;
      return initialState;

    default:
      throw new Error('Unknown')

  }
}

function App(props) {
  const [{ loan, balance, isActive }, dispatch] = useReducer(reducer, initialState)
  return (
    <>
      <div className='App'>
        <h1>UseReducer bank account</h1>
        <p><strong>Balance: {balance}</strong></p>
        <p><strong>Loan: {loan}</strong></p>

        <p>
          <button onClick={() => dispatch({ type: 'openAccount' })} disabled={isActive}>Open Account</button>
        </p>

        <p>
          <button onClick={() => dispatch({ type: 'deposit', payload: 150 })} disabled={!isActive}>Deposite 150</button>
        </p>

        <p>
          <button onClick={() => dispatch({ type: 'withdraw', payload: 50 })} disabled={!isActive}>Withdraw 50</button>
        </p>

        <p>
          <button onClick={() => dispatch({ type: 'requestLoan', payload: 5000 })} disabled={!isActive}>Request loan of 5000</button>
        </p>

        <p>
          <button onClick={() => dispatch({ type: 'payLoan' })} disabled={!isActive}>Pay loan</button>
        </p>

        <p>
          <button onClick={() => dispatch({ type: 'closeAccount' })} disabled={!isActive}>Close Account</button>
        </p>



      </div>
    </>
  );
}

export default App;
