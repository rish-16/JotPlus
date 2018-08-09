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
    const email = document.getElementById('user-email-login')
    const password = document.getElementById('user-password-login')
    const loginButton = document.getElementById('login-submit')
    const errorMessage = document.getElementById('error-message')

    const registerAccountButton = document.getElementById('register-account')
    const forgotPWDButton = document.getElementById('forgot-pwd')

    registerAccountButton.onclick = () => {
        window.location = 'register.html'
    }

    loginButton.onclick = () => {
        userEmail = email.value
        userPWD = password.value
        if (userEmail.length < 1 || userPWD.length < 1) {
            errorMessage.innerText = 'Email or password cannot be empty'
        } else {
            firebase.auth().signInWithEmailAndPassword(userEmail, userPWD).catch((err) => {
                console.log(err)
            })
        }
    }

    firebase.auth().onAuthStateChanged((user) => {
        if (user) { // User exists 
            console.log(user.uid)
            window.location = 'index.html'
        } else {
            console.log('No user logged in')
        }
    })
})