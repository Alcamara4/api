async function consultar() {

    const resultado = document.getElementById("resultado");

    Array.from(resultado.children).forEach(child => resultado.removeChild(child));

    resultado.classList.remove("hidden");

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
    
        const respuestaP = document.createElement("p");
        respuestaP.textContent = `La bola magica dice: ${dataYesNo.answer.toUpperCase()}`;
        respuestaP.classList.add("text-light");
        resultado.appendChild(respuestaP);

        const gifImg = document.createElement("img");
        gifImg.src = dataYesNo.image;
        gifImg.id = "gif";
        resultado.appendChild(gifImg);

        const resConsejo = await fetch("https://api.adviceslip.com/advice");
        const dataConsejo = await resConsejo.json();
        const dataConsejoText = dataConsejo.slip.advice;
        
        const resTraduccion = await fetch(`https://api.mymemory.translated.net/get?q=${dataConsejoText}&langpair=en|es`);
        const dataTraduccion = await resTraduccion.json();
        const consejoTraducido = dataTraduccion.responseData.translatedText;

        const consejoP = document.createElement("p");
        consejoP.textContent = `Consejo: ${consejoTraducido}`;
        consejoP.classList.add("text-success");
        resultado.appendChild(consejoP);


        if (dataYesNo.answer === "no") {
            const resExcusa = await fetch("https://excuser-three.vercel.app/v1/excuse");
            const dataExcusa = await resExcusa.json();
            const dataExcusaText = dataExcusa[0].excuse;

            const resTraduccionExcusa = await fetch(`https://api.mymemory.translated.net/get?q=${dataExcusaText}&langpair=en|es`);
            const dataTraduccionExcusa = await resTraduccionExcusa.json();
            const excusaTraducida = dataTraduccionExcusa.responseData.translatedText;

            const excusaP = document.createElement("p");
            excusaP.textContent = `Excusa: ${excusaTraducida}`;
            excusaP.classList.add("text-warning")
            resultado.appendChild(excusaP);
            
        } else if (dataYesNo.answer === "yes") {
            const resChiste = await fetch("https://api.chucknorris.io/jokes/random");
            const dataChiste = await resChiste.json();
            const dataChisteText = dataChiste.value;

            const resTraduccionChiste = await fetch(`https://api.mymemory.translated.net/get?q=${dataChisteText}&langpair=en|es`);
            const dataTraduccionChiste = await resTraduccionChiste.json();
            const chisteTraducido = dataTraduccionChiste.responseData.translatedText;

            const chisteP = document.createElement("p");
            chisteP.textContent = `Chiste de la bola: ${chisteTraducido}`;
            chisteP.classList.add("text-info")
            resultado.appendChild(chisteP);
        }

    } catch (error) {
        const errorP = document.createElement("p");
        errorP.textContent = "La bola magica no responde :(";
        errorP.id = "respuesta";
        resultado.appendChild(errorP);
    }
}