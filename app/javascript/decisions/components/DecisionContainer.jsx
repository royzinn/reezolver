import React from 'react';
import moment from 'moment/moment'
import AnswersContainer from './AnswersContainer'
import InlineAnswerBox from './InlineAnswerBox'

export default class DecisionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleOptionClick = this.handleOptionClick.bind(this);
    this.answerAdded = this.answerAdded.bind(this);
    this.hideAnswers = this.hideAnswers.bind(this);
    this.state = {showAnswerBox: false, answerOption: null, answers: props.decision.answers};
  }

  handleOptionClick(e) {
    if (this.state.answerOption == e.target.dataset['answer'])
      this.hideAnswers();
    else
      this.setState({showAnswerBox: true, answerOption: e.target.dataset['answer']});
  }

  rawMarkup(html) {
    return { __html: html };
  }

  answerAdded(answer) {
    const answers = this.state.answers.slice();
    answers.push(answer);
    this.setState({answers})
  }

  userImage(user){
    return (user && user.image_url) || '/assets/avatar.png'
  }

  hideAnswers() {
    this.setState({showAnswerBox: false, answerOption: null});
  }

  render() {

    const decision = this.props.decision

    return (
      <div className='decision-wrap'>
        <li className="media list-group-item p-4">
          <img className="media-object d-flex align-self-start mr-3" src={this.userImage(decision.user)}/>
          <div className="media-body">
            <div className="media-body-text">
              <div className="media-heading">
                <small className="float-right text-muted">
                  { moment(decision.updated_at).fromNow() }
                </small>
                <h6>{ decision.user ? decision.user.nick_name : 'Anonymous' }</h6>
                <p dangerouslySetInnerHTML={this.rawMarkup(decision.question_html)}></p>
                <div className=''>
                  { decision.options.map(option => (
                    <a key={option} className={`btn btn-outline-primary btn-sm mr-1 ${option == this.state.answerOption && 'active'}`} onClick={this.handleOptionClick} data-answer={option}>
                      { option + ' ' }
                      <span className="badge badge-light">{decision.answers ? decision.answers.filter(answer => answer.answer_option == option).length : 0}</span>
                    </a>
                  )) }
                </div>
              </div>
            </div>
          </div>
        </li>
        { this.state.showAnswerBox &&
            <div>
              { this.state.answers.filter(answer => answer.answer_option == this.state.answerOption).map(answer => (
                  <AnswersContainer key={answer.id} answer={answer} />
              )) }
              <InlineAnswerBox
                key={this.state.answerOption}
                answerOption={this.state.answerOption}
                decisionId={decision.id}
                answerAdded={this.answerAdded}
                hideAnswers={this.hideAnswers} />
            </div>
        }
      </div>
    );
  }
}
