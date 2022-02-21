/*
TAREA: Empezar preguntando cuánta gente hay en el grupo familiar.
Crear tantos inputs+labels como gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad, la menor edad y el promedio del grupo familiar.

Punto bonus: Crear un botón para "empezar de nuevo" que empiece el proceso nuevamente, borrando los inputs ya creados (investigar cómo en MDN).
*/

const $form = document.querySelector("#calculo-integrantes");
const botonAceptar = $form["boton-aceptar"];
const numeroFamiliares = $form["numero-familiares"];
const $botonCalcular = document.querySelector("#boton-calcular");
const $botonResetear = document.querySelector("#boton-resetear");
const $botonSalarios = document.querySelector("#boton-agregar-salarios");
const $botonCalcularSalarios = document.querySelector("#calcular-salarios");
const $botonQuitarSalarios = document.querySelector("#quitar-salarios");
const $listaEdades = document.querySelectorAll(".familiar");

botonAceptar.onclick = function () {
    resetear();
    errores = validarNumeroFamiliares(numeroFamiliares.value);
    const $erroresAnteriores = document.querySelector("#errores-familiares li");

    if ($erroresAnteriores) {
        $erroresAnteriores.remove();
    }

    if (errores) {
        crearListaErrores(errores);
        $form["numero-familiares"].className = "error";
    }

    if (!errores) {
        $form["numero-familiares"].className = "";
        crearFamiliares();
        mostrarElemento($botonCalcular);
    }
};

$botonCalcular.onclick = function () {
    eliminarErroresEdades();
    const $listaFamiliares = document.querySelectorAll(".familiar");
    listaEdades = crearArray($listaFamiliares);

    numeroErrores = validarEdades(listaEdades);
    if (!numeroErrores) {
        document.querySelector("#mayor-edad").value =
            calcularMayorEdad(listaEdades);
        document.querySelector("#menor-edad").value =
            calcularMenorEdad(listaEdades);
        document.querySelector("#promedio-edad").value =
            calcularPromedioEdad(listaEdades);
        mostrarElemento(document.querySelector("#calculos"));
        mostrarElemento($botonResetear);
        mostrarElemento(document.querySelector("#boton-agregar-salarios"));
    } else {
        crearListaErroresEdades(listaEdades);
        resaltarErroresEdades($listaFamiliares);
        return;
    }
};

$botonResetear.onclick = function () {
    resetear();
};

/*
TAREA:
Crear una interfaz que permita agregar ó quitar (botones agregar y quitar) inputs+labels para completar el salario anual de cada integrante de la familia que trabaje.
Al hacer click en "calcular", mostrar en un elemento pre-existente el mayor salario anual, menor salario anual, salario anual promedio y salario mensual promedio.

Punto bonus: si hay inputs vacíos, ignorarlos en el cálculo (no contarlos como 0).
*/

$botonSalarios.onclick = function () {
    borrarSalariosAnteriores();
    agregarSalarios();
    mostrarElemento(document.querySelector("#calcular-salarios"));
};

$botonCalcularSalarios.onclick = function () {
    ocultarElemento(document.querySelector("#calculos-salarios"));
    ocultarElemento($botonQuitarSalarios);
    eliminarErroresSalarios();

    let $listaSalarios = document.querySelectorAll(".familiar-salario");
    let listaSalarios = crearArray($listaSalarios);
    let numeroErrores = validarSalarios(listaSalarios);

    if (!numeroErrores) {
        mostrarElemento(document.querySelector("#calculos-salarios"));
        document.querySelector("#mayor-salario").value =
            calcularMayorSalario(listaSalarios);
        document.querySelector("#menor-salario").value =
            calcularMenorSalario(listaSalarios);
        document.querySelector("#promedio-salario").value =
            calcularPromedioSalario(listaSalarios);
        mostrarElemento($botonQuitarSalarios);
    } else {
        crearListaErroresSalarios(listaSalarios);
        resaltarErroresSalarios($listaSalarios);
        return;
    }
};

$botonQuitarSalarios.onclick = function () {
    for (i = 0; i < document.querySelectorAll(".familiar-salario").length; i) {
        document.querySelectorAll(".familiar-salario")[i].remove();
        document.querySelectorAll(".label-salario")[i].remove();
    }
    ocultarElemento(document.querySelector("#calcular-salarios"));
    ocultarElemento(document.querySelector("#calculos-salarios"));
    ocultarElemento($botonQuitarSalarios);
    eliminarErroresSalarios();
};

