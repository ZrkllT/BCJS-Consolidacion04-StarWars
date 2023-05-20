/* generador *
function* generador(){
    yield console.log(1)
}
* generador */
//https://swapi.dev/api/people/$%7Bpeople%7D?format=json
//83 personajes
//range.splig(',').map(Number)

var url = 'https://swapi.dev/api/people/'
//${asdasd}?format=json'

const consultarAPI = (url) =>{
    return new Promise((resolve,reject) =>{
        fetch(url)
            .then(resp => resp.json()).then(data =>{ resolve(data)})
            .catch((error) =>{ reject(error) })
    })
}

function* genLecturaApi(grupo,ini,ter,i){
    if(i <= ter){
        yield consultarAPI(`${url}${i}?format=json`)
                .then(resp => {dibujarCard(grupo,resp)})

    }
}

function obtenerGrupoRango(objSpan){
    var idGrupo = $(objSpan).data('group')
    var [gInicio, gTermino] = $(objSpan).data('range').split(',').map(Number)
    
    for(var i = gInicio; i <= gTermino; i++){
        genLecturaApi(idGrupo,gInicio,gTermino,i).next()
    }
    
}

function dibujarCard(grupo,personaje){
    console.log(personaje)
    var divGrupo = '#idGroup'+grupo
    var peso = personaje.mass === 'unknown' ? 'N/A' : personaje.mass
    $(divGrupo).append(`
        <div id="idCardGroup${grupo}" class="card mb-3" style="max-width: 22rem;">
          <div class="row g-0">
            <div class="col-md-2">
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