document.addEventListener("DOMContentLoaded", () => {
    const resultadosDiv = document.getElementById('resultados');
    const statsDiv = document.getElementById('estadisticas');
    const selectYear = document.getElementById('selectYear'); // Obtener elemento select
    let data = []; // Variable para almacenar todos los datos del JSON
  
    fetch('quake.json')
      .then(response => response.json())
      .then(jsonData => {
        data = jsonData;
  
        // Obtener años únicos válidos del JSON y reemplazar NaN por 'All'
        const uniqueYears = [...new Set(data
          .map(item => new Date(item.Date).getFullYear()) // Obtener el año de cada fecha
          .filter(year => !isNaN(year)) // Filtrar solo años válidos (no NaN)
          .filter(year => year === 2022 || year === 2023) // Filtrar solo años 2022 y 2023
          .map(String) // Convertir años a cadenas
        )].map(year => (year === 'NaN' ? 'All' : year)); // Reemplazar NaN por 'All'
  
        // Agregar opción 'All' al principio del menú desplegable
        uniqueYears.unshift('All');


        // Llenar el select con las opciones de años
        uniqueYears.forEach(year => {
          const option = document.createElement('option');
          option.value = year;
          option.textContent = year;
          selectYear.appendChild(option);
        });
  
        // Lógica para actualizar las estadísticas y tabla basadas en el año seleccionado
        selectYear.addEventListener('change', () => {
          const selectedYear = selectYear.value;
  
        //   // Filtrar datos basados en el año seleccionado o mostrar todos los datos si se selecciona 'All'
        //   const filteredData = selectedYear === 'All' ? data :
        //     data.filter(item => new Date(item.Date).getFullYear().toString() === selectedYear);

             // Filtrar datos basados en el año seleccionado o mostrar todos los datos si se selecciona 'All'
            // const filteredData = selectedYear === 'All' ? data :
            // data.filter(item => {
            //     const itemDate = new Date(item.Date);
            //     return itemDate.getFullYear().toString() === selectedYear;
            // });
// Filtrar datos basados en el año seleccionado o mostrar todos los datos si se selecciona 'All'
const filteredData = selectedYear === 'All' ? data :
data.filter(item => {
    const [day, month, year] = item.Date.split('/');
    return year === selectedYear;
});

// Filtrar los datos de octubre del año seleccionado
const octoberData = filteredData.filter(item => {
const [day, month, year] = item.Date.split('/');
return year === selectedYear && month === '10'; // '10' representa octubre
});


    // // Filtrar los datos de octubre de 2022
    // const october2022Data = filteredData.filter(item => {
    //     const [day, month, year] = item.Date.split('/');
    //     return year === '2022' && month === '10'; // '10' representa octubre
    // });









          // Calcular estadísticas simples (ejemplo: contar el número de partidos)
          const totalPartidos = filteredData.length;
          const partidosCinicGanados = filteredData.filter(item => item.Name === 'Cinic' && item.Win === 1).length;
          const partidosNickMaGanados = filteredData.filter(item => item.Name === 'NickMa' && item.Win === 1).length;
          // Calcular la cantidad total de minutos jugados
          const totalMinutosJugados = filteredData.reduce((total, item) => total + (item.Min || 0), 0).toFixed(1);
          const totalHorasJugadas = (totalMinutosJugados /60).toFixed(1);
            // Convertir los minutos a días y redondear a un decimal
            const totalDiasJugados = (totalMinutosJugados / 1440).toFixed(1);


          // Lógica para determinar el mapa más jugado para el año seleccionado (aquí reemplaza con tu lógica real)
          const mapasJugados = {};
          filteredData.forEach(item => {
            const mapa = item.Map;
            if (mapasJugados[mapa]) {
              mapasJugados[mapa]++;
            } else {
              mapasJugados[mapa] = 1;
            }
          });
  
          let mapaMasJugado = '';
          let maxVecesJugado = 0;
          Object.entries(mapasJugados).forEach(([mapa, vecesJugado]) => {
            if (vecesJugado > maxVecesJugado) {
              maxVecesJugado = vecesJugado;
              mapaMasJugado = mapa;
            }
          });
  
          // Mostrar estadísticas en una cuadrícula
            statsDiv.innerHTML = `
            <h2>Estadísticas ${selectedYear}</h2>
            <div class="stats-grid">
            <div class="stats-item">Total de partidos jugados: ${totalPartidos}</div>
            <div class="stats-item">Partidos ganados por Cinic: ${partidosCinicGanados}</div>
            <div class="stats-item">Partidos ganados por NickMa: ${partidosNickMaGanados}</div>
            <div class="stats-item">Mapa más jugado: ${mapaMasJugado} (${maxVecesJugado} veces)</div>
            <div class="stats-item">Horas jugadas: ${totalHorasJugadas} (${totalDiasJugados} días)</div>
            </div>
            `;

        //   statsDiv.innerHTML = `
        //   <h2>Estadísticas ${selectedYear}</h2>
        //     <p>Total de partidos jugados: ${totalPartidos}</p>
        //     <p>Partidos ganados por Cinic: ${partidosCinicGanados}</p>
        //     <p>Partidos ganados por NickMa: ${partidosNickMaGanados}</p>
        //     <p>Mapa + jugado: ${mapaMasJugado} (${maxVecesJugado} veces)</p>
        //     <p>Horas jugadas: ${totalHorasJugadas} (${totalDiasJugados} días)</p>`;
        
            let tableHTML = '<h2></h2>'; 
            tableHTML += '<table border="1" class="custom-table">'; // Agregar una clase a la tabla
            tableHTML += '<tr>';
            tableHTML += '<th>Date</th>';
            tableHTML += '<th>Nick</th>';
            tableHTML += '<th>W.Score</th>';
            tableHTML += '<th>L.Score</th>';
            tableHTML += '<th>Map</th>';
            tableHTML += '</tr>';
  
          filteredData.forEach(item => {
            tableHTML += '<tr>';
            tableHTML += `<td>${item.Date}</td>`;
            tableHTML += `<td>${item.Name}</td>`;
            tableHTML += `<td>${item.WScore}</td>`;
            tableHTML += `<td>${item.LScore}</td>`;
            tableHTML += `<td>${item.Map}</td>`;
            tableHTML += '</tr>';
          });
  
          tableHTML += '</table>';
  
          // Mostrar la tabla actualizada
          resultadosDiv.innerHTML = tableHTML;
          
        });
  
        // Simulación de la selección inicial de 'All' para mostrar todos los datos al cargar la página
        selectYear.value = 'All';
        selectYear.dispatchEvent(new Event('change'));
  
      })
      .catch(error => {
        console.error('Error al cargar el JSON:', error);
        resultadosDiv.innerHTML = `<p>Error al cargar el JSON: ${error.message}</p>`;
      });
  });
  