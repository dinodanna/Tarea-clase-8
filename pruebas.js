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
