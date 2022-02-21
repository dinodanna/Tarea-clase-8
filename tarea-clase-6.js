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
    const listaEdades = crearArray($listaFamiliares);

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
    mostrarElemento($botonCalcularSalarios);
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
    const $listaSalarios = document.querySelectorAll(".familiar-salario");
    const $labelsSalarios = document.querySelectorAll(".label-salario");
    for (let i = 0; i < $listaSalarios.length; i++) {
        $listaSalarios[i].remove();
        $labelsSalarios[i].remove();
    }
    ocultarElemento($botonCalcularSalarios);
    ocultarElemento(document.querySelector("#calculos-salarios"));
    ocultarElemento($botonQuitarSalarios);
    eliminarErroresSalarios();
};

function mostrarElemento(element) {
    element.className = "";
}

function ocultarElemento(element) {
    element.className = "oculto";
}

function resetear() {
    const $listaFamiliares = document.querySelectorAll(".familiar");
    const $labelsFamiliares = document.querySelectorAll(".label");
    const $listaSalarios = document.querySelectorAll(".familiar-salario");
    const $labelsSalarios = document.querySelectorAll(".label-salario");

    if ($listaFamiliares.length > 0) {
        for (let i = 0; i < $listaFamiliares.length; i++) {
            $listaFamiliares[i].remove();
            $labelsFamiliares[i].remove();
        }
    }
    if ($listaFamiliares.length > 0) {
        for (let i = 0; i < $listaSalarios.length; i++) {
            $listaSalarios[i].remove();
            $labelsSalarios[i].remove();
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
    for (let i = 0; i < numeroFamiliares.value; i++) {
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

function agregarSalarios() {
    borrarSalariosAnteriores();
    $divSalarios = document.querySelector("#salarios");
    for (let i = 0; i < numeroFamiliares.value; i++) {
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

    inputsEdades.forEach(function (_, i) {
        inputsEdades[i].classList.remove("error");
    });

    for (let i = 0; i < erroresEdades.length; i++) {
        erroresEdades[i].parentNode.removeChild(erroresEdades[i]);
    }
}

function eliminarErroresSalarios() {
    erroresSalarios = document.querySelectorAll("#errores-salarios li");
    inputsSalarios = document.querySelectorAll(".familiar-salario");

    inputsSalarios.forEach(function (_, i) {
        inputsSalarios[i].classList.remove("error");
    });

    for (let i = 0; i < erroresSalarios.length; i++) {
        erroresSalarios[i].parentNode.removeChild(erroresSalarios[i]);
    }
}

function crearArray(lista) {
    const array = [];
    for (let i = 0; i < lista.length; i++) {
        array.push(Number(lista[i].value));
    }
    return array;
}

function crearListaErroresEdades(edades) {
    edades.forEach(function (_, indice) {
        if (edades[indice] === 0) {
            let li = document.createElement("li");
            li.innerText = "La edad ingresada no puede ser 0";
            document.querySelector("#errores-edades").appendChild(li);
            return;
        }

        if (String(edades[indice]).length > 3) {
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
    salarios.forEach(function (_, indice) {
        if (salarios[indice] === 0) {
            let li = document.createElement("li");
            li.innerText = "El monto ingresado no puede ser 0";
            document.querySelector("#errores-salarios").appendChild(li);
            return;
        }

        if (String(salarios[indice]).length > 10) {
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
