function Jot(user, title, content) {
    this.jotID = randomID()
    this.jUser = user
    this.title = title
    this.content = content
    this.creationDate = getCreationDate()
    this.timestamp = getTimestamp()
}

Jot.prototype.getDate = function() {
    return this.creationDate
}

Jot.prototype.handleDeployment = function() {
    const ref = firebase.database().ref()
    ref.child('User Data').child(this.jUser).child('Jots').child(this.jotID).set({
        'TITLE': this.title,
        'ID': this.jotID,
        'CONTENT': this.content,
        'USER': this.jUser,
        'CREATIONDATE': this.creationDate,
        'TIMESTAMP': this.timestamp
    })
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

JotCard.prototype.addCard = function(container, writingContainer) {
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

    newNote.onclick = () => {
        var writingArea = new WritingArea(this.title, this.preview)
        writingArea.loadJot(writingContainer)
    }
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

/* -------------------------------------------------------------------------------------------------------------- */

function WritingArea(title, content) {
    this.title = title
    this.content = content
}

WritingArea.prototype.loadJot = function(container) {
    var jot = document.createElement('div')
    jot.id = 'writing-area'

    jot.innerHTML += '<strong style="font-size: 20px;">' + this.title +'</strong>'
    jot.innerHTML += '<br><br>'
    jot.innerHTML +=  this.content.split('\n').splice(1,2)[1]

    container.innerHTML = ''
    container.appendChild(jot)
}
