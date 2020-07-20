console.disableYellowBox = true;

import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import MainComponent from "./src/components";

import reducer from './src/redux';
const store = createStore(reducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <MainComponent></MainComponent>
    </Provider>
  );
}