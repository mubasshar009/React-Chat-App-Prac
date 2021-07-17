import firebase from '../../config/firebase';

const fbLogIn = (history) => {
    return (dispatch) => {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // The signed-in user info.
                var user = result.user;

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var accessToken = credential.accessToken;
                let create_user = {
                    name: user.displayName,
                    email: user.email,
                    profile: user.photoURL,
                    uid: user.uid
                }
                firebase.database().ref('/').child(`users/${user.uid}`).set(create_user)
                    .then(() => {
                        dispatch({ type: "SETUSER", payload: create_user })
                        alert("Login SuccessFull")
                        history.push({ pathname: '/chat' })
                    })
            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;

                console.log(errorMessage)
            });
    }
}
const get_users = () => {
    return (dispatch) => {
        let users = [];
        firebase.database().ref('/').child("users").on('child_added', (data) => {
            const store = data.val();

            users.push(store);


        })
        console.log(users);
        dispatch({ type: "SETFIREBASEUSER", payload: users })
    }
}

export {
    fbLogIn,
    get_users
}