// lets add up the game control, 
const allColumns = document.querySelectorAll("div.row div.col")

// lets grab an element to show the results, 
const resultInfo = document.querySelector("div.result-info")

// lets grab an element to quit the game or retry || play again, 
const quitGame = document.querySelector("div.quit")
const retryGame = document.querySelector("div.retry")

const game_ids = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
]

let clicked_ids = []
let remained_ids = ["0", "1", "2", "3", "4", "5", "6", "7", "8"]

let first_user_tics = []
let second_user_tics = []

let first_user_clicked = false 
let second_user_clicked = false 

let game = false 

let resultInfoTxt = ""

allColumns.forEach(function(el, index) {
    el.onclick = (e) => {
        if ( game ) {
            log("Already Player wins")
        } else {
            let clicked_id = e.target.attributes["data"].value 

            let count = 0
            if ( first_user_clicked ) {
                count = 0
                clicked_ids.forEach(function(id, i) {
                    if ( clicked_id == id || clicked_id === id ) {
                        count += 1

                        return 
                    }
                })

                if ( count >= 1 ) {
                    log("Already found")
                } else {
                    el.innerHTML = "0"
                    resultInfoTxt = "X - Turn"

                    showResultInfo(resultInfoTxt)
                    clicked_ids.push(clicked_id)
                    remained_ids.splice(remained_ids.indexOf(clicked_id), 1)
                    log(remained_ids)
                    first_user_tics.push(eval(`${clicked_id} + 1`))

                    second_user_clicked = true 
                    first_user_clicked = false 

                    if ( first_user_tics.length >= 3 ) {
                        checkIdsArr(first_user_tics, "User 1")
                    }
                }

            } else {
                count = 0

                clicked_ids.forEach(function(id, i) {
                    if ( clicked_id == id || clicked_id === id ) {
                        count += 1

                        return 
                    }
                })

                if ( count >= 1 ) {
                    log("Already found")
                } else {
                    el.innerHTML = "X"
                    resultInfoTxt = "0 - Turn"
                    
                    showResultInfo(resultInfoTxt)
                    clicked_ids.push(clicked_id)
                    remained_ids.splice(remained_ids.indexOf(clicked_id), 1)
                    log(remained_ids)
                    second_user_tics.push(eval(`${clicked_id} + 1`))
                    
                    first_user_clicked = true 
                    second_user_clicked = false 

                    if ( second_user_tics.length >= 3 ) {
                        checkIdsArr(second_user_tics, "User 2")
                    }
                }
            }

            el.style.background = "whitesmoke"
        }
    }

    el.onmouseover = () => {
        showRestBox(true, remained_ids)
    }

    el.onmouseout = () => {
        showRestBox(false, remained_ids)
    }
})

function showResultInfo(info) {
    resultInfo.innerHTML = info
}

function showRestBox(hover, rest) {
    if ( hover ) {
        for ( let i = 0; i < rest.length; i++ ) {
            allColumns[rest[i]].style.background = "#88C6F01C"
        }
    } else {
        for ( let i = 0; i < rest.length; i++ ) {
            allColumns[rest[i]].style.background = "#FFFFFF"
        }
    }
}

function checkIdsArr(arr, name) {
    let __arr = arr.sort()

    let matched = false 
    let game_id = []
    let match_count = 0

    for ( let i = 0; i < game_ids.length; i++ ) {
        match_count = 0 
        game_id = game_ids[i]
        game_id = game_id.sort()

        for ( let j = 0; j < __arr.length; j++ ) {
            for ( let k = 0; k < game_id.length; k++ ) {
                if ( __arr[j] == game_id[k] ) {
                    match_count += 1

                    break
                } else {
                    continue 
                }
            }

            if ( match_count >= 3 ) {
                game = true 

                break 
            } else {
                continue
            }
        }
        if ( game ) {
            resultInfo.innerHTML = `${name} won 🎉`
            
            log(arr + "\n" + name + " won the game!.")

            break
        }
    }
}

retryGame.addEventListener("click", resetGame)
quitGame.addEventListener("click", closeGameBox)

function resetGame() {
    clicked_ids = []
    remained_ids = ["0", "1", "2", "3", "4", "5", "6", "7", "8"]

    first_user_tics = []
    second_user_tics = []

    first_user_clicked = false 
    second_user_clicked = false 

    game = false 

    allColumns.forEach(function(el, i) {
        el.innerHTML = "."
    })

    resultInfo.innerHTML = ""
}

function closeGameBox() {
    if ( playGame ) {
        if ( gameBoxContainer.style.display == "flex" ) {
            gameBoxContainer.style.display = "none"
        } else {
            gameBoxContainer.style.display = "flex"
        }
    } else {
        if ( gameBoxContainer.style.display == "flex" ) {
            gameBoxContainer.style.display = "none"
        }
    }
}

window.onkeyup = (e) => {
    if ( e.keyCode == 32 ) {
        resetGame()
    } else if ( e.keyCode == 27 ) {
        closeGameBox()
    }
}
