import React from 'react';
import DecisionContainer from './DecisionContainer';

export default class DecisionsContainer extends React.Component {
  render() {
    return (
      <ul className="list-group media-list media-list-stream mb-4">
        {this.props.decisions.map(decision => (
          <DecisionContainer key={decision.id} decision={decision} handleOptionClick={this.handleOptionClick}/>
        ))}
      </ul>
    );
  }
}
