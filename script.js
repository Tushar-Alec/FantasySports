let availableFootballPlayers = [
    "M.ter Stegan", "G.Pique", "C.Puyol", "J.Alba", "Ivan Rakitic", "Iniesta", 
    "Xavi", "Busquets", "Leo Messi", "L.Suarez", "Neymar",
    "Cristiano Ronaldo", "Zlatan Ibrahimovic", "Kylian Mbappé", "Mohamed Salah", 
    "Robert Lewandowski", "Sergio Ramos", "Karim Benzema", "Kevin De Bruyne", 
    "Erling Haaland", "Luka Modrić", "Virgil van Dijk", "Alisson Becker", 
    "Paul Pogba", "N'Golo Kanté", "Marcus Rashford", "Phil Foden", "Harry Kane", 
    "Raheem Sterling", "Gareth Bale", "Sadio Mané", "Frenkie de Jong", 
    "Jack Grealish", "Jadon Sancho", "Pierre-Emerick Aubameyang", "Gerard Piqué", 
    "Thiago Silva", "Toni Kroos", "Ederson Moraes", "Luis Díaz", "Gerard Moreno"
];
let availableCricketPlayers = [
    "Virat Kohli", "Rohit Sharma", "Jasprit Bumrah", "Ravindra Jadeja", 
    "KL Rahul", "Hardik Pandya", "Shubman Gill", "Mohammad Shami", 
    "Kagiso Rabada", "AB de Villiers", "David Warner",
    "Steve Smith", "Ben Stokes", "Joe Root", "Marnus Labuschagne", 
    "Pat Cummins", "Mitchell Starc", "David Warner", "Trent Boult", 
    "Jimmy Anderson", "Rashid Khan", "Shakib Al Hasan", "Babar Azam", 
    "Shaheen Shah Afridi", "Fakhar Zaman", "Mohammad Rizwan", 
    "Jofra Archer", "Chris Woakes", "Dinesh Karthik", "Suresh Raina", 
    "KL Rahul", "Rishabh Pant", "KL Rahul", "Shreyas Iyer", "Kane Williamson",
    "Ross Taylor", "Mark Wood", "Jonny Bairstow", "Quinton de Kock",
    "Lungi Ngidi", "Kieron Pollard", "Eoin Morgan", "Sunil Narine"
];

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

   
    let playerNameLower = playerName.toLowerCase();
    let foundPlayer = players.find(player => player.toLowerCase() === playerNameLower);

    if (foundPlayer && !fantasyTeam.includes(foundPlayer)) {
        let position = parseInt(prompt('Enter the position (1-11):')) - 1;
        if (position >= 0 && position < 11 && fantasyTeam[position] === null) {
            fantasyTeam[position] = foundPlayer; // Use the exact matched player name
            updateField();
            alert(`${foundPlayer} added to your team.`);
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
    
    const formationMapping = [
        { row: 1, col: 3 }, // Goalkeeper
        { row: 2, col: 1 }, { row: 2, col: 2 }, { row: 2, col: 4 }, { row: 2, col: 5 }, // Defenders
        { row: 3, col: 2 }, { row: 3, col: 3 }, { row: 3, col: 4 }, // Midfielders
        { row: 4, col: 1 }, { row: 4, col: 3 }, { row: 4, col: 5 }  // Forwards
    ];

    let field = document.getElementById('field');
    field.innerHTML = ''; 

    
    fantasyTeam.forEach((player, index) => {
        let positionDiv = document.createElement('div');
        positionDiv.classList.add('position');

        if (player) {
            positionDiv.classList.add('filled');
            positionDiv.innerText = player; 
        } else {
            positionDiv.innerText = `Position ${index + 1}`; 
        }

        
        const position = formationMapping[index];
        if (position) {
            positionDiv.style.gridRow = position.row;
            positionDiv.style.gridColumn = position.col;
        }

        field.appendChild(positionDiv);
    });
}
