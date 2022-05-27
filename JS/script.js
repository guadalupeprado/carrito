const Clickbutton = document.querySelectorAll(".button"); /*Aqui vamos a obtener una matriz de todos los botones*/
const tbody = document.querySelector(".tbody");
let cart =[]; /*Aqui vamos a crear una matriz vacia*/

Clickbutton.forEach((btn) => { /*Ciclo que recorre la matriz */
    /*btn es una variable que va a recorrer todos los botones*/
    btn.addEventListener("click", addToCartItem); /*Aqui vamos a agregar un evento de click, indicamos que se ejeuctara la funcion addToCartItem*/
});

function addToCartItem(e) { /*e es un parametro por defecto que se le pasa a la funcion addToCartItem*/
    const button = e.target /*Aqui vamos a obtener el boton que se hizo click*/
    const item = button.closest(".card")/*Aqui vamos a obtener el elemento padre de .card (con la clase closest) del boton 
    (variable button) que se hizo click*/
    /*Guardar en una matriz la info que surgue del boton*/
    const itemTitle = item.querySelector(".card-title").textContent; /*Aqui vamos a obtener el texto del elemento con la clase .card-title de nuestra clase en html*/
    const itemPrice = item.querySelector(".precio").textContent; /*Aqui vamos a obtener el texto del elemento con la clase.Precio de nuestra clase en html*/
    const itemImage = item.querySelector(".card-img-top").src; /*Aqui vamos a obtener la imagen del elemento con la clase .card-img-top de nuestra clase en html*/
    
    console.log(itemTitle);

    const newItem = { /*Aqui vamos a crear un objeto con la info */

        title: itemTitle, /*Aqui vamos a guardar el titulo del objeto || title: (nombre que se le dara el campo), itemTitle (valor del campo)*/ 
        price: itemPrice, /*Aqui vamos a guardar el precio del objeto || price: (nombre que se le dara el campo), itemPrice (valor del campo)*/
        image: itemImage, /*Aqui vamos a guardar la imagen del objeto || image: (nombre que se le dara el campo), itemImage (valor del campo)*/
        count: 1, /*Aqui vamos a guardar el contador del objeto || count: (nombre que se le dara el campo), 1 (valor del campo)*/
    }
    
    addItemCart(newItem); /*Aqui vamos a llamar a la funcion addToCartItem con el objeto newItem*/
}
/*Aqui vamos a agregar el objeto a la matriz de carrito*/
function addItemCart(newItem){/*Aqui vamos a crear la funcion addToCartItem*/
const alert = document.querySelector(".alert"); /*Aqui vamos a obtener el elemento con la clase alert*/
    setTimeout(function(){
        alert.classList.add('hide');
    }, 2000)
    alert.classList.remove('hide');

    const InputElement = tbody.getElementsByClassName("input__element"); /*Aqui vamos a obtener todos los elementos con la clase input__element*/
    for(let i = 0; i < cart.length; i++){ /*Aqui vamos a crear un ciclo que recorra la matriz cart*/
    if(cart[i].title.trim() === newItem.title.trim()){ /*Aqui vamos a crear una condicion que se cumpla si el 
                                                     titulo del objeto es igual al titulo del objeto que se 
                                                     esta agregando, trim() nos ayuda a quitar espacios a los lados*/
        cart[i].count++; /*Aqui vamos a aumentar el contador del objeto*/
        const inputValue = InputElement[i] /*Aqui vamos a obtener el valor del input*/
        inputValue.value++; /*Aqui vamos a aumentar el valor del input*/
        cartTotal(); /*Aqui vamos a llamar a la funcion cartTotal*/
        return null;
    }
}
    /*Mandar la info a la matriz*/
    cart.push(newItem); /*Aqui vamos a agregar el objeto newItem a la matriz carrito*/
    renderCart(); /*Aqui vamos a llamar a la funcion renderCart*/

}

