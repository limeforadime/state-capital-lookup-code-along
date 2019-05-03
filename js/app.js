// grab DOM elements 
const search = document.querySelector('#search') // search bar
const matchList = document.querySelector('#match-list') // display of results
let statesData;

// Get states
const getStates = async () => {
    const res = await fetch('data/states.json');
    statesData = await res.json();
}

// Filter states.json file
const searchStates = (searchText) => {
    const regex = new RegExp(`^${searchText}`, 'gi');

    // Get matches for current text input
    let matches = statesData.filter(state => {
        return state.name.match(regex) || state.abbr.match(regex);
    })

    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = '';
    }
    outputHtml(matches);
}

// Show results in Html
const outputHtml = (matches) => {
    if (matches.length === 0) matchList.innerHTML = '';
    if (matches.length > 0) {
        const html = matches.map(match => `
            <div class="card card-body mb-1">
                <h4>${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span></h4>
                <small>Lat: ${match.lat} / Long: ${match.long}</small>
            </div>
        `).join('');
        matchList.innerHTML = html;
    }
}

// Do initial get for states data
window.addEventListener('DOMContentLoaded', getStates);
// Fire event every time key typed in input
search.addEventListener('input', () => searchStates(search.value))

