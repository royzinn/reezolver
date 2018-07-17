import React from 'react';
import { TrixEditor } from "react-trix";
import TagsInput from 'react-tagsinput'
import axios from 'axios';

export default class DecisionFormBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question_html: null,
      question_text: null,
      options: [],
      tags: []
    };

    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.addOption = this.addOption.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleQuestionChange(html, text) {
    this.setState({question_html: html, question_text: text});
  }

  handleOptionsChange(i, event) {
     let options = [...this.state.options];
     options[i] = event.target.value;
     this.setState({ options });
  }

  handleTagsChange(tags) {
    this.setState({ tags })
  }

  addOption(event) {
    event.preventDefault()
    this.setState(prevState => ({ options: [...prevState.options, '']}))
  }

  addOptionTag(i, event) {
    event.preventDefault()
    let tags = this.state.tags.slice()
    tags.push(this.state.options[i])
    this.setState({tags: tags.reduce((x, y) => x.includes(y) ? x : [...x, y], [])});
  }

  removeOptionTag(i, event) {
    event.preventDefault()
    let options = [...this.state.options];
     options.splice(i, 1);
     this.setState({ options });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.options.length < 2) {
      alert('please have at lease two options')
      return
    }
    if (this.state.question_text == null) {
      alert("question can't be blank")
      return
    }
    axios.post('/decisions', {
      question_html: this.state.question_html,
      question_text: this.state.question_text,
      options: this.state.options,
      tags: this.state.tags
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <form className="new-decision" onSubmit={this.handleSubmit}>
        <div className="question-section">
          <div className="title text-uppercase">
            <i className="icon icon-light-bulb mr-3"></i>
            <div className="text">
              <div className="name">describe your decision</div>
            </div>
          </div>
          <li className="media list-group-item p-4 d-flex flex-column">
            <div className='input-group'>
              <TrixEditor onChange={this.handleQuestionChange} />
            </div>
          </li>
        </div>
        <div className="options-section">
          <div className="title text-uppercase">
            <i className="icon icon-area-graph mr-3"></i>
            <div className="text">
              <div className="name">options for making the right decision</div>
            </div>
          </div>
          { this.state.options.map((option, i) =>
            <li className="media list-group-item p-4 d-flex" key={i}>
              <div className='option-wrap d-flex input-group'>
                <input type="text" className="form-control" onChange={this.handleOptionsChange.bind(this, i)} value={option || ''} />
                <span className="input-group-btn">
                  <button className="btn btn-secondary" type="button" onClick={this.addOptionTag.bind(this, i)}>+ Add tag</button>
                </span>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.removeOptionTag.bind(this, i)}>
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            </li>
          )}
          <button className="add-option" onClick={this.addOption}>
            <div className="layout">
              <i className="icon icon-circle-with-plus"></i>
              Add option
            </div>
          </button>
        </div>
        <div className="tags-section">
          <div className="title text-uppercase">
            <i className="icon icon-tag mr-3"></i>
            <div className="text">
              <div className="name">tags</div>
            </div>
          </div>
        </div>
        <TagsInput value={this.state.tags} onChange={this.handleTagsChange} />
        <div className='input-group d-flex flex-row-reverse'>
          <button type="submit" className="btn btn-sm btn-primary">submit</button>
        </div>
      </form>
    );
  }
}
