async function consultar() {

    const resultado = document.getElementById("resultado");
    const gif = document.getElementById("gif");
    const respuesta = document.getElementById("respuesta");
    const excusa = document.getElementById("excusa");

    resultado.classList.remove("hidden");
    respuesta.textContent = "Consultando a la bola...";
    excusa.textContent = "";
    gif.removeAttribute("src");

    try {
        
        const resYesNo = await fetch("https://yesno.wtf/api");
        const dataYesNo = await resYesNo.json();

        gif.src = dataYesNo.image;
        respuesta.textContent = `Respuesta de la bola magica: ${dataYesNo.answer.toUpperCase()}`;

        if (dataYesNo.answer === "no") {
            const resExcusa = await fetch("https://excuser.herokuapp.com/v1/excuse");
            const dataExcusa = await resExcusa.json();

            excusa.textContent = `Excusa sugerida: ${dataExcusa[0].excuse}`;
        }

    } catch (error) {
        respuesta.textContent = "La bola magica no responde :(";
    }
}