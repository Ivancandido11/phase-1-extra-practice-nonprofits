const nonProfitDiv = document.querySelector("#browse-nonprofits")

const addNonprofitsToBar = () => {
  fetch("http://localhost:3000/nonprofits")
    .then(resp => resp.json())
    .then(nonprofits => {
      nonprofits.forEach(obj => {
        const nonprofitsName = document.createElement("span")
        nonprofitsName.innerHTML = obj.name
        nonProfitDiv.append(nonprofitsName)
      })
    })
}

const init = () => {
  addNonprofitsToBar()
}

document.addEventListener("DOMContentLoaded", init)
