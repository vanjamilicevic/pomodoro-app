
/*

  ---------------------------------
  
  Utils functions

  ---------------------------------

*/

/*
  Function that converts minutes and seconds => seconds 
*/
const toSeconds = (minutes, seconds) => {
  return minutes * 60 + seconds
}

/*
  Function that converts seconds => minutes and seconds
*/
const toMinutesAndSeconds = (seconds) => {
  return [Math.floor(seconds / 60), seconds % 60];
}

/*
  Function that initializes minutes and seconds on the screen
*/
const initializeTime = (minutes, seconds) => {
  
  const min = minutes < 10 ? "0" + minutes.toString() : minutes.toString()
  const sec = seconds < 10 ? "0" + seconds.toString() : seconds.toString()
  document.getElementById("counter").innerHTML = `${min}:${sec}`
}

/*
  Function that reads and updates time until it reaches 
*/
let pauseExecution = false
const updateTime = (ms) => {

  const counterElement = document.getElementById("counter")
  const intervalFunction = setInterval(() => {

    const minutes = Number(counterElement.innerHTML.split(":")[0])
    const seconds = Number(counterElement.innerHTML.split(":")[1])

    if (minutes === 0 && seconds === 0) {

      document.getElementById("command").innerHTML = "RESTART"
      document.getElementById("command").classList.toggle("command-restart")
      pauseExecution = true
      clearInterval(intervalFunction)
      return
    }

    if(pauseExecution) {

      clearInterval(intervalFunction)
      return
    }
      
    const totalSeconds = toSeconds(minutes, seconds)
    let [min, sec] = toMinutesAndSeconds(totalSeconds - 1)
    min = min < 10 ? "0" + min.toString() : min.toString()
    sec = sec < 10 ? "0" + sec.toString() : sec.toString()
    counterElement.textContent = `${min}:${sec}`
  }, ms)
}
;
const startProgress = (seconds) => {

  document.getElementById("load").style = `
        stroke-width: 18;
        animation: load ${seconds}s linear;
      `
}

const stopProgress = () => {
  
  document.getElementById('load').style.animationPlayState = 'paused'
}

const cleanProgress = () => {
  document.getElementById("load").style = `
        stroke-width: 0;
        animation: none;
      `
  document.getElementById('load').style.animationPlayState = 'paused'
}

const restartProgress = (seconds) => {

  cleanProgress()
  initializeTime(window.localStorage["short-break-minutes"], 0)
  pauseExecution = true
  updateCommand(true)

  document.getElementById("load").style = `
        stroke-width: 18;
        animation: load ${seconds}s linear;
      `
}

/*
  Function that switches active mode
*/
const switchMode = (newMode) => {

  cleanProgress()
  const storage = window.localStorage
  switch (newMode) {
    case "pomodoro":
      initializeTime(storage["pomodoro-minutes"], 0)
      pauseExecution = true
      updateCommand(true)
      document.getElementById("pomodoro").classList.remove("inactive-option")
      document.getElementById("short-break").classList.add("inactive-option")
      document.getElementById("long-break").classList.add("inactive-option")
      break
    case "short-break":
      initializeTime(storage["short-break-minutes"], 0)
      pauseExecution = true
      updateCommand(true)
      document.getElementById("pomodoro").classList.add("inactive-option")
      document.getElementById("short-break").classList.remove("inactive-option")
      document.getElementById("long-break").classList.add("inactive-option")
      break
    case "long-break":
      initializeTime(storage["long-break-minutes"], 0)
      pauseExecution = true
      updateCommand(true)
      document.getElementById("pomodoro").classList.add("inactive-option")
      document.getElementById("short-break").classList.add("inactive-option")
      document.getElementById("long-break").classList.remove("inactive-option")
      break
    default:
      break
  }
} 

