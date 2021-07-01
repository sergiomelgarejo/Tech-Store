from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
import json
import datetime

from .models import *

from .utils import cookieCart, cartData, guestOrder

def store(request):
    data = cartData(request)
    cartItems = data['cartItems']

    # slider products
    slider_one = Product.objects.all().filter(id=7)
    slider_two = Product.objects.all().filter(id=11)
    slider_three = Product.objects.all().filter(id=2)
    slider_four = Product.objects.all().filter(id=33)
    # offer products by categorie
    computer_offer_products = Product.objects.all().filter(categorie='COMPUTERS')[:3] # returns the first 3 products.
    smartphones_offer_products = Product.objects.all().filter(categorie='SMARTPHONES')[:3]
    games_offer_products = Product.objects.all().filter(categorie='VIDEOGAMES')[:3]
    # offer large image
    aorus_monitor_offer = Product.objects.all().filter(id=42)
    asus_rog_offer = Product.objects.all().filter(id=43)
    
    context = {
        'slider_one':slider_one,
        'slider_two':slider_two,
        'slider_three':slider_three,
        'slider_four':slider_four,
        'computer_offer_products': computer_offer_products, 
        'smartphones_offer_products': smartphones_offer_products, 
        'games_offer_products': games_offer_products,
        'aorus_monitor_offer': aorus_monitor_offer,
        'asus_rog_offer': asus_rog_offer,
        'cartItems': cartItems
    }
    return render(request, 'store/store.html', context)

def products_list(request):
    products = Product.objects.all() 
    context = {'products': products}
    return render(request, 'store/products_list.html', context)

def cart(request):
    data = cartData(request)
    cartItems = data['cartItems']
    items = data['items'] 
    order = data['order']

    context = {'items':items, 'order':order, 'cartItems': cartItems}
    return render(request, 'store/cart.html', context)

def checkout(request):
    data = cartData(request)
    cartItems = data['cartItems']
    items = data['items'] 
    order = data['order']

    context = {'items':items, 'order':order, 'cartItems': cartItems}
    return render(request, 'store/checkout.html', context)

def updateItem(request):
    data = json.loads(request.body)
    productId = data['productId']
    action = data['action']
    print('Action:', action)
    print('ProductId:', productId)

    customer = request.user.customer
    product = Product.objects.get(id=productId)
    order, created = Order.objects.get_or_create(customer=customer, complete=False)

    orderItem, created = OrderItem.objects.get_or_create(order=order, product=product)

    if action == 'add':
        orderItem.quantity = (orderItem.quantity + 1)
    elif action == 'remove':
        orderItem.quantity = (orderItem.quantity - 1)

    orderItem.save()

    if orderItem.quantity <= 0: 
        orderItem.delete()

    return JsonResponse('Item was added', safe=False)

def processOrder(request):
    transaction_id = datetime.datetime.now().timestamp()
    data = json.loads(request.body)

    if request.user.is_authenticated:
        customer =  request.user.customer
        order, created = Order.objects.get_or_create(customer=customer, complete=False)  

    else:
        customer, order = guestOrder(request, data)

    total = float(data['form']['total'])
    order.transaction_id = transaction_id

    if total == order.get_cart_total:
        order.complete = True   
    order.save()

    if order.shipping == True:
        ShippingAddress.objects.create(
            customer = customer,
            order = order,
            address = data['shipping']['address'],
            city = data['shipping']['city'],
            dpto = data['shipping']['dpto'],
            c_i = data['shipping']['c_i'], 
            phone_number = data['shipping']['phone_number'],
            ruc = data['shipping']['ruc'],
        )
        
    return JsonResponse('Payment complete!', safe=False)

def ProductDetailView(request, id):
    product = get_object_or_404(Product, id=id)
    photos = ProductImage.objects.filter(product=product)

    context = {'product':product, 'photos':photos}

    return render(request, 'store/product_detail.html', context)
