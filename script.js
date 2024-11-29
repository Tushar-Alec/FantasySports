let availableFootballPlayers = ["M.ter Stegan", "G.Pique", "C.Puyol", "J.Alba", "Ivan Rakitic", "Iniesta", "Xavi", "Busquets", "Leo Messi", "L.Suarez", "Neymar"];
let availableCricketPlayers = ["Virat Kohli", "Rohit Sharma", "Jasprit Bumrah", "Ravindra Jadeja", "KL Rahul", "Hardik Pandya", "Shubman Gill", "Mohammad Shami", "Kagiso Rabada", "AB de Villiers", "David Warner"];
let selectedSport = "";
let fantasyTeam = new Array(11).fill(null);

function selectSport(sport) {
    selectedSport = sport;
    document.getElementById('sport-selection').style.display = 'none';
    document.getElementById('team-builder').style.display = 'block';
    document.getElementById('sport-title').innerText = sport === 'football' ? 'Fantasy Football' : 'Fantasy Cricket';
    displayAvailablePlayers();
    updateField();
}

function displayAvailablePlayers() {
    let players = selectedSport === 'football' ? availableFootballPlayers : availableCricketPlayers;
    let playerList = players.map(player => `<li>${player}</li>`).join('');
    document.getElementById('available-players').innerHTML = `<h3>Available Players</h3><ul>${playerList}</ul>`;
}

function addPlayer() {
    let playerName = prompt('Enter the name of the player to add:');
    let players = selectedSport === 'football' ? availableFootballPlayers : availableCricketPlayers;
    if (players.includes(playerName) && !fantasyTeam.includes(playerName)) {
        let position = parseInt(prompt('Enter the position (1-11):')) - 1;
        if (position >= 0 && position < 11 && fantasyTeam[position] === null) {
            fantasyTeam[position] = playerName;
            updateField();
            alert(`${playerName} added to your team.`);
        } else {
            alert('Invalid position or position already filled.');
        }
    } else {
        alert('Player not found or already in your team.');
    }
}

function removePlayer() {
    let position = parseInt(prompt('Enter the position (1-11) to remove the player from:')) - 1;
    if (position >= 0 && position < 11 && fantasyTeam[position] !== null) {
        let removedPlayer = fantasyTeam[position];
        fantasyTeam[position] = null;
        updateField();
        alert(`${removedPlayer} removed from your team.`);
    } else {
        alert('Invalid position or no player in that position.');
    }
}

function updateField() {
    let field = document.getElementById('field');
    field.innerHTML = '';
    fantasyTeam.forEach((player, index) => {
        let positionDiv = document.createElement('div');
        positionDiv.classList.add('position');
        positionDiv.innerText = player ? player : `Position ${index + 1}`;
        field.appendChild(positionDiv);
    });
}
