var url = 'https://swapi.dev/api/people/'
var listGen = []

const consultarAPI = (url) =>{
    return new Promise((resolve,reject) =>{
        fetch(url)
            .then(resp => resp.json()).then(data =>{ resolve(data)})
            .catch((error) =>{ reject(error) })
    })
}

function* genLecturaApi(grupo,ini,ter){
    for(var i = ini; i <= ter; i++){
    yield consultarAPI(`${url}${i}?format=json`)
            .then(resp => {dibujarCard(grupo,resp)})
    }
}

function obtenerGrupoRango(objSpan){
    var idGrupo = $(objSpan).data('group')
    var [gInicio, gTermino] = $(objSpan).data('range').split(',').map(Number)
    
    if(idGrupo == 1){ gen1.next() }
    if(idGrupo == 2){ gen2.next() }
    if(idGrupo == 3){ gen3.next() }
    
}

function dibujarCard(grupo,personaje){
    console.log(personaje)
    var color
    if(grupo === 1){ color = 'red' }
    else if(grupo === 2){ color = 'green' }
    else if(grupo === 3){ color = 'blue' }
    var divGrupo = '#idGroup'+grupo

    var peso = personaje.mass === 'unknown' ? 'N/A' : personaje.mass
    $(divGrupo).append(`
        <div id="idCardResultado${grupo}" class="card mb-2 ms-1" style="max-width: 22rem;">
          <div class="row g-0">
            <div class="col-md-2">
              <img src="./assets/img/${color}-circle.png" class="img-fluid rounded-start">
            </div>
            <div class="col-md-10">
              <div class="card-body">
                <h5 class="card-title">${personaje.name}</h5>
                <p class="card-text">
                  <span>Estatura: </span>${personaje.height} <span>cm</span>
                  <span>Peso: </span>${peso} <span>kg</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        `)
}

/* generedaores */
var gen1 = genLecturaApi(1,1,5)
var gen2 = genLecturaApi(2,6,10)
var gen3 = genLecturaApi(3,11,15)

$(document).ready(function(){
    $('#idSpanGroup1').mouseenter(function(){
        obtenerGrupoRango(this)
    })
    $('#idSpanGroup2').mouseenter(function(){
        obtenerGrupoRango(this)
    })
    $('#idSpanGroup3').mouseenter(function(){
        obtenerGrupoRango(this)
    })
})