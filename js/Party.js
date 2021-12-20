const out = (...str) => console.log(...str);
const currentPartyId = localStorage.getItem('chosenPartyId');

const allPartyUrl = 'http://localhost:8080/allParties/'
const partyUrl = 'http://localhost:8080/party/' + currentPartyId;
const partyCandidatesUrl = 'http://localhost:8080/partyCandidates/' + currentPartyId

function fetchAllParties() {
  return fetch(allPartyUrl)
    .then(data => data.json())
    .then(partyListData)
}

function partyListData(data) {
  let firstParty = data[0];
  let firstPartyId = firstParty[Object.keys(firstParty)[0]];
  localStorage.setItem('chosenPartyId', firstPartyId)

  out(firstPartyId + " Her outter vi vores data")

  for (let i = 0; i < data.length; i++) {

    let party = data[i];

    let dropdown = document.getElementById("selectDropdown");
    let option = document.createElement("option");
    option.innerText = party.partyName;
    option.setAttribute("class", "select-dropdown__list-item");
    option.setAttribute("value", party.partyId);
    dropdown.appendChild(option);

    dropdown.addEventListener("change",(event) => {
      const selectIndex = dropdown.selectedIndex;
      let optionIndex = dropdown.options[selectIndex]
      party.partyId = optionIndex.value
      localStorage.setItem("chosenPartyId", optionIndex.value)

      window.location.reload();

    })


  }

}

function fetchParty() {
  return fetch(partyUrl)
    .then(data => data.json())
    .then(partyData)
}

function partyData(data) {
  let party = data;

  let htmlTitle = document.getElementById('partyHtmlTitle')
  htmlTitle.innerText = party.partyName;

  let partyTitleName = document.getElementById('partyTitleName');
  partyTitleName.setAttribute('value', party.partyName);
  partyTitleName.innerText = party.partyName;


}

function fetchPartyCandidates() {
  return fetch(partyCandidatesUrl)
    .then(data => data.json())
    .then(partyCandidatesDataList)
}

const table = document.getElementById('partyCandidatesSectionTable')
const tableBody = document.getElementById('partyCandidateTimeTBody')
table.append(tableBody);

function partyCandidatesDataList(data) {
  for (let i = 0; i < data.length; i++) {

    const candidate = data[i];
    let rowCount = tableBody.rows.length;
    let row = tableBody.insertRow(rowCount);
    row.id = candidate.partyId



    if(candidate.party.partyId > 0) {
      let partyTableRow = row.insertCell(0);
      let linkToPartyCandidates = document.createElement('a');
      linkToPartyCandidates.setAttribute('value', candidate.party.partyName);
      linkToPartyCandidates.innerText = candidate.party.partyName;
      linkToPartyCandidates.href = 'http://localhost:63342/Frontend-Eksamen2021/candidate.html';
      partyTableRow.append(linkToPartyCandidates);

      linkToPartyCandidates.onclick = function () {
        localStorage.setItem('chosenPartyId', candidate.party.partyId);
      }
    }

    let candidateTableRow = row.insertCell(1);
    let candidateTd = document.createElement('td');
    candidateTd.setAttribute('value', candidate.candidateName);
    candidateTd.innerText = candidate.candidateName;
    candidateTableRow.append(candidateTd);
  }

  var table = $('#partyCandidatesSectionTable').DataTable( {
    dom: 'Bfrtip',
    buttons: [
      'copy', 'csv', 'excel', 'pdf', 'print'
    ]
  } );

  $('#partyCandidatesSectionTable').on('click', 'tbody tr', function() {
    console.log('API row values : ', table.row(this).data());
  })
}

fetchAllParties()
fetchParty();
fetchPartyCandidates();
