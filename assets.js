function Jot(user, title, content) {
    this.jUser = user
    this.title = title
    this.content = content
    this.creationDate = getCreationDate()
    this.timestamp = getTimestamp()
}

Jot.prototype.handleDeployment = function(container) {
    const ref = firebase.database().ref()
    ref.child('User Data').child(this.jUser).child('Jots').child(randomID()).set({
        'TITLE': this.title,
        'CONTENT': this.content,
        'USER': this.jUser,
        'CREATIONDATE': this.creationDate,
        'TIMESTAMP': this.timestamp
    })
    var card = new JotCard(this.title, this.content, this.creationDate)
    card.addCard(container)
}

function randomID() {
    var ID = ""
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  
    for (var i = 0; i < 8; i++)
      ID += possible.charAt(Math.floor(Math.random() * possible.length))
  
    return ID
}

var getCreationDate = function() {
    var currentDate = new Date()
    var allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    var date = currentDate.getDate()
    var month = allMonths[currentDate.getMonth()]
    var year = currentDate.getFullYear()

    return date + ' ' + month + ' ' + year
}

var getTimestamp = function() {
    var date = new Date()
    var timestamp = date.getTime()

    return timestamp
}

/* -------------------------------------------------------------------------------------------------------------- */

function JotCard(title, content, date) {
    this.title = title
    this.preview = content
    this.date = date
}

JotCard.prototype.addCard = function(container) {
    var newNote = document.createElement('div')
    newNote.classList += 'note'

    var newNoteTop = document.createElement('div')
    newNoteTop.classList += 'note-top'

    var newNoteTopTitle = document.createElement('p')
    newNoteTopTitle.classList += 'note-title'
    newNoteTopTitle.innerText = this.title
    var newNoteTopDate = document.createElement('p')
    newNoteTopDate.classList += 'note-creation-date'
    newNoteTopDate.innerText = this.date

    var newNoteBottom = document.createElement('div')
    newNoteBottom.classList += 'note-bottom'

    var newNoteBottomContent = document.createElement('p')
    newNoteBottomContent.classList += 'note-content'
    newNoteBottomContent.innerHTML = this.preview

    newNoteTop.appendChild(newNoteTopTitle)
    newNoteTop.appendChild(newNoteTopDate)
    newNoteBottom.appendChild(newNoteBottomContent)
    newNote.appendChild(newNoteTop)
    newNote.appendChild(newNoteBottom)
    container.prepend(newNote)
}

/* -------------------------------------------------------------------------------------------------------------- */

function MessageCard(msg) {
    this.message = msg
}

MessageCard.prototype.addMessage = function() {
    var card = document.createElement('div')
    card.classList = 'message-card'

    var p = document.createElement('p')
    p.innerHTML = '<i class="fas fa-info-circle"></i>' + ' ' + this.message

    card.appendChild(p)
    document.body.appendChild(card)

    setTimeout(function() {
        document.body.removeChild(card)
    }, 2500)
}