/*
  This function is used to update Pomodoro minutes, Short break minutes or Long break Minutes
  when user clicks on arrow up or down on settings modal

  Parameters:
  - changeType: Can have following values - pomodoro-minutes, short-break-minutes, 
                long-break-minutes. They correspond to HTML element IDs
  - Change: Can be +1 or -1 (integer)
*/
const changeSettingsValues = (changeType, change) => {

  const changeElement = document.getElementById(changeType)
  if (Number(changeElement.innerText) <= 1 && change === -1)
    return

  changeElement.innerText = Number(changeElement.innerText) + change
} 

/*
  Helper function - Called from within Settings modal 
  to update active font on modal itself (it does not save the font for the entire App)

  Parameters:
  newFont - font that was clicked, can be "kumbh-sans", "space-mono" and "roboto-slab"
*/
const switchActiveFont = (newFont) => {

  switch (newFont) {
    case "kumbh-sans":
      document.getElementById("kumbh-sans").classList.add("active-font")
      document.getElementById("space-mono").classList.remove("active-font")
      document.getElementById("roboto-slab").classList.remove("active-font")
      break
    case "roboto-slab":
      document.getElementById("kumbh-sans").classList.remove("active-font")
      document.getElementById("space-mono").classList.remove("active-font")
      document.getElementById("roboto-slab").classList.add("active-font")
      break
    case "space-mono":
      document.getElementById("kumbh-sans").classList.remove("active-font")
      document.getElementById("space-mono").classList.add("active-font")
      document.getElementById("roboto-slab").classList.remove("active-font")
      break
    default:
      break
  }
}

/*
  Helper function - Called when clicked on Apply button 
  it will save new font to the body of the page

  Parameters:
  newFont - font that was clicked newFont, can be "kumbh-sans", "space-mono" and "roboto-slab"
*/
const switchFont = (newFont) => {

  switch (newFont) {
    case "kumbh-sans":
      document.getElementById("body").classList.add("kumbh-sans")
      document.getElementById("body").classList.remove("space-mono")
      document.getElementById("body").classList.remove("roboto-slab")
      break
    case "roboto-slab":
      document.getElementById("body").classList.remove("kumbh-sans")
      document.getElementById("body").classList.add("space-mono")
      document.getElementById("body").classList.remove("roboto-slab")
      break
    case "space-mono":
      document.getElementById("body").classList.remove("kumbh-sans")
      document.getElementById("body").classList.remove("space-mono")
      document.getElementById("body").classList.add("roboto-slab")
      break
    default:
      break
  }
}

/*
  Helper function - Called from within Settings modal 
  to update active color on modal itself (it does not save the color for the entire App)

  Parameters:
  newColor - color that was clicked, can be "orange", "mint" and "purple"
*/
const switchActiveColor = (newColor) => {

  switch (newColor) {
    case "orange":
      document.getElementById("orange-checked").classList.remove("hidden")
      document.getElementById("mint-checked").classList.add("hidden")
      document.getElementById("purple-checked").classList.add("hidden")
      break
    case "mint":
      document.getElementById("orange-checked").classList.add("hidden")
      document.getElementById("mint-checked").classList.remove("hidden")
      document.getElementById("purple-checked").classList.add("hidden")
      break
    case "purple":
      document.getElementById("orange-checked").classList.add("hidden")
      document.getElementById("mint-checked").classList.add("hidden")
      document.getElementById("purple-checked").classList.remove("hidden")
      break
    default:
      break
  }
}

/*
  Helper function that receives class list of HTML document 
  and clears all classes that have "orange", "mint" or "purple" in it
*/
const clearColors = (classList) => {

  classList.forEach((className) => {
    if(className.includes("orange") || className.includes("mint") || className.includes("purple"))
      classList.remove(className)
  })
}

