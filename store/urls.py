from django.urls import path
from . import views

urlpatterns = [
    path('', views.store, name='store'),
    path('cart/', views.cart, name='cart'),
    path('checkout/', views.checkout, name='checkout'),
    path('products/', views.products_list, name='products_list'),
    path('update_item/', views.updateItem, name='update_item'),
    path('products/<int:id>/', views.ProductDetailView, name='product-detail'),
    path('process_order/', views.processOrder, name='process_order'),
]