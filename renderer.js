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
    console.log('App loaded')

    const notesArea = document.getElementById('notes-area')
    const addNoteButton = document.getElementById('add-note-button')
    const profileUsername = document.getElementById('profile-username')
    const logoutButton = document.getElementById('account-info')

    const writingArea = document.getElementById('writing-area')

    let userId = null
    const ref = firebase.database().ref()
    const stRef = firebase.storage().ref()
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            userId = firebase.auth().currentUser.uid
            loadUser(userId)
            console.log(userId)
            loadNotes(userId)
        } else {
            // No user is signed in.
            console.log('No user has signed in.')
        }
    })

    function loadUser(user) {
        ref.child('User Data').child(user).child('Username').once('value', (snapshot) => {
            profileUsername.innerHTML = snapshot.val()
        })
    }

    addNoteButton.onclick = () => { 
        writingArea.innerHTML = ''
        var project = new Jot(userId, title, content)
        var date = project.getDate()
        var card = new JotCard(title, content, date)
        card.addCard(notesArea)
        writingArea.addEventListener('input', (evnt) => {        
            var content = evnt.target.innerText
            var title = content.split('\n')[0]
            if (content.length > 0) {
                setInterval(() => {
                    project.handleDeployment(notesArea, writingArea)
                }, 6000)
            }
        })
    }

    logoutButton.onclick = () => {
        var promise = firebase.auth().signOut()
        promise.then(() => {
            window.location = 'login.html'
        })
        promise.catch(function (err) {
          // Handle errors
        })        
    }

    function loadNotes(user) {
        ref.child('User Data').child(user).child('Jots').once('value', (snapshot) => {
            snapshot.forEach((child) => {
                var data = child.val()
                console.log(data)
                var title = data['TITLE']
                var content = data['CONTENT']
                var date = data['CREATIONDATE']
                
                var card = new JotCard(title, content, date)
                card.addCard(notesArea, writingArea)
            })
        })
    }

})