import React from 'react';
import { TrixEditor } from "react-trix";
import axios from 'axios';

let token = document.getElementsByName('csrf-token')[0].getAttribute('content')
axios.defaults.headers.common['X-CSRF-Token'] = token
axios.defaults.headers.common['Accept'] = 'application/json'

export default class InlineAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerHtml: `I would choose ${this.props.answerOption} because...`
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditorReady = this.handleEditorReady.bind(this);
  }

  handleEditorReady(editor) {
    editor.insertString(this.state.answerHtml);
  }

  handleChange(html, text) {
    this.setState({answerHtml: html});
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post('/answers', {
      content: this.state.answerHtml,
      answer_option: this.props.answerOption,
      decision_id: this.props.decisionId
    })
    .then((response) => {
      this.props.answerAdded(response.data.answer)
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <li className="media list-group-item p-4 d-flex flex-column">
          <div className='input-group'>
            <TrixEditor onChange={this.handleChange} onEditorReady={this.handleEditorReady} />
          </div>
          <hr/>
          <div className='answer-actions-wrap d-flex flex-row-reverse'>
            <button type="submit" className="btn btn-sm btn-primary">submit</button>
            <button type="button" className="btn btn-sm btn-secondary" onClick={this.props.hideAnswers}>cancel</button>
          </div>
        </li>
      </form>
    );
  }
}
