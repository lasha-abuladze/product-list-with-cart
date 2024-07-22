`use strict`;





const productList = document.querySelector(`.product-list`);


productList.textContent = ``;




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

                                <span class="decrement-increment">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" viewBox="0 0 10 2"><path d="M0 .375h10v1.25H0V.375Z"/></svg>
                                </span>

                                <span class="ordered-product-number">
                                    1
                                </span>

                                <span class="decrement-increment">
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


        addToCartHTML.addEventListener(`click`, () => {
            data[i].order = +1;

            addToCartHTML.classList.add(`display-none`);
            addRemoveFromCartHTML.classList.remove(`display-none`);            
        })
    })
}