/*
  Helper function - Called when clicked on Apply button 
  it will save new color to the body of the page

  Parameters:
  newColor - color that was clicked, can be "orange", "mint" and "purple"
*/
const switchColor = (newColor) => {
  
  let pomodoroClasses= document.getElementById("pomodoro").classList
  let shortBreakClasses = document.getElementById("short-break").classList
  let longBreakClasses = document.getElementById("long-break").classList
  let loadClasses = document.getElementById("load").classList
  let applyClasses = document.getElementById("apply").classList

  clearColors(pomodoroClasses)
  clearColors(shortBreakClasses)
  clearColors(longBreakClasses)
  clearColors(loadClasses)
  clearColors(applyClasses)

  switch (newColor) {
    case "orange":
      pomodoroClasses.add("mode-option-orange")
      shortBreakClasses.add("mode-option-orange")
      longBreakClasses.add("mode-option-orange")
      loadClasses.add("load-orange")
      applyClasses.add("apply-orange")
      break
    case "mint":
      pomodoroClasses.add("mode-option-mint")
      shortBreakClasses.add("mode-option-mint")
      longBreakClasses.add("mode-option-mint")
      loadClasses.add("load-mint")
      applyClasses.add("apply-mint")
      break
    case "purple":
      pomodoroClasses.add("mode-option-purple")
      shortBreakClasses.add("mode-option-purple")
      longBreakClasses.add("mode-option-purple")
      loadClasses.add("load-purple")
      applyClasses.add("apply-purple")
      break
    default:
      break
  }
}

/* 
  Function that updates command text based on click or when applying the modal
  State changes are: 
    Start -> Pause
    Pause -> Start
    Restart -> Pause

  Function has optional modeChange parameter, in case it is true it means 
  that user made new pomodoro, short break or long break choice, in which case
  update function behaves slightly differently. State changes are:
    Start -> Start 
    Pause -> Start
    Restart -> Start
*/
const updateCommand = (modeChange = false, numberOfSeconds) => {

  const commandElement = document.getElementById("command")
  if (modeChange) {

    commandElement.innerHTML = "START"
    pauseExecution = true
    return 
  }

  const command = commandElement.innerHTML.trim()
  switch (command) {

    case "START" :
      pauseExecution = false
      updateTime(1000)
      startProgress(numberOfSeconds)
      commandElement.innerHTML = "PAUSE"
      break
    case "PAUSE":
      pauseExecution = true
      stopProgress()
      commandElement.innerHTML = "START"
      break
    case "RESTART": 
      let activeModeRestart = undefined
      for(let mode of document.getElementsByClassName("mode-option"))
        if(![...mode.classList].includes("inactive-option"))
          activeModeRestart = mode.id
      
      cleanProgress()
      initializeTime(window.localStorage[`${activeModeRestart}-minutes`], 0)
      pauseExecution = true

      setTimeout( function(){
        pauseExecution = false
        updateTime(1000)
        startProgress(numberOfSeconds)
        commandElement.innerHTML = "PAUSE"
      }, 1000)
      break
    default:
      break
  }
}

/*

  ---------------------------------
  
  On load

  ---------------------------------

*/

/*
  Local storage is set to 25 / 5 / 15 for Pomodoro, Short-break and Long-break
  in case it was empty

  Fetching stored values for pomodoro, short and long breaks
  as well as font and color, and updating the app
*/
window.onload = () => {

  const storage = window.localStorage
  if (!storage.getItem("pomodoro-minutes"))
    storage.setItem("pomodoro-minutes", 25)

  if (!storage.getItem("short-break-minutes"))
    storage.setItem("short-break-minutes", 5)

  if (!storage.getItem("long-break-minutes"))
    storage.setItem("long-break-minutes", 15)

  if (!storage.getItem("font"))
      storage.setItem("font", "kumbh-sans")

  if (!storage.getItem("color"))
      storage.setItem("color", "orange")

  if(storage.getItem("font"))
    switchFont(storage.getItem("font"))

  if(storage.getItem("color"))
    switchColor(storage.getItem("color"))

  document.getElementById("kumbh-sans").classList.remove("active-font")
  switch (storage.getItem("font")) {
    case "kumbh-sans":
      document.getElementById("kumbh-sans").classList.add("active-font")
      break
    case "roboto-slab":
      document.getElementById("roboto-slab").classList.add("active-font")
      break
    case "space-mono":
      document.getElementById("space-mono").classList.add("active-font")
      break
    default:
      break
  }

  document.getElementById("mint-checked").classList.remove("hidden")
  document.getElementById("purple-checked").classList.remove("hidden")
  switch (storage.getItem("color")) {
    case "orange":
      document.getElementById("mint-checked").classList.add("hidden")
  document.getElementById("purple-checked").classList.add("hidden")
      break
    case "mint":
      document.getElementById("orange-checked").classList.add("hidden")
  document.getElementById("purple-checked").classList.add("hidden")
      break
    case "purple":
      document.getElementById("orange-checked").classList.add("hidden")
  document.getElementById("mint-checked").classList.add("hidden")
      break
    default:
      break
  }
  
  initializeTime(storage.getItem("pomodoro-minutes"), 0)
}


