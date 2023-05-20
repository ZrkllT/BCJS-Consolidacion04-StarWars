var url = 'https://swapi.dev/api/people/'

const consultarAPI = (url) =>{
    return new Promise((resolve,reject) =>{
        fetch(url)
            .then((personaje) => personaje.json())
            .then((dataPJ) => resolve(dataPJ))
            /*.catch((error) => reject(error))*/
            .catch((error) => console.warn(error))
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
    if(idGrupo == 4){ gen4.next() }
    
}

function dibujarCard(grupo,personaje){
    var color
    if(grupo === 1){ color = 'red' }
    else if(grupo === 2){ color = 'green' }
    else if(grupo === 3){ color = 'blue' }
    else if(grupo === 4){ color = 'yellow' }
    var divGrupo = '#idGroup'+grupo

    var peso = (personaje.mass === 'unknown' || personaje.mass === 'undefined' ) ? 'N/A' : personaje.mass
    var estatura = personaje.height === 'undefined' ? 'N/A' : personaje.height
    var nombre = personaje.detail === "Not found" ? 'Personaje NO encontrado' : personaje.name

    if(personaje.detail === "Not found"){
        $(divGrupo).append(`
            <div id="idCardResultado${grupo}" class="card ms-3 mb-2" style="width: 21rem; height: 6rem;">
              <div class="row g-0">
                <div class="col-2">
                  <img src="./assets/img/${color}-circle.png" class="img-fluid rounded-start">
                </div>
                <div class="col-10">
                  <div class="card-body">
                    <h5 class="card-title">${nombre}</h5>
                  </div>
                </div>
              </div>
            </div>
            `)
    }
    else{
        $(divGrupo).append(`
            <div id="idCardResultado${grupo}" class="card ms-3 mb-2" style="width: 21rem; height: 6rem;">
              <div class="row g-0">
                <div class="col-2">
                  <img src="./assets/img/${color}-circle.png" class="img-fluid rounded-start">
                </div>
                <div class="col-10">
                  <div class="card-body">
                    <h5 class="card-title">${nombre}</h5>
                    <p class="card-text">
                      <span>Estatura: </span>${estatura} <span>cm</span>
                      <span>Peso: </span>${peso} <span>kg</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            `)
        }
    }

/* generedaores */
var gen1 = genLecturaApi(1,1,5)
var gen2 = genLecturaApi(2,6,10)
var gen3 = genLecturaApi(3,11,15)
var gen4 = genLecturaApi(4,16,20)

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
    $('#idSpanGroup4').mouseenter(function(){
        obtenerGrupoRango(this)
    })
})