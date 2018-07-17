import React from 'react'
import ReactDOM from 'react-dom'
import DecisionsContainer from './components/DecisionsContainer';
import DecisionFormBox from './components/DecisionFormBox';

const formDiv = document.querySelector('#decision-form')
const container = document.querySelector('#decisions');

if (container) {
  const data = JSON.parse(container.getAttribute('data'));
  const decisions = Array.isArray(data) ? data : [data]
  ReactDOM.render(<DecisionsContainer decisions={decisions} />, container);
}
else if (formDiv) {
  ReactDOM.render(<DecisionFormBox />, formDiv)
}


