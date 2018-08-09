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
    loadJots()
    console.log('App loaded')

    const seeHome = document.getElementById('see-home')
    const seeTrashCan = document.getElementById('see-trash-can')
    const seeSettings = document.getElementById('see-settings')

    const notesArea = document.getElementById('notes-area')

    seeHome.addEventListener('click', () => {
        console.log('Opening Home')
        window.location = './index.html'
    })
    seeTrashCan.addEventListener('click', () => {
        console.log('Opening trash can')
        window.location = './deleted.html'
    })
    seeSettings.addEventListener('click', () => {
        console.log('Opening settings')
    })

    const snapshotToArray = (snapshot) => {
        const ret = [];
        snapshot.forEach((childSnapshot) => {
            ret.push(childSnapshot);
        });
        return ret;
    }

    function loadJots() {
        console.log('Loading past Jots')
        firebase.database().ref().child('Deleted Jots').on('value', (snapshot) => {
            snapshotToArray(snapshot).reverse().forEach((child) => {
                var newJot = child.val()

                var newCard = document.createElement('div')
                newCard.classList += 'card'
                var newCardPreview = document.createElement('div')
                newCardPreview.classList += 'card-preview'
                var newCardInfo = document.createElement('div')
                newCardInfo.classList += 'card-info'

                var newCardPreviewText = document.createElement('div')
                newCardPreviewText.classList += 'card-preview-text'
                newCardPreviewText.innerText = newJot['Jot Content']
        
                var newCardInfoLeft = document.createElement('div')
                newCardInfoLeft.classList += 'card-info-left'
                var newCardInfoRight = document.createElement('div')
                newCardInfoRight.classList += 'card-info-right'
    
                var newCardInfoRightEllipses = document.createElement('p')
                newCardInfoRightEllipses.innerHTML += '<i class="fas fa-ellipsis-v"></i>'
        
                newCardInfoRightEllipses.addEventListener('click', () => {
                    console.log('More options...')
                })
        
                var newCardInfoTitle = document.createElement('p')
                newCardInfoTitle.classList += 'card-info-title'
                newCardInfoTitle.innerText = newJot['Jot Title']
        
                var newCardInfoDate =  document.createElement('p')
                newCardInfoDate.classList += 'card-info-date'
                newCardInfoDate.innerText = newJot['Jot Created']
        
                newCardInfoRight.appendChild(newCardInfoRightEllipses)
        
                newCardInfoLeft.appendChild(newCardInfoTitle)
                newCardInfoLeft.appendChild(newCardInfoDate)
        
                newCardInfo.appendChild(newCardInfoLeft)
                newCardInfo.appendChild(newCardInfoRight)
        
                newCardPreview.appendChild(newCardPreviewText)
                newCard.appendChild(newCardPreview)
                newCard.appendChild(newCardInfo)
        
                notesArea.appendChild(newCard)                
            })
        })
    }
})