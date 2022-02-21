function validarNumeroFamiliares(numero) {
    if (Number(numero) <= 0) {
        return "El número de familiares debe ser mayor a 0";
    }

    if (numero.length > 3) {
        return "El número de familiares no puede exceder los 3 dígitos";
    } else {
        return "";
    }
}

function validarEdades(arrayEdades) {
    let numeroErrores = 0;

    arrayEdades.forEach(function (_, indice) {
        if (arrayEdades[indice] === 0) {
            numeroErrores++;
        }
        if (String(arrayEdades[indice]).length > 3) {
            numeroErrores++;
        }
        if (!/^[0-9]+$/.test(arrayEdades[indice])) {
            numeroErrores++;
        }
    });
    if (numeroErrores === 0) {
        return numeroErrores;
    } else {
        return "error";
    }
}

function validarSalarios(arraySalarios) {
    let numeroErrores = 0;

    arraySalarios.forEach(function (_, indice) {
        if (arraySalarios[indice] === 0) {
            numeroErrores++;
            return;
        }

        if (String(arraySalarios[indice]).length > 10) {
            numeroErrores++;
            return;
        }

        if (!/^[0-9]+$/.test(arraySalarios[indice])) {
            numeroErrores++;
            return;
        }
    });
    if (numeroErrores === 0) {
        return numeroErrores;
    } else {
        return "error";
    }
}
