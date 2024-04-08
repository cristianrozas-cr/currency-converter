
// Referencias de HTML
const inputMonto = document.querySelector('.entrada-monto'); //Input de entrada para el monto
const select = document.querySelector('.select-moneda'); //Select para los diferentes tipos de moneda
const button = document.querySelector('.btn-convertir'); //Botón para hacer la conversión
const valor = document.querySelector('.valor') //innerHTML para mostrar el resultado de la operación
const grafico = document.querySelector('.grafico'); //Gráfico Chart JS
const resultado = document.querySelector('.resultado');

//Podemos usar una variable para guardar una url
const url = "https://mindicador.cl/api";

let myChart = null; 

// Función fetch
async function cotizar(){
    try{
    const cantidad = inputMonto.value;
    const tipoMoneda = select.value;
    const res = await fetch(`${url}/${tipoMoneda}`);
    const data = await res.json();
    return data;
    } catch (error){
        alert(error.message);
    }
}

//Agregar eventListener al boton de convertir y añadirle la función cotizar
button.addEventListener("click", async () =>{
    resultado.innerHTML = "Cargando..."
    const resultCotizacion = await cotizar()
    const serie = resultCotizacion.serie;
    const data = serie.slice(0, 10).reverse()
    const ultimoValor = serie[0].valor
    const cantidad = inputMonto.value
    const calculo = (cantidad/ultimoValor).toFixed(2)
    valor.innerHTML = `Cotización del día es: $${ultimoValor}`;
    resultado.innerHTML = calculo;
    renderGrafico(data)
})

function acortarFecha(date){
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDay()
    return `${day}/${month}/${year}`
}


function renderGrafico(data) {
    console.log(data)
    const config = {
        type: "line",
        data: {
            labels: data.map((elemento) => acortarFecha(new Date (elemento.fecha))),
            datasets: [{
            label: "Últimos 10 días",
            backgroundColor: "blue",
            data: data.map((elemento) => elemento.valor),
        }] 
    }
    }
    grafico.style.backgroundColor = "white";
    if(myChart){
        myChart.destroy();
    }
    myChart = new Chart(grafico, config);
}