//
//
//
//Funciones
//
//
//

function mostrarElemento(element) {
    element.className = "";
}

function ocultarElemento(element) {
    element.className = "oculto";
}

function resetear() {
    if (document.querySelectorAll(".familiar").length > 0) {
        for (i = 0; i < document.querySelectorAll(".familiar").length; i) {
            document.querySelectorAll(".familiar")[i].remove();
            document.querySelectorAll(".label")[i].remove();
        }
    }
    if (document.querySelectorAll(".familiar-salario").length > 0) {
        for (
            i = 0;
            i < document.querySelectorAll(".familiar-salario").length;
            i
        ) {
            document.querySelectorAll(".familiar-salario")[i].remove();
            document.querySelectorAll(".label-salario")[i].remove();
        }
    }
    ocultarElemento(document.querySelector("#calculos"));
    ocultarElemento($botonResetear);
    ocultarElemento($botonSalarios);
    ocultarElemento($botonCalcular);
    ocultarElemento($botonCalcularSalarios);
    ocultarElemento($botonQuitarSalarios);
    ocultarElemento(document.querySelector("#calculos-salarios"));
    eliminarErroresSalarios();
}

function crearFamiliares() {
    for (i = 0; i < numeroFamiliares.value; i++) {
        const $formulario = document.querySelector("#calculo-integrantes");
        const $division = document.createElement("div");
        const $label = document.createElement("label");
        const $input = document.createElement("input");
        $input.setAttribute("class", "familiar");
        $input.placeholder = "Ingrese la edad";
        $label.textContent = " Familiar " + Number(i + 1);
        $label.className = "label";
        $formulario.appendChild($division);
        $formulario.appendChild($label);
        $formulario.appendChild($input);
    }
}

function calcularMayorEdad(array) {
    let mayorEdad = 0;
    for (i = 0; i < array.length; i++) {
        if (mayorEdad < array[i]) {
            mayorEdad = Number(array[i]);
        }
    }
    return mayorEdad;
}

function calcularMenorEdad(array) {
    let menorEdad = Number(array[0]);
    for (i = 0; i < array.length; i++) {
        if (menorEdad > array[i]) {
            menorEdad = Number(array[i]);
        }
    }
    return menorEdad;
}

function calcularPromedioEdad(array) {
    let totalEdades = 0;
    for (i = 0; i < array.length; i++) {
        totalEdades += Number(array[i]);
    }
    promedioEdad = (totalEdades / array.length).toFixed(2);
    return promedioEdad;
}

function agregarSalarios() {
    borrarSalariosAnteriores();
    $divSalarios = document.querySelector("#salarios");
    for (i = 0; i < numeroFamiliares.value; i++) {
        const $label = document.createElement("label");
        const $input = document.createElement("input");
        const $division = document.createElement("div");
        $input.placeholder = "Ingrese el salario";
        $label.textContent = "Salario familiar " + Number(i + 1);
        $input.className = "familiar-salario";
        $label.className = "label-salario";
        $divSalarios.appendChild($label);
        $divSalarios.appendChild($input);
        $divSalarios.appendChild($division);
    }
}

function calcularMayorSalario(array) {
    let mayorSalario = 0;
    for (i = 0; i < array.length; i++) {
        if (mayorSalario < Number(array[i])) {
            mayorSalario = Number(array[i]);
        }
    }
    return mayorSalario;
}

function calcularMenorSalario(array) {
    let menorSalario = Number(array[0]);
    for (i = 0; i < array.length; i++) {
        if (Number(array[i].value) === 0) {
            continue;
        }
        if (menorSalario > Number(array[i])) {
            menorSalario = Number(array[i]);
        }
    }
    return menorSalario;
}

function calcularPromedioSalario(array) {
    let totalSalarios = 0;
    for (i = 0; i < array.length; i++) {
        if (array[i] === 0) {
            continue;
        }
        totalSalarios += Number(array[i]);
    }
    let promedioSalario = (totalSalarios / array.length).toFixed(2);
    return promedioSalario;
}

function borrarSalariosAnteriores() {
    $divSalarios = document.querySelectorAll("#salarios input");
    for (let i = 0; i < $divSalarios.length; i++) {
        document.querySelector("#salarios input").remove();
        document.querySelector("#salarios label").remove();
    }
}

function crearListaErrores(errores) {
    const $errores = document.querySelector("#errores-familiares");
    let $error = document.createElement("li");
    $error.innerText = errores;
    $errores.appendChild($error);
}

function eliminarErroresEdades() {
    erroresEdades = document.querySelectorAll("#errores-edades li");
    inputsEdades = document.querySelectorAll(".familiar");

    inputsEdades.forEach(function (v, i) {
        inputsEdades[i].classList.remove("error");
    });

    for (let i = 0; i < erroresEdades.length; i++) {
        erroresEdades[i].parentNode.removeChild(erroresEdades[i]);
    }
}

function eliminarErroresSalarios() {
    erroresSalarios = document.querySelectorAll("#errores-salarios li");
    inputsSalarios = document.querySelectorAll(".familiar-salario");

    inputsSalarios.forEach(function (v, i) {
        inputsSalarios[i].classList.remove("error");
    });

    for (let i = 0; i < erroresSalarios.length; i++) {
        erroresSalarios[i].parentNode.removeChild(erroresSalarios[i]);
    }
}

function crearArray(fuente) {
    array = [];
    for (let i = 0; i < fuente.length; i++) {
        array.push(fuente[i].value);
    }
    return array;
}

function crearListaErroresEdades(edades) {
    edades.forEach(function (valor, indice) {
        if (edades[indice] === "0") {
            let li = document.createElement("li");
            li.innerText = "La edad ingresada no puede ser 0";
            document.querySelector("#errores-edades").appendChild(li);
            return;
        }

        if (edades[indice].length > 3) {
            let li = document.createElement("li");
            li.innerText = "La edad ingresada no puede tener mas de 3 dígitos";
            document.querySelector("#errores-edades").appendChild(li);
            return;
        }
        if (!/^[0-9]+$/.test(edades[indice])) {
            let li = document.createElement("li");
            li.innerText = "El campo edad solo puede contener números";
            document.querySelector("#errores-edades").appendChild(li);
            return;
        }
    });
}

function crearListaErroresSalarios(salarios) {
    salarios.forEach(function (valor, indice) {
        if (salarios[indice] === "0") {
            let li = document.createElement("li");
            li.innerText = "El monto ingresado no puede ser 0";
            document.querySelector("#errores-salarios").appendChild(li);
            return;
        }

        if (salarios[indice].length > 10) {
            let li = document.createElement("li");
            li.innerText = "El monto ingresado no puede superar los 10 dígitos";
            document.querySelector("#errores-salarios").appendChild(li);
            return;
        }

        if (!/^[0-9]+$/.test(salarios[indice])) {
            let li = document.createElement("li");
            li.innerText = "El campo de salario solo puede contener números";
            document.querySelector("#errores-salarios").appendChild(li);
            return;
        }
    });
}

function resaltarErroresEdades(edades) {
    for (let i = 0; i < edades.length; i++) {
        if (edades[i].value === "0") {
            edades[i].classList.add("error");
            continue;
        }
        if (edades[i].value.length > 3) {
            edades[i].classList.add("error");
            continue;
        }
        if (!/^[0-9]+$/.test(edades[i].value)) {
            edades[i].classList.add("error");
            continue;
        }
    }
}

function resaltarErroresSalarios(salarios) {
    for (let i = 0; i < salarios.length; i++) {
        if (salarios[i].value === "0") {
            salarios[i].classList.add("error");
            continue;
        }
        if (salarios[i].value.length > 10) {
            salarios[i].classList.add("error");
            continue;
        }
        if (!/^[0-9]+$/.test(salarios[i].value)) {
            salarios[i].classList.add("error");
            continue;
        }
    }
}

//
//
//Validaciones
//
//

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

    arrayEdades.forEach(function (valor, indice) {
        if (arrayEdades[indice] === "0") {
            numeroErrores++;
        }
        if (arrayEdades[indice].length > 3) {
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

    arraySalarios.forEach(function (valor, indice) {
        if (arraySalarios[indice] === "0") {
            numeroErrores++;
            return;
        }

        if (arraySalarios[indice].length > 10) {
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
