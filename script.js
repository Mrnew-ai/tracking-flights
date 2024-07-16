document.addEventListener('DOMContentLoaded', () => {
    fetchFlights();
    fetchBuses();
});

function fetchFlights() {
    const flightApiUrl = 'https://opensky-network.org/api/states/all';
    fetch(flightApiUrl)
        .then(response => response.json())
        .then(data => {
            const flightData = document.getElementById('flight-data');
            data.states.slice(0, 5).forEach(flight => {
                const flightElement = document.createElement('div');
                flightElement.classList.add('flight');
                flightElement.innerHTML = `
                    <h3>Flight: ${flight[1]}</h3>
                    <p>From: ${flight[2]} - To: ${flight[3]}</p>
                    <p>Altitude: ${flight[7]}</p>
                `;
                flightData.appendChild(flightElement);
            });
        })
        .catch(error => console.error('Error fetching flight data:', error));
}

function fetchBuses() {
    const busApiUrl = 'https://transportapi.com/v3/uk/bus/stop/490008660N/live.json?app_id=f6e5f9ad&app_key=4725d2ac8e1d8c0baba9bddfbcfa1677&group=route&limit=5';
    fetch(busApiUrl)
        .then(response => response.json())
        .then(data => {
            const busData = document.getElementById('bus-data');
            data.departures.all.forEach(bus => {
                const busElement = document.createElement('div');
                busElement.classList.add('bus');
                busElement.innerHTML = `
                    <h3>Route: ${bus.line}</h3>
                    <p>From: ${bus.origin_name} - To: ${bus.destination_name}</p>
                    <p>Expected Departure: ${bus.expected_departure_time}</p>
                `;
                busData.appendChild(busElement);
            });
        })
        .catch(error => console.error('Error fetching bus data:', error));
}
