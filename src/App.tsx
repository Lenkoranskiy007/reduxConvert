import React, { ChangeEvent, useEffect, useState } from 'react';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Currency } from './Currency';
import {
  getItemsTC,
  setAmounCurrencyAC,
  setAmountAC,
  setItemsTC,
  setOneCurrencyAC,
  setTwoCurrencyAC,
} from './redux/reducers/currency-reducer';
import { AppStateType } from './redux/store';

function App() {
  const dispatch = useDispatch();

  const options = useSelector((state: AppStateType) => state.currency.options);
  const oneCurrency = useSelector((state: AppStateType) => state.currency.oneCurrency);
  const twoCurrency = useSelector((state: AppStateType) => state.currency.twoCurrency);
  const amountCurrency = useSelector((state: AppStateType) => state.currency.amountCurrency);
  const amount = useSelector((state: AppStateType) => state.currency.amount);
  const changeRate = useSelector((state: AppStateType) => state.currency.changeRate);
  const isLoading = useSelector((state: AppStateType) => state.currency.isLoading);

  console.log('oneCurrency', oneCurrency);
  console.log('twoCurrency', twoCurrency);

  let toAmount, fromAmount;
  if (amountCurrency) {
    fromAmount = amount;
    toAmount = changeRate && amount * changeRate;
  } else {
    toAmount = amount;
    fromAmount = changeRate && amount / changeRate;
  }

  useEffect(() => {
    dispatch(getItemsTC());
  }, []);
  console.log(options);

  useEffect(() => {
    if (oneCurrency && twoCurrency) {
      dispatch(setItemsTC(oneCurrency, twoCurrency));
    }
  }, [oneCurrency, twoCurrency]);

  function handleOneChange(e: any) {
    dispatch(setAmountAC(e.target.value));
    dispatch(setAmounCurrencyAC(true));
  }

  function handleTwoChange(e: any) {
    setAmountAC(e.target.value);
    setAmounCurrencyAC(false);
  }

  return (
    <>
      <div className="wrapper">
        <div className="content">
          <h1>Курс валют</h1>
          {/* {isLoading && <CircularProgress />}  */}
          <Currency
            //@ts-ignore
            options={options}
            selectedCurrency={oneCurrency}
            onChangeCurrency={(e: ChangeEvent<HTMLSelectElement>) =>
              dispatch(setOneCurrencyAC(e.target.value))
            }
            onChangeInput={handleOneChange}
            amount={fromAmount}
          />
          <hr />
          <Currency
            //@ts-ignore
            options={options}
            selectedCurrency={twoCurrency}
            onChangeCurrency={(e: ChangeEvent<HTMLSelectElement>) =>
              dispatch(setTwoCurrencyAC(e.target.value))
            }
            onChangeInput={handleTwoChange}
            amount={toAmount}
          />
        </div>
      </div>
    </>
  );
}

export default App;
