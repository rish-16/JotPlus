var config = {
    apiKey: "AIzaSyBBoOjpRwVt734Tlp75hGp553p6rQNquQc",
    authDomain: "jotplus-97323.firebaseapp.com",
    databaseURL: "https://jotplus-97323.firebaseio.com",
    projectId: "jotplus-97323",
    storageBucket: "jotplus-97323.appspot.com",
    messagingSenderId: "968420953358"
}
firebase.initializeApp(config)

document.addEventListener('DOMContentLoaded', () => {
    const username = document.getElementById('user-fullname-register')
    const email = document.getElementById('user-email-register')
    const password = document.getElementById('user-password-register')
    const registerButton = document.getElementById('register-submit')
    const errorMessage = document.getElementById('error-message')

    const loginAccountButton = document.getElementById('register-account')

    const ref = firebase.database().ref()

    loginAccountButton.onclick = () => {
        window.location = 'login.html'
    }

    registerButton.onclick = () => {
        userEmail = email.value
        userPWD = password.value
        if (userEmail.length < 1 || userPWD.length < 1) {
            errorMessage.innerText = 'Email or password cannot be empty'
        } else {
            var promise = firebase.auth().createUserWithEmailAndPassword(userEmail, userPWD)
            promise.then(() => {
                console.log('Logged in to DB')
            })
            promise.catch((err) => {                
                console.log(err)
            })
        }
    }

    firebase.auth().onAuthStateChanged((user) => {
        if (user) { // User exists 
            console.log(user.uid)
            ref.child('User Data').child(user.uid).child('Username').set(username.value).then(() => {
                window.location = 'index.html'
            })
        } else {
            console.log('No user logged in')
        }
    })
})