import React from 'react';
import moment from 'moment/moment'

export default class AnswersContainer extends React.Component {
  createMarkup() {
    return {__html: this.props.answer.content};
  }

  userImage(user){
    return (user && user.image_url) || '/assets/avatar.png'
  }

  render() {

    const answer = this.props.answer

    return (
      <li className="media list-group-item p-4 answer-wrap">
        <div className="m-3 js-conversation">
          <ul className="media-list media-list-conversation c-w-md">
            <li className="media mb-4">
              <img className="rounded-circle media-object mr-3" src={this.userImage(answer.user)} />
              <div className="media-body">
                <div className="media-body-text" dangerouslySetInnerHTML={this.createMarkup()} />
                <div className="media-footer">
                  <small className="text-muted">
                    <a href="#">{answer.user ? answer.user.nick_name : 'Anonymous'}</a> { moment(answer.updated_at).fromNow() }
                  </small>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </li>
    );
  }
}
