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

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            window.localStorage.setItem('CurrentUser', user)
            firebase.database().ref().child('User Data').child(user.uid).child('Username').once('value').then((snapshot) => {
                profileUsername.innerHTML = snapshot.val() 
                loadNotes(user)
            })
        } else {
            console.log('No user logged in')
        }
    })

    function urlify(text) {
        var urlRegex = /(https?:\/\/[^\s]+)/g
        return text.replace(urlRegex, function(url) {
            return '<a style="color: #25B892;" href="' + url + '">' + url + '</a>'
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

    addNoteButton.onclick = () => {
        var randomID = ''
        chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        for (var i = 16; i > 0; --i) randomID += chars[Math.floor(Math.random() * chars.length)]
        var date = new Date()
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
        var current_date = date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear()
        var curent_time = date.getTime()
        firebase.database().ref().child('User Data').child(user.uid).child('Jots').child(randomID).set({
            'Jot Content': '',
            'Jot Created': current_date,
            'Jot Timestamp': curent_time,
            'Jot ID': randomID,
            'Jot Title': 'Untitled Jot',
        })
        loadNotes()
    }

    function loadNotes(user) {
        firebase.database().ref().child('User Data').child(user.uid).child('Jots').on('value', (snapshot) => {
            console.log(snapshot.val())
            snapshot.forEach((child) => {
                console.log('Adding new note')
                var newNote = document.createElement('div')
                newNote.classList += 'note'

                var newNoteTop = document.createElement('div')
                newNoteTop.classList += 'note-top'

                var newNoteTopTitle = document.createElement('p')
                newNoteTopTitle.classList += 'note-title'
                newNoteTopTitle.innerText = child.val()['Jot Title']
                var newNoteTopDate = document.createElement('p')
                newNoteTopDate.classList += 'note-creation-date'
                newNoteTopDate.innerText = child.val()['Jot Created']

                var newNoteBottom = document.createElement('div')
                newNoteBottom.classList += 'note-bottom'

                var newNoteBottomContent = document.createElement('p')
                newNoteBottomContent.classList += 'note-content'
                newNoteBottomContent.innerHTML = child.val()['Jot Content']

                newNoteTop.appendChild(newNoteTopTitle)
                newNoteTop.appendChild(newNoteTopDate)
                newNoteBottom.appendChild(newNoteBottomContent)
                newNote.appendChild(newNoteTop)
                newNote.appendChild(newNoteBottom)
                notesArea.appendChild(newNote)
            })
        })
    }

})