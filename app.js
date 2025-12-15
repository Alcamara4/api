async function consultar() {

    const resultado = document.getElementById("resultado");
    const gif = document.getElementById("gif");
    const respuesta = document.getElementById("respuesta");
    const excusa = document.getElementById("excusa");
    const consejo = document.getElementById("consejo");
    const chiste = document.getElementById("chiste");

    resultado.classList.remove("hidden");
    respuesta.textContent = "Consultando a la bola...";
    excusa.textContent = "";
    consejo.textContent = "";
    chiste.textContent = "";
    gif.removeAttribute("src");

    try {

        const audio = new Audio('assets/bolamagica.mp3');
        audio.volume = 0.2;
        audio.play();
        
        const resYesNo = await fetch("https://yesno.wtf/api");
        const dataYesNo = await resYesNo.json();

        const body = document.body;
        if (dataYesNo.answer === "yes") {
            body.style.backgroundColor = "green";
        } else if (dataYesNo.answer === "no") {
            body.style.backgroundColor = "red";
        } else {
            body.style.backgroundColor = "yellow";
        }
    

        gif.src = dataYesNo.image;
        respuesta.textContent = `Respuesta de la bola magica: ${dataYesNo.answer.toUpperCase()}`;

        const resConsejo = await fetch("https://api.adviceslip.com/advice");
        const dataConsejo = await resConsejo.json();
        const dataConsejoText = dataConsejo.slip.advice;
        
        const resTraduccion = await fetch(`https://api.mymemory.translated.net/get?q=${dataConsejoText}&langpair=en|es`);
        const dataTraduccion = await resTraduccion.json();
        const consejoTraducido = dataTraduccion.responseData.translatedText;

        consejo.textContent = `Consejo de la bola: ${consejoTraducido}`;


        if (dataYesNo.answer === "no") {
            const resExcusa = await fetch("https://excuser-three.vercel.app/v1/excuse");
            const dataExcusa = await resExcusa.json();
            const dataExcusaText = dataExcusa[0].excuse;

            const resTraduccionExcusa = await fetch(`https://api.mymemory.translated.net/get?q=${dataExcusaText}&langpair=en|es`);
            const dataTraduccionExcusa = await resTraduccionExcusa.json();
            const excusaTraducida = dataTraduccionExcusa.responseData.translatedText;

            excusa.textContent = `Excusa sugerida: ${excusaTraducida}`;
        } else if (dataYesNo.answer === "yes") {
            const resChiste = await fetch("https://api.chucknorris.io/jokes/random");
            const dataChiste = await resChiste.json();
            const dataChisteText = dataChiste.value;

            const resTraduccionChiste = await fetch(`https://api.mymemory.translated.net/get?q=${dataChisteText}&langpair=en|es`);
            const dataTraduccionChiste = await resTraduccionChiste.json();
            const chisteTraducido = dataTraduccionChiste.responseData.translatedText;

            chiste.textContent = `Chiste de la bola: ${chisteTraducido}`;
        } else {
            excusa.textContent = "";
            chiste.textContent = "";
        }

    } catch (error) {
        respuesta.textContent = "La bola magica no responde :(";
    }
}