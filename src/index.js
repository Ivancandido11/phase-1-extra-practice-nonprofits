const nonProfitDiv = document.querySelector("#browse-nonprofits")
const detailedInfoName = document.querySelector("#name")
const detailedInfoImg = document.querySelector("#image")
const detailedInfoDesc = document.querySelector("#description")
const detailedInfoDonations = document.querySelector("#donations")
let detailedDonations
const donation = document.querySelector("#donation-form")

const addDetailedInfo = (obj) => {
  detailedInfoName.innerHTML = obj.name
  detailedInfoImg.src = obj.image
  detailedInfoDesc.innerHTML = obj.description
  detailedInfoDonations.innerHTML = `$${obj.donations}`
  detailedInfoDonations.id = obj.id
  detailedDonations = obj.donations
}

const donate = () => {
  donation.addEventListener("submit", (event) => {
    const id = detailedInfoDonations.id
    event.preventDefault()
    const donationValue = donation.querySelector("#donations").value
    detailedDonations = parseInt(detailedDonations) + parseInt(donationValue)
    console.log(detailedDonations)
    const donationData = {
      donations: parseInt(detailedDonations)
    }
    const configObject = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(donationData)
    }
    fetch(`http://localhost:3000/nonprofits/${id}`, configObject)
      .then(resp => resp.json())
      .then(nonprofit => {
        console.log(nonprofit)
        detailedInfoDonations.innerHTML = `$${nonprofit.donations}`
      })
  })
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
          fetch(`http://localhost:3000/nonprofits/${obj.id}`)
            .then(rep => rep.json())
            .then(object => addDetailedInfo(object))
        })
      })
    })
}

const init = () => {
  addNonprofitsToBar()
  donate()
}

document.addEventListener("DOMContentLoaded", init)
