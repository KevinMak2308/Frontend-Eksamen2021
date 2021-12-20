const out = (...str) => console.log(...str);
const candidatesUrl = 'http://localhost:8080/partyCandidates/'
const chosenPartyId = localStorage.getItem('chosenPartyId');


function fetchCandidates() {
  let partyCandidateUrl = candidatesUrl + chosenPartyId;
  return fetch(partyCandidateUrl)
    .then(data => data.json())
    .then(candidateData)
}

const candidateDivWrapper = document.getElementById('candidateDivWrapper');

function candidateData(data) {
  for (let i = 0; 0 < data.length; i++) {

    let candidate = data[i];

    let candidateColDiv = document.createElement('div');
    candidateColDiv.classList.add('col-md-4');
    candidateDivWrapper.append(candidateColDiv);

    let candidateCardDiv = document.createElement('div');
    candidateCardDiv.classList.add('card', 'p-3');
    candidateColDiv.append(candidateCardDiv);

    let candidateRowDiv = document.createElement('div')
    candidateRowDiv.classList.add('d-flex', 'flex-row', 'mb-3')
    candidateCardDiv.append(candidateRowDiv);

    let candidateDiv = document.createElement('div')
    candidateDiv.classList.add('d-flex', 'flex-column', 'ml-2')
    candidateDiv.setAttribute('id', 'projectDiv')
    candidateRowDiv.append(candidateDiv)

    let candidateName = document.createElement('span')
    candidateName.setAttribute('value', candidate.candidateName)
    candidateName.innerText = "Candidate  " + candidate.candidateName

    out(candidateName)

    let partyName = document.createElement('h6')
    partyName.classList.add('text-black-50')
    partyName.setAttribute('value', candidate.party.partyName)
    partyName.innerText = "Party  " + candidate.party.partyName;

    candidateDiv.append(candidateName)
    candidateDiv.append(partyName)

    let candidateLinkDiv = document.createElement('div')
    candidateLinkDiv.classList.add('d-flex', 'justify-content-between', 'install', 'mt-3')

    candidateCardDiv.append(candidateLinkDiv);

    let candidateInput = document.createElement('input')
    candidateInput.type = 'text'
    candidateInput.setAttribute('value', candidateName.innerText);

    candidateName.addEventListener('click', event => {
      candidateInput.value = candidate.candidateName;
      candidateName.replaceWith(candidateInput)
    })

    const updateButton = document.createElement('button')
    updateButton.classList.add('profile-edit-btn', 'btn', 'btn-primary', 'updateButtonProject');
    updateButton.type = 'button'
    updateButton.innerText = 'Save'
    candidateLinkDiv.append(updateButton)

    updateButton.onclick = function () {
      candidate.candidateName = candidateInput.value;
      updateCandidate(candidate)
    }

    const deleteButton = document.createElement('button')
    deleteButton.classList.add('profile-edit-btn', 'btn', 'btn-danger', 'deleteButtonProject');
    deleteButton.type = 'button'
    deleteButton.innerText = 'Delete'
    candidateLinkDiv.append(deleteButton)

    deleteButton.onclick = function () {
      deleteCandidate(candidate)
    }
  }
}

async function updateCandidate(candidate) {
  try {
    const response = await restUpdateCandidate(candidate);
    out(response);
    window.location.reload();
  } catch (error) {
    out(error);
  }

}

async function restUpdateCandidate(candidate) {
  const updateURL = "http://localhost:8080/candidate/" + candidate.candidateId;
  const jsonString = JSON.stringify(candidate);
  out(jsonString);

  const fetchOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: jsonString
  }
  const response = await fetch(updateURL, fetchOptions);
  out(response.status);
  out(response.ok);
  if (!response.ok) {
    out("error");
  }
  return response.json();
}

async function deleteCandidate(candidate) {
  try {
    const response = await restDeleteCandidate(candidate);
    out(response);
    window.location.reload();
  } catch (error) {
    out(error);
  }
}

async function restDeleteCandidate(candidate) {
  const deleteUrl = "http://localhost:8080/candidate/" + candidate.candidateId;
  const fetchOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: ""
  }

  const response = await fetch(deleteUrl, fetchOptions);
  out(response.status)
  out(response.ok)
  window.location.href = "/Tidsregistrering-projekt-Frontend/project.html"
  if (!response.ok) {
    out(response.error())
  }

  return response;
}

fetchCandidates();