/*

  ---------------------------------
  
  Event listeners

  ---------------------------------

*/

/*
  Since command (start, pause and restart) are set in SVG, and that text has letter spacing
  - when hovering over it using plain CSS, it works only when you hover over the letter, 
  however it won't work when you hover over spacing between letters. 

  Logical solution would be to add parent element to it and style the parent, 
  but the only parent element of <text> within SVG is <g> and it can't be styled. 

  Therefore additional absolute positioned HTML div is being used to bypass this issue,
  hence following two event listeners
*/
document.getElementById("command-wrapper").addEventListener("mouseenter", () => {

  switch (window.localStorage.getItem("color")) {
    case "orange":
      document.getElementById("command").classList.add("command-hovered-orange")
      document.getElementById("command").classList.remove("command-hovered-mint")
      document.getElementById("command").classList.remove("command-hovered-purple")
      break
    case "mint":
      document.getElementById("command").classList.remove("command-hovered-orange")
      document.getElementById("command").classList.add("command-hovered-mint")
      document.getElementById("command").classList.remove("command-hovered-purple")
      break
    case "purple":
      document.getElementById("command").classList.remove("command-hovered-orange")
      document.getElementById("command").classList.remove("command-hovered-mint")
      document.getElementById("command").classList.add("command-hovered-purple")
      break
  }
})

document.getElementById("command-wrapper").addEventListener("mouseout", () => {

  document.getElementById("command").classList.remove("command-hovered-orange")
      document.getElementById("command").classList.remove("command-hovered-mint")
      document.getElementById("command").classList.remove("command-hovered-purple")
})

/*
  - Setting pomodor, short break and long break from local storage 
  - Opening settings modal when settings button is clicked
*/
document.getElementById("settings-button").addEventListener("click", () => {

  
  const storage = window.localStorage
  document.getElementById("pomodoro-minutes").innerText = storage.getItem("pomodoro-minutes")
  document.getElementById("short-break-minutes").innerText = storage.getItem("short-break-minutes")
  document.getElementById("long-break-minutes").innerText = storage.getItem("long-break-minutes")

  document.getElementById("modal-container").classList.remove("hidden")
})

/*
  Closing settings modal when "x" is clicked
*/
document.getElementById("close-icon").addEventListener("click", () => {

  document.getElementById("modal-container").classList.add("hidden")
})

/*
  Adding event listener for clicking on arrow-up and arrow-down on settings modal
*/
document.getElementById("pomodoro-arrow-up").addEventListener("click", () => {
  
  changeSettingsValues("pomodoro-minutes", 1)
})

document.getElementById("pomodoro-arrow-down").addEventListener("click", () => {
  
  changeSettingsValues("pomodoro-minutes", -1)
})

document.getElementById("short-break-arrow-up").addEventListener("click", () => {
  
  changeSettingsValues("short-break-minutes", 1)
})

document.getElementById("short-break-arrow-down").addEventListener("click", () => {
  
  changeSettingsValues("short-break-minutes", -1)
})

