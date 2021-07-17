import React, { Component } from 'react'

import './style.css';
import { connect } from 'react-redux';
import { fbLogIn } from '../../store/action';

class Home extends Component {
    render() {
        const { history } = this.props

        return (
            <div>
                <h1>Home</h1>
                <button onClick={() => this.props.fbLogIn(history)}>FACEBOOK LOGIN</button>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    users: state.users
})
const mapDispatchToProps = (dispatch) => ({
    fbLogIn: (history) => dispatch(fbLogIn(history))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
