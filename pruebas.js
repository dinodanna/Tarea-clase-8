function probarValidarNumeroFamiliares() {
    console.assert(
        validarNumeroFamiliares("0") ===
            "El número de familiares debe ser mayor a 0",
        "validarNumeroFamiliares no pudo comprobar que el número ingresado es mayor a 0"
    );

    console.assert(
        validarNumeroFamiliares("9999") ===
            "El número de familiares no puede exceder los 3 dígitos",
        "validarNumeroFamiliares no pudo comprobar que los números no excedieran los 3 dígitos"
    );

    console.assert(
        validarNumeroFamiliares(5) === "",
        "validarNumeroFamiliares no funcionó con un número válido"
    );
}

function probarValidarEdades() {
    console.assert(
        validarEdades(["40", "30", "50"]) === 0,
        "validarEdades no funcionó con valores válidos"
    );

    console.assert(
        validarEdades(["40", "", "50"]) === "error",
        "validarEdades no comprobó que un valor era inválido"
    );

    console.assert(
        validarEdades(["40", "a", "50"]) === "error",
        "validarEdades no comprobó que un valor era inválido"
    );

    console.assert(
        validarEdades(["40", "9999", "50"]) === "error",
        "validarEdades no comprobó que un valor era inválido"
    );

    console.assert(
        validarEdades(["40", "0", "50"]) === "error",
        "validarEdades no comprobó que un valor era inválido"
    );
}

function probarValidarSalarios() {
    console.assert(
        validarSalarios(["40", "30", "50"]) === 0,
        "validarSalarios no funcionó con valores válidos"
    );

    console.assert(
        validarSalarios(["4000", "", "50000"]) === "error",
        "validarSalarios no comprobó que un valor era inválido"
    );

    console.assert(
        validarSalarios(["4000", "a", "50000"]) === "error",
        "validarSalarios no comprobó que un valor era inválido"
    );

    console.assert(
        validarSalarios(["400", "999999999999", "50000"]) === "error",
        "validarSalarios no comprobó que un valor era inválido"
    );

    console.assert(
        validarSalarios(["40", "0", "50"]) === "error",
        "validarSalarios no comprobó que un valor era inválido"
    );
}

probarValidarNumeroFamiliares();
probarValidarEdades();
probarValidarSalarios();