document.getElementById("long-break-arrow-up").addEventListener("click", () => {
  
  changeSettingsValues("long-break-minutes", 1)
})

document.getElementById("long-break-arrow-down").addEventListener("click", () => {
  
  changeSettingsValues("long-break-minutes", -1)
})

/*
  Adding event listeners for font selection on Settings modal
*/
document.getElementById("kumbh-sans").addEventListener("click", () => {

  switchActiveFont("kumbh-sans")
})

document.getElementById("roboto-slab").addEventListener("click", () => {

  switchActiveFont("roboto-slab")
})

document.getElementById("space-mono").addEventListener("click", () => {

  switchActiveFont("space-mono")
})

/*
  Adding event listeners for color selection on Settings modal
*/
document.getElementById("color-choice-orange").addEventListener("click", () => {

  switchActiveColor("orange")
})

document.getElementById("color-choice-mint").addEventListener("click", () => {


  switchActiveColor("mint")
})

document.getElementById("color-choice-purple").addEventListener("click", () => {

  switchActiveColor("purple")
})

document.getElementById("apply").addEventListener("click", () => {

  const storage = window.localStorage
  let pomodoroMinutes = document.getElementById("pomodoro-minutes").innerText
  let shortBreakMinutes = document.getElementById("short-break-minutes").innerText
  let longBreakMinutes = document.getElementById("long-break-minutes").innerText
  pomodoroMinutes = Number(pomodoroMinutes) <= 0 ? 25 : pomodoroMinutes
  shortBreakMinutes = Number(shortBreakMinutes) <= 0 ? 5 : shortBreakMinutes
  longBreakMinutes = Number(longBreakMinutes) <= 0 ? 5 : longBreakMinutes

  const fontCircles = document.getElementsByClassName("font-circle")
  let newFont = undefined
  for(let element of fontCircles)
    if([...element.classList].includes("active-font"))
      element.classList.forEach( (className) => {
        if(className === "kumbh-sans")
          newFont = "kumbh-sans"
        else if (className === "roboto-slab")
          newFont = "roboto-slab"
        else if (className === "space-mono")
          newFont = "space-mono"
      })
  
  const colorCircles = document.getElementsByClassName("fa-check")
  let newColor = undefined
  for(let element of colorCircles)
    if(![...element.classList].includes("hidden"))
      element.classList.forEach( (className) => {
        if(element.id === "orange-checked")
          newColor = "orange"
        else if (element.id === "mint-checked")
          newColor = "mint"
        else if (element.id === "purple-checked")
          newColor = "purple"
    })
  

  storage.setItem("font", newFont)
  storage.setItem("color", newColor)
  storage.setItem("pomodoro-minutes", pomodoroMinutes)
  storage.setItem("short-break-minutes", shortBreakMinutes)
  storage.setItem("long-break-minutes", longBreakMinutes)

  switchColor(newColor)
  switchFont(newFont)
  switchMode("pomodoro")
  initializeTime(pomodoroMinutes, 0)
  document.getElementById("modal-container").classList.add("hidden")
})


/*
  Adding event listener for clicking on "pomodoro", "short-break", "long-break"
*/
document.getElementById("pomodoro").addEventListener("click", () => {

  switchMode("pomodoro")
})

document.getElementById("short-break").addEventListener("click", () => {

  switchMode("short-break")
})

document.getElementById("long-break").addEventListener("click", () => {

  switchMode("long-break")
})

/*
  When command is clicked (start, pause and restart), function gets triggered 
  to update neccessary fields
*/
document.getElementById("command-wrapper").addEventListener("click", () => {

  let activeMode = undefined
  for(let mode of document.getElementsByClassName("mode-option"))
    if(![...mode.classList].includes("inactive-option"))
      activeMode = mode.id

  let numberOfSeconds = toSeconds(window.localStorage.getItem(activeMode + "-minutes"), 0)
  updateCommand(false, numberOfSeconds)
})