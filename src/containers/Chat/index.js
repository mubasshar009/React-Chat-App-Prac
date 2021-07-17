import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { get_users } from '../../store/action';
import firebase from '../../config/firebase';
class Chat extends Component {
    constructor(props) {
        super(props)

        this.state = {
            chat_user: {},
            chats: [],
            message: ""
        }
    }
    chat = (user) => {
        this.setState({
            chat_user: user,
        })
        let current_user = this.props.current_user;
        let merge_uid = this.uid_merge(current_user.uid, user.uid)
        this.get_messages(merge_uid)

    }

    componentDidMount() {
        this.props.get_users()

    }
    uid_merge(uid1, uid2) {
        if (uid1 < uid2) {
            return uid1 + uid2
        } else {
            return uid2 + uid1
        }
    }
    get_messages = (uid) => {
        firebase.database().ref('/').child(`chats/${uid}`).on('child_added', (message) => {
            this.state.chats.push(message.val());
            this.setState({
                chats: this.state.chats
            })
        })
    }
    send_message = () => {
        let user = this.props.current_user;
        let chat_user = this.state.chat_user;
        let merge_uid = this.uid_merge(user.uid, chat_user.uid)

        firebase.database().ref('/').child(`chats/${merge_uid}`).push({
            message: this.state.message,
            name: user.name,
            uid: user.uid
        })
        this.setState({
            message: ""
        })

    }

    render() {

        let user = this.props.current_user;
        console.log("Firebase Messages", this.props.chats)
        return (

            <div>
                <h3>WellCome !{user.name}</h3>
                <img src={user.profile} />
                <h4>Your Email :{user.email}</h4>
                <div style={{ display: 'flex' }}>
                    <div style={{ backgroundColor: 'green' }}>
                        <h4> Chat User</h4>
                        <ul>
                            {this.props.users.map((val) => {
                                console.log(val);
                                return val.uid !== user.uid && (<li key={val.uid}>
                                    <img src={val.profile} width="30px" />
                                    {val.name}
                                    <button onClick={() => this.chat(val)}>Chat</button>
                                </li>)
                            })}
                        </ul>
                    </div>
                    <div style={{ width: '400px', backgroundColor: 'yellow' }}>
                        <h4>Chat</h4>
                        {Object.keys(this.state.chat_user).length ?
                            <div>
                                <h4>
                                    <img src={this.state.chat_user.profile} width="30px" /> {this.state.chat_user.name}
                                </h4>
                                <ul>
                                    {this.state.chats.map((v, i) => {
                                        return <li style={{ color: v.uid === user.uid ? "red" : "green" }} key={i}>{v.message}</li>
                                    })}
                                </ul>
                                <input type="text" value={this.state.message} onChange={(e) => this.setState({ message: e.target.value })} placeholder="Enter Your Message" />
                                <button onClick={() => this.send_message()}>Send</button>
                            </div> :
                            <h3>No User</h3>

                        }


                    </div>
                </div>
                <p>
                    <Link to="/">
                        Back To Home
                    </Link>
                </p>
            </div >
        )
    }
}
const mapStateToProps = (state) => ({
    current_user: state.current_user,
    users: state.users
})
const mapDispatchToProps = (dispatch) => ({
    get_users: () => dispatch(get_users())
})
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
