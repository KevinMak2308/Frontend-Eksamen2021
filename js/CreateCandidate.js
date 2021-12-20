const out = (...str) => console.log(...str);
const candidateUrl = 'http://localhost:8080/candidate'
const partyUrl = 'http://localhost:8080/allParties/'

function createCandidate() {
  let candidateName = document.getElementById('inpCandidateName').value;

  let chosenPartyId = localStorage.getItem('chosenPartyId');

  let postCandidateRequest = {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      "candidateName": candidateName,
      "party" : {
        "partyId" : chosenPartyId
      }
    })
  }

  fetch(candidateUrl, postCandidateRequest)
    .then(response => response.json())
    .then(data => candidateCreated(data))
    .catch(error => console.log(error));
}

function candidateCreated(data) {
  out(arguments)
  out(data)
  window.location.href = "../party.html"
}

function fetchAllParties() {
  return fetch(partyUrl)
    .then(data => data.json())
    .then(dropdownListOfParties)
}

function dropdownListOfParties(data) {
  let firstParty = data[0];
  let firstPartyId = firstParty[Object.keys(firstParty)[0]];
  localStorage.setItem('chosenPartyId', firstPartyId);

  out(firstPartyId + " I want to have the first party be the default value in the dropdown")

  for(let i = 0; i < data.length; i++) {

    let party = data[i];

    let dropdown = document.getElementById('selectDropdown');
    let option = document.createElement('option');
    option.innerText = party.partyName;
    option.setAttribute('class', 'select-dropdown__list-item');
    option.setAttribute('value', party.partyId);
    dropdown.appendChild(option);

    dropdown.addEventListener('change', (event) => {
      let selectIndex = dropdown.selectedIndex;
      let optionIndex = dropdown.options[selectIndex];
      party.partyId = optionIndex.value;
      localStorage.setItem('chosenPartyId', optionIndex.value);

      out(optionIndex.value);
    })

  }
}

fetchAllParties()


