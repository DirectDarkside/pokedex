function renderChart(currentPokemon) {
    let ctx = document.getElementById('myChart');
    new Chart(ctx, {
        type: 'bar',
        data: {
          labels: pokemonStatsName,
          datasets: [{
            label: `${currentPokemon.name}`,
            data: pokemonStatsNumber,
            borderWidth: 1
          }]
        },
        options: {
            indexAxis: 'y',
        }
      });
}