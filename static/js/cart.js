let update_btns = document.getElementsByClassName('update-cart');

for (let i = 0; i < update_btns.length; i++) {
    update_btns[i].addEventListener('click', function() {
        let productId = this.dataset.product;
        let action = this.dataset.action;
        console.log('productId:', productId, 'action:', action);
        console.log('USER:', user);
        if(user === 'AnonymousUser'){
            addCokkieItem(productId, action);
        } else{
            updateUserOrder(productId, action);
        }
    });
}

function addCokkieItem(productId, action) {
    console.log('Not logged in');

    if (action === 'add') {
        if (cart[productId] == undefined) {
            cart[productId] = {'quantity':1}
        } else {
            cart[productId]['quantity'] += 1
        }
    }

    if (action == 'remove') {
        cart[productId]['quantity'] -= 1;

        if (cart[productId]['quantity'] <= 0) {
            console.log('Remove Item')
            delete cart[productId];
        }
    }
    console.log('Cart:', cart);
    document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/";
    location.reload();
}


function updateUserOrder(productId, action) {
    console.log('User is logged in, sending data');

    var url = '/update_item/'

    fetch(url, {
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'X-CSRFToken':csrftoken,
        },
        body:JSON.stringify({'productId':productId, 'action':action})
    })

    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log('data:',data);
        location.reload();  
    })
}

// product title ellipsis
titleEllipsis('.cart-product-title');
function titleEllipsis(element) {
    document.querySelectorAll(element).forEach(function (elem) {
        if (parseFloat(window.getComputedStyle(elem).width) === parseFloat(window.getComputedStyle(elem.parentElement).width)) {
          elem.setAttribute('title', elem.textContent);
        }
    });
}