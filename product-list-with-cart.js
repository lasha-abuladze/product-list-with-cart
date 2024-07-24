`use strict`;





const productList = document.querySelector(`.product-list`);
const ordersHTML = document.querySelector(`.orders`);
const emptyCartHTML = document.querySelector(`.empty-cart`);
const totalOrderNumberHTML = document.querySelector(`.total-order-number`)

productList.textContent = ``;
ordersHTML.textContent = ``;



fetch(`./data.json`).then(res => res.json()).then(data => {

    displayProduct(data);
        
    const buttons = Array.from(productList.getElementsByClassName(`buttons`));

    addToCart(buttons,data);


});




const displayProduct = function(data) {

    data.forEach(el => {
        
        const productBox = `
                <figure class="product-container">

                    <div class="product-img">

                        <img src="${el.image.mobile}" alt="${el.name}">

                        <div class="buttons">
                            
                            <button class="btn add-to-cart">
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>
                                <span>Add to Cart</span>
                            </button>

                            <button class="btn add-remove-from-cart display-none">

                                <span class="decrement-increment decrement">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" viewBox="0 0 10 2"><path d="M0 .375h10v1.25H0V.375Z"/></svg>
                                </span>

                                <span class="ordered-product-number">
                                    0
                                </span>

                                <span class="decrement-increment increment">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10"><path d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
                                </span>

                            </button>

                        </div>
                    </div>

                    <figcaption class="about-product">

                        <span class="product-category">
                            ${el.category}
                        </span>

                        <h4 class="product-name">
                            ${el.name}
                        </h4>

                        <strong class="product-price">
                            $${el.price}
                        </strong>

                    </figcaption>

                </figure>
        
        `

        productList.insertAdjacentHTML(`beforeend`, productBox)

        el.order = 0;

    });


}





const addToCart = function(buttons, data) {

    buttons.forEach((el, i) => {

        const addToCartHTML = el.querySelector(`.add-to-cart`);
        const addRemoveFromCartHTML = el.querySelector(`.add-remove-from-cart`);

        const increment = addRemoveFromCartHTML.querySelector(`.increment`)
        const decrement = addRemoveFromCartHTML.querySelector(`.decrement`)
        const orderProductNumberHTML = addRemoveFromCartHTML.querySelector(`.ordered-product-number`)



        addToCartHTML.addEventListener(`click`, () => {


            // const increment = addRemoveFromCartHTML.querySelector(`.increment`)
            // const decrement = addRemoveFromCartHTML.querySelector(`.decrement`)
            // const orderProductNumberHTML = addRemoveFromCartHTML.querySelector(`.ordered-product-number`)



            data[i].order = data[i].order +1;
            orderProductNumberHTML.textContent = `${data[i].order}`

            if(data.some(el => el.order > 0)) {
                emptyCartHTML.classList.add(`display-none`);
                ordersHTML.classList.remove(`display-none`);              

            }

            totalOrderNumberHTML.textContent = `${data.reduce((acc, el) => acc + el.order, 0)}`


            addToCartHTML.classList.add(`display-none`);
            addRemoveFromCartHTML.classList.remove(`display-none`); 
            
            const orderBox = `
                <div class="order-box ${data[i].category}">

                    <div class="order-details">

                        <h6>
                            ${data[i].name}
                        </h6>

                        <span class="single-product-order-number">
                            ${data[i].order}x
                        </span>

                        <span class="single-product-price">
                            @ $${data[i].price}
                        </span>

                        <span class="sinlge-product-total-ptice">
                            $${data[i].price * data[i].order}
                        </span>

                    </div>

                    <button class="remove-product">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
                    </button>

                </div>
            `

            ordersHTML.insertAdjacentHTML(`beforeend`, orderBox);


            
            // increment.addEventListener(`click`, () => {
            //     data[i].order = data[i].order +1;
            //     totalOrderNumberHTML.textContent = `${data.reduce((acc, el) => acc + el.order, 0)}`
            //     orderProductNumberHTML.textContent = `${data[i].order}`



            // })

            // decrement.addEventListener(`click`, () => {

            //     if(data[i].order > 0) {
            //         data[i].order = data[i].order - 1;
            //         totalOrderNumberHTML.textContent = `${data.reduce((acc, el) => acc + el.order, 0)}`
            //         orderProductNumberHTML.textContent = `${data[i].order}`
            //     } else if (data[i].order = 0) {
            //         addToCartHTML.classList.remove(`display-none`);
            //         addRemoveFromCartHTML.classList.add(`display-none`); 
            //     }

            //     // if(data[i].order = 0) {
            //     //     // emptyCartHTML.classList.remove(`display-none`);
            //     //     // ordersHTML.classList.add(`display-none`);

            //     //     console.log(data[i])
            //     // }


            // })

        })



        increment.addEventListener(`click`, () => {
            data[i].order = data[i].order +1;
            totalOrderNumberHTML.textContent = `${data.reduce((acc, el) => acc + el.order, 0)}`
            orderProductNumberHTML.textContent = `${data[i].order}`



        })

        decrement.addEventListener(`click`, () => {

            if(data[i].order >= 1) {
                data[i].order = data[i].order - 1;
                totalOrderNumberHTML.textContent = `${data.reduce((acc, el) => acc + el.order, 0)}`
                orderProductNumberHTML.textContent = `${data[i].order}`
            }


            if(data[i].order < 1) {               
            addToCartHTML.classList.remove(`display-none`);
            addRemoveFromCartHTML.classList.add(`display-none`); 
            }


        })

    })
}




