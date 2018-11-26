import React from "react";
import '../../static/style.css'
import { Link } from 'react-router-dom'

class QuestApp extends React.Component {
    constructor() {
        super()
        this.state = {
            messages: [],
            options: [],
            loadMessageList: false,
            loadSendMessageForm: false
        }
        this.sendMessage = this.sendMessage.bind(this)
        this.chatUpdate = this.chatUpdate.bind(this)

    }

    componentDidMount() {
        fetch(`api/questionnaire/${this.props.match.params.slug}`)
            .then(response => {
                if (response.status !== 200) {
                    return this.setState({ placeholder: "Something went wrong" });
                }
                return response.json();
            })
            .then(data => {
                this.setState({ questionnaireID: data[0].id, questionnaireName: data[0].name, mID: 0 })
                this.chatUpdate('', data[0].id, 0);
            });
    }

    sendMessage(selectedOption) {
        this.chatUpdate(selectedOption, this.state.questionnaireID, selectedOption.id)
    }

    chatUpdate(selectedOption, _questionnaireID, _mID) {
        let _message = this.getMessage(_questionnaireID, _mID);
        var _senderKey = {sender: "You"};
        var _arianaKey = {sender: "Ariana"};
        // selectedOption = [...selectedOption, ..._senderKey];
        // console.log(selectedOption);

        _message.then(message => {

            selectedOption ?
                this.setState({
                    messages: [...this.state.messages,  Object.assign(selectedOption, _senderKey), Object.assign(message, _arianaKey)],
                    rID: message.id,
                    questionnaireID: _questionnaireID,
                    loadMessageList: true,
                    loadSendMessageForm: true
                }) :
                this.setState({
                    messages: [...this.state.messages, Object.assign(message, _arianaKey)],
                    rID: message.id,
                    questionnaireID: _questionnaireID,
                    loadMessageList: true,
                    loadSendMessageForm: true
                })
        })
    }

    getMessage(_questionnaireID, _mID) {
        return fetch(`api/getMessages/${_questionnaireID}/${_mID}`)
            .then(response => {
                if (response.status !== 200) {
                    return;
                }
                return response.json();
            })
            .then(data => { console.log(data[0]); return data[0] })
    }

    getMessages(_mID) {
        return fetch(`api/getMessage/${_mID}`)
            .then(response => {
                if (response.status !== 200) {
                    return;
                }
                return response.json();
            })
            .then(data => { console.log(data[0]); return data[0] })

    }

    render() {
        return (
            <div>
                <Title name={this.state.questionnaireName} />
                {this.state.loadMessageList ?
                    <MessageList
                        messageID={this.state.mID}
                        questionnaireID={this.state.questionnaireID}
                        messages={this.state.messages}
                        getMessageList={this.getMessageList} /> : null}
                {this.state.loadSendMessageForm ?
                    <SendMessageForm
                        questionnaireID={this.state.questionnaireID}
                        responseID={this.state.rID}
                        sendMessage={this.sendMessage}
                        options={this.state.options} /> : null}
            </div>
        );
    }
}

class MessageList extends React.Component {
    constructor() {
        super()
        this.state = {
            messages: []
        }
    }

    render() {
        return (
            <section class="section">
                <div class="container">
                    {this.props.messages.map((message, index) => {
                        return (
                            <article class="message is-dark">
                                <div class="message-header">
                                    <p>{message.sender}</p>
                                </div>
                                <div class="message-body">
                                    {message.text}
                                </div>
                            </article>
                        )
                    })}
                </div>
            </section>
        )
    }
}

class SendMessageForm extends React.Component {
    constructor() {
        super()
        this.state = {
            options: []
        }
        this.handleClick = this.handleClick.bind(this)
        this.showOptions = this.showOptions.bind(this)
    }

    componentDidMount() {
        console.log(`sendmsg/${this.props.questionnaireID}/${this.props.responseID}`)
        this.showOptions(this.props.responseID);
    }

    componentWillReceiveProps(newProps) {
        console.log(`sendmsgupdate/${this.props.questionnaireID}/${newProps.responseID}`)
        if (this.props.responseID != newProps.responseID)
            this.showOptions(newProps.responseID);
    }

    showOptions(_responseID) {
        fetch(`api/getMessages/${this.props.questionnaireID}/${_responseID}`)
            .then(response => {
                if (response.status !== 200) {
                    return this.setState({ placeholder: "Something went wrong" });
                }
                return response.json();
            })
            .then(data => this.setState({ options: data }));
    }

    handleClick(mID) {
        this.props.sendMessage(mID)
        this.setState({
            options: []
        })
    }

    render() {
        return (
            <footer class="footer">
                <article class="message is-link">
                    <div class="message-header">
                        <p>Please Click on any option</p>
                    </div>
                    <div class="message-body">
                        <div class="content tile is-ancestor">
                            {this.state.options.map(option => (
                                <div key={option.id} onClick={() => this.handleClick(option)} className="tile is-parent is-2 ">
                                    <article className="tile is-child box is-primary">
                                        <p className="title">{option.text}</p>
                                    </article>
                                </div>
                            ))}
                        </div>
                    </div>
                </article>
            </footer>
        )
    }
}

function Title({ name }) {
    return (
        <nav class="level">
            <div class="level-left">
                <p class="level-item"><Link to='/'><a class="button is-info">Home</a></Link></p>
            </div>

            <div class="level-item has-text-centered">
                <div>
                    <p class="title">{name}</p>
                </div>
            </div>
        </nav>
    )
}

export default QuestApp