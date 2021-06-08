const nonProfitDiv = document.querySelector("#browse-nonprofits")
const detailedInfoName = document.querySelector("#name")
const detailedInfoImg = document.querySelector("#image")
const detailedInfoDesc = document.querySelector("#description")
const detailedInfoDonations = document.querySelector("#donations")

const addDetailedInfo = (obj) => {
  detailedInfoName.innerHTML = obj.name
  detailedInfoImg.src = obj.image
  detailedInfoDesc.innerHTML = obj.description
  detailedInfoDonations.innerHTML = `$${obj.donations}`
}

const addNonprofitsToBar = () => {
  fetch("http://localhost:3000/nonprofits")
    .then(resp => resp.json())
    .then(nonprofits => {
      nonprofits.forEach(obj => {
        const nonprofitsName = document.createElement("span")
        nonprofitsName.innerHTML = obj.name
        nonProfitDiv.append(nonprofitsName)
        nonprofitsName.addEventListener("click", () => {
          return addDetailedInfo(obj)
        })
      })
    })
}

const init = () => {
  addNonprofitsToBar()
}

document.addEventListener("DOMContentLoaded", init)
