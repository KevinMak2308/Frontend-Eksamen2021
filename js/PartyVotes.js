const out = (...str) => console.log(...str);
const allPartyUrl = 'http://localhost:8080/allParties/'

function fetchAllParties() {
  return fetch(allPartyUrl)
    .then(data => data.json())
    .then(partyListData)
}

const table = document.getElementById('partyCandidatesSectionTable')
const tableBody = document.getElementById('partyCandidateTimeTBody')
table.append(tableBody);

function partyListData(data) {
  for (let i = 0; i < data.length; i++) {

    out(data)

    const party = data[i];
    let rowCount = tableBody.rows.length;
    let row = tableBody.insertRow(rowCount);
    row.id = party.partyId


    let partyTableRow = row.insertCell(0);
    let partyTd = document.createElement('td');
    partyTd.setAttribute('value', party.partyName);
    partyTd.innerText = party.partyName;
    partyTableRow.append(partyTd);


    let partyVotesTableRow = row.insertCell(1);
    let partyVoteTd = document.createElement('td');
    partyVoteTd.setAttribute('value', party.partyVote);
    partyVoteTd.innerText = party.partyVote;
    partyVotesTableRow.append(partyVoteTd);

    let votePercentageTableRow = row.insertCell(2);
    let votePercentageTd = document.createElement('td')
    votePercentageTd.innerText = party.partyVotePercentage + "%";
    votePercentageTd.setAttribute('value', party.partyVotePercentage);

    votePercentageTableRow.append(votePercentageTd);
    out(votePercentageTd)


  }

  var table = $('#partyCandidatesSectionTable').DataTable({
    dom: 'Bfrtip',
    buttons: [
      'copy', 'csv', 'excel', 'pdf', 'print'
    ]
  });

  $('#partyCandidatesSectionTable').on('click', 'tbody tr', function () {
    console.log('API row values : ', table.row(this).data());
  })
}

fetchAllParties();
