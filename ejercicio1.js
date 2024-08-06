function calcularIMC() {
    let estatura = document.getElementById('estatura').value;
    let peso = document.getElementById('peso').value;
    let resultado = document.getElementById('resultado');

    if (estatura && peso) {
        estatura = estatura / 100;
        let imc = peso / (estatura * estatura);
        resultado.value = imc.toFixed(1);
    } else {
        alert("Por favor, ingrese ambos valores");
    }
}

function crearInterfaz(){
    let container = document.getElementById('container');
    container.innerHTML = `
        <div class="row">
            <h1>APLICACIÓN IMC</h1>
            <div class="col-12 content-input d-flex flex-wrap p-3">
                
                <div class="col-6">
                    <h3>Estatura</h3>
                    <label for="estatura" class="form-label">en centímetros:</label>
                    <input type="number" class="form-control" id="estatura" placeholder="Ingrese su estatura">
                    <h3>Peso</h3>
                    <label for="peso" class="form-label">en kilogramos:</label>
                    <input type="number" class="form-control" id="peso" placeholder="Ingrese su peso">
                    <button class="btn btn-primary mt-3" onclick="calcularIMC()">Calcular</button>
                </div>
                <div class="col-6 result align-self-center d-flex flex-wrap justify-content-center">
                    <div class="col-10 ">
                        <label for="resultado" class="form-label me-2">Resultado:</label>
                        <input type="text" class="form-control" id="resultado" readonly>
                    </div>
                </div>
            </div>
        </div>`;
}

document.addEventListener("DOMContentLoaded", () => {
    crearInterfaz();
});