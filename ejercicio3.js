let arrayNotas = [
    {
        id: 1, 
        titulo:'Sacar la basura', 
        texto: 'mi mama me va a retar si no lo hago', 
        realizada: false
    },
    {
        id: 2, 
        titulo:'Ir a mercar', 
        texto: 'ya no tengo mercado, me urge ir al supermercado', 
        realizada: false
    }
]

let idGlobal = 2;

function crearInterfaz(){
    let container = document.getElementById('container')
    container.innerHTML = `
        <div class="row">
            <h1>APLICACIÓN DE NOTAS</h1>
            <div class="content-nuevaNota m-2 p-3 d-flex flex-wrap" >
                <div class="col-8">
                    <h2>Nueva Nota</h2>
                    <input class="form-control m-2 col-4" id="titulo" placeholder="Titulo">
                    <textarea class="form-control m-2 col-4" id="texto" rows="3" placeholder="Escriba su nota aqui!"></textarea>
                </div>
                <div class="col-4 align-self-center d-flex flex-wrap justify-content-center">
                    <button onclick="guardarNota()" type="button" class="btn btn-success col-6 m-2">Guardar</button>
                    <button onclick="limpiarCampos()" type="button" class="btn btn-danger col-6 m-2">Limpiar</button>
                    <form class="col-6" role="search">
                        <input id="filtro-texto" class="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" oninput="aplicarFiltros()">
                    </form>
                    <div class="form-check form-switch form-check-reverse col-4">
                        <label class="form-check-label" for="filtro-realizada">Realizadas </label>
                        <input id="filtro-realizada" class="form-check-input" onchange="aplicarFiltros()" type="checkbox">
                    </div>
                </div>
            </div>
            <div id="contenedor-notas" class="row"></div>
        </div>`
}

function pintarNota(notasFiltradas = arrayNotas){
    let container = document.getElementById('contenedor-notas')
    container.innerHTML = ""

    if(notasFiltradas.length === 0){
        container.innerHTML = `<div class="col-12"><p>No hay notas</p></div>`
        return;
    }

    notasFiltradas.forEach(nota => {
        const elementoNota = document.createElement('div')
        elementoNota.className = 'col-md-4 mb-3'
        elementoNota.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title ${nota.realizada ? 'tachado' : ''}" id="titulo-${nota.id}">${nota.titulo}</h5>
                    <p class="card-text ${nota.realizada ? 'tachado' : ''}" id="texto-${nota.id}">${nota.texto}</p>
                    <div class="form-check mb-2">
                        <input type="checkbox" class="form-check-input" ${nota.realizada ? 'checked' : ''} onchange="marcarRealizada(${nota.id})"></input>
                        <label class="form-check-label">Realizada</label>
                    </div>
                    <button onclick="borrarNota(${nota.id})" class="btn btn-danger btn-sm">Borrar nota</button>
                </div>
            </div>`
        container.appendChild(elementoNota)
    })
}

function agregarNotas(titulo, texto){
    idGlobal++
    let nuevaNota = {id: idGlobal, titulo, texto, realizada: false}
    arrayNotas.push(nuevaNota)
}

function guardarNota(){
    let titulo = document.getElementById("titulo").value
    let texto = document.getElementById("texto").value

    if(titulo.trim() !== "" && texto.trim() !== "") {
        agregarNotas(titulo, texto)
        aplicarFiltros()
        limpiarCampos()
    }else{
        alert("Llenar todos los campos para guardar la nota")
    }
}

function borrarNota(id){
    arrayNotas = arrayNotas.filter(nota => nota.id !== id)
    aplicarFiltros()
}

function limpiarCampos(){
    document.getElementById("titulo").value = ""
    document.getElementById("texto").value = ""
}

function marcarRealizada(id){
    let nota = arrayNotas.find(nota => nota.id === id)
    if (nota) {
        nota.realizada = !nota.realizada
        let tituloElemento = document.getElementById(`titulo-${id}`)
        let textoElemento = document.getElementById(`texto-${id}`)
        
        if (nota.realizada) {
            tituloElemento.classList.add('tachado')
            textoElemento.classList.add('tachado')
        } else {
            tituloElemento.classList.remove('tachado')
            textoElemento.classList.remove('tachado')
        }
        aplicarFiltros()
    }
}

function filtrarPorRealizada(array) {
    return array.filter(nota => nota.realizada)
}

function filtrarPorTexto(array, texto) {
    if (!texto) 
        return array;
    return array.filter(nota => 
        nota.titulo.toLowerCase().includes(texto.toLowerCase()) || 
        nota.texto.toLowerCase().includes(texto.toLowerCase())
    );
}

function aplicarFiltros() {
    const textoFiltro = document.getElementById("filtro-texto").value
    const soloRealizadas = document.getElementById("filtro-realizada").checked
    let notasFiltradas =  arrayNotas

    if (soloRealizadas) {
        notasFiltradas = filtrarPorRealizada(notasFiltradas)
    }
    notasFiltradas = filtrarPorTexto(notasFiltradas, textoFiltro)
    pintarNota(notasFiltradas)
}

document.addEventListener("DOMContentLoaded", () => {
    crearInterfaz()
    aplicarFiltros()
})