const Clickbutton = document.querySelectorAll(".button"); /*Aqui vamos a obtener una matriz de todos los botones*/

Clickbutton.forEach((btn) => { /*Ciclo que recorre la matriz */
    /*btn es una variable que va a recorrer todos los botones*/
    btn.addEventListener("click", addToCartItem); /*Aqui vamos a agregar un evento de click, indicamos que se ejeuctara la funcion addToCartItem*/
});

function addToCartItem(e) { /*e es un parametro por defecto que se le pasa a la funcion addToCartItem*/
    const button = e.target; /*Aqui vamos a obtener el boton que se hizo click*/
    const item = button.closest(".card"); /*Aqui vamos a obtener el elemento padre de .card (con la clase closest) del boton variable button que se hizo click*/
    /*Guardar en una matriz la info del boton*/
    const itemtitle = item.querySelector(".card-title").textContent; /*Aqui vamos a obtener el texto del elemento .card-title de nuestra clase en html*/
    console.log(itemtitle);
}