function renderCart(){
    tbody.innerHTML = ""; /*Aqui vamos a limpiar el contenido del tbody*/
    cart.map(item => { /*Aqui vamos a recorrer la matriz cart*/

    const tr = document.createElement("tr"); /*Aqui vamos a crear un elemento tr*/
    tr.classList.add("ItemCart"); /*Aqui vamos a agregar una clase a nuestro elemento tr*/
    /*Aqui vamos a crear una tabla con los datos de la matriz*/
    /*Item es el paramatrr por defecto de la funcion map para recorrer*/
    const content = `
                    <th scope="row">1</th>
                    <td class="table__productos">
                        <img src=${item.image}></img>
                        <h6 class="title">${item.title}</h6>
                    </td>
                    <td class="table__precio"><p> ${item.price}</p></td>
                    <td class="table__cantidad">
                        <input type="number" min="1" value=${item.count} class="input__element">
                        <button class="delete btn btn-danger">x</button>
                    </td> 
                    `
                    tr.innerHTML = content; /*Aqui vamos a agregar el contenido de la tabla a la tabla*/
                    tbody.appendChild(tr); /*Aqui vamos a agregar la tabla al tbody*/
                    tr.querySelector(".delete").addEventListener('click', deleteItemCart); /*Aqui vamos a agregar un evento de click, indicamos que se ejeuctara la funcion deleteItemCart*/
                    tr.querySelector(".input__element").addEventListener('change', sumCart); /*Aqui vamos a agregar un evento de change, indicamos que se ejeuctara la funcion sumCart*/
                    
    });
    cartTotal(); /*Aqui vamos a llamar a la funcion cartTotal*/
}

function cartTotal() { /*Aqui vamos a crear la funcion cartTotals*/
    let total = 0;
    const itemCartTotal = document.querySelector(".itemCartTotal"); /*Aqui vamos a obtener el elemento con la clase .itemCartTotal del html*/
    cart.forEach((item) => { /*Aqui vamos a recorrer la matriz cart*/
        const price = Number(item.price.replace("$", "")); /*Aqui vamos a obtener el precio del objeto item, 
                                                            y lo vamos a convertir a numero, y lo vamos a remplazar con una cadena vacia*/
        total = total + price * item.count; /*Aqui vamos a sumar el precio del objeto item al total*/                                                   
    });

    itemCartTotal.innerHTML = `Total a pagar: ${total}` /*Aqui vamos a agregar el total a la clase .itemCartTotal*/
    addLocalStorage(); /*Aqui vamos a llamar a la funcion addLocalStorage*/

}

deleteItemCart = (e) => { /*Aqui vamos a crear la funcion deleteItemCart*/
    const buttonDelete = e.target; /*Aqui vamos a obtener el elemento que se ejecuta el evento*/
    const tr = buttonDelete.closest(".ItemCart"); /*Aqui vamos a obtener la clase padre de .ItemCart*/
    const title = tr.querySelector(".title").textContent; /*Aqui vamos a obtener el titulo del objeto*/
    for(let i=0; i < cart.length; i++){ /*Aqui vamos a crear un ciclo que recorra la matriz cart*/
        if(cart[i].title.trim() === title.trim()){ /*Aqui vamos a crear una condicion que se cumpla si el
                                                    tr.remove(); /*Aqui vamos a remover el elemento tr*/
            cart.splice(i, 1); /*Aqui vamos a remover el objeto de la matriz*/
        }
    }

    const alert = document.querySelector(".remove"); /*Aqui vamos a obtener el elemento con la clase alert*/
    setTimeout(function(){
        alert.classList.add('remove');
    }, 2000)
    alert.classList.remove('remove');

    tr.remove(); /*Aqui vamos a remover el elemento tr*/
    cartTotal(); /*Aqui vamos a llamar a la funcion cartTotal*/
}

function sumCart(e){ /*Aqui vamos a crear la funcion sumCart*/
    const sumInput = e.target; /*Aqui vamos a obtener el elemento que se ejecuta el evento*/
    const tr = sumInput.closest(".ItemCart"); /*Aqui vamos a obtener la clase padre de .ItemCart*/
    const title = tr.querySelector(".title").textContent; /*Aqui vamos a obtener el titulo del objeto*/

    cart.forEach(item => { /*Aqui vamos a recorrer la matriz cart*/
        if(item.title.trim() === title){ 
                sumInput.value < 1 ? (sumInput.value = 1) : sumInput.value;
                item.count = sumInput.value; /*Aqui vamos a actualizar el valor del objeto*/
                cartTotal(); /*Aqui vamos a llamar a la funcion cartTotal*/

        }
    });
}
    /*Guarda carrito*/
    function addLocalStorage(){
        localStorage.setItem("cart", JSON.stringify(cart)); /*Aqui vamos a guardar la matriz cart en el localStorage*/
    }
    window.onload = function() {
        const storage = JSON.parse(localStorage.getItem("cart")); /*Aqui vamos a obtener el valor del localStorage*/
        if(storage){ /*Aqui vamos a crear una condicion que se cumpla si el storage no esta vacio*/
        cart = storage; /*Aqui vamos a actualizar la matriz cart*/
        renderCart()  /*Aqui vamos a llamar a la funcion renderCart*/
    }
}