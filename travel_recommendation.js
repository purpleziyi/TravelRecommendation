 
let recommendations; 

fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data =>{
        console.log(data);
        recommendations = data;
    })
    .catch(error => console.error('Error fetching data:', error));

 
document.getElementById('searchButton').addEventListener('click', function() {
    let searchInput = document.getElementById('searchInput').value.toLowerCase();
    showRecommendations(searchInput);
});

 
function showRecommendations(keyword){
    let results = [];
     
    recommendations.countries.forEach(country => {
        if (country.name.toLowerCase().include(keyword)){
            results.push(country);
        } else {
            country.cities.forEach(city =>{
                if(city.name.toLowerCase().includes(keyword)){
                    results.push(city);
                }
            });
        }
        
    });
    
     
    recommendations.temples.forEach(temple =>{
        if(temple.name.toLowerCase().includes(keyword)){
            results.push(temple);
        }
    })

     
    recommendations.beaches.forEach(beach => {
        if(beach.name.toLowerCase().includes(keyword)){
            results.push(beach);
        }        
    });
    
    displayResults(results);
}

function displayResults(results) {
    let resultsContainer = document.getElementById('searchResults');
    // Clear previous results
    resultsContainer.innerHTML = '';

    if (results.length > 0) {
        results.forEach(result => {
            let resultItem = document.createElement('div');
            resultItem.innerHTML = `
                <img src="${result.imageUrl}" alt="${result.name}">
                <h3>${result.name}</h3>                
                <p>${result.description}</p>
            `;
            resultsContainer.appendChild(resultItem);
        });
    } else {
         
        resultsContainer.textContent = 'No results found.';
    }
}

 
document.getElementById('clearButton').addEventListener('click', function() {
    clearResults();
});

function clearResults(){
    let resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';
}