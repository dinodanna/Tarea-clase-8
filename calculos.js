function calcularMayorEdad(array) {
    let mayorEdad = 0;
    for (let i = 0; i < array.length; i++) {
        if (mayorEdad < array[i]) {
            mayorEdad = array[i];
        }
    }
    return mayorEdad;
}

function calcularMenorEdad(array) {
    let menorEdad = array[0];
    for (let i = 0; i < array.length; i++) {
        if (menorEdad > array[i]) {
            menorEdad = array[i];
        }
    }
    return menorEdad;
}

function calcularPromedioEdad(array) {
    let totalEdades = 0;
    for (let i = 0; i < array.length; i++) {
        totalEdades += array[i];
    }
    promedioEdad = (totalEdades / array.length).toFixed(2);
    return promedioEdad;
}

function calcularMayorSalario(array) {
    let mayorSalario = 0;
    for (let i = 0; i < array.length; i++) {
        if (mayorSalario < array[i]) {
            mayorSalario = array[i];
        }
    }
    return mayorSalario;
}

function calcularMenorSalario(array) {
    let menorSalario = array[0];
    for (let i = 0; i < array.length; i++) {
        if (menorSalario > array[i]) {
            menorSalario = array[i];
        }
    }
    return menorSalario;
}

function calcularPromedioSalario(array) {
    let totalSalarios = 0;
    for (let i = 0; i < array.length; i++) {
        totalSalarios += array[i];
    }
    let promedioSalario = (totalSalarios / array.length).toFixed(2);
    return promedioSalario;
}
