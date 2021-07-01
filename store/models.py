from django.db import models
from django.contrib.auth.models import User

class Company(models.Model):
    name = models.CharField(max_length=60)
    
    def __str__(self):
        return self.name    

class Customer(models.Model):
    user = models.OneToOneField(User, null=True, blank=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, null=True)
    email = models.CharField(max_length=200)

    def __str__(self): 
        return str(self.user)

class Product(models.Model):
    CATEGORIES_CHOICES = [
        ('SMARTPHONES', 'Smartphones'),
        ('ELECTRONICS', 'Electronics'),
        ('COMPUTERS', 'Computers'),
        ('VIDEOGAMES', 'Videogames'),
    ]

    name =  models.CharField(max_length=100, null=True)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    categorie = models.CharField(
        max_length=12, 
        choices=CATEGORIES_CHOICES,
        default=False,
        null=False, blank=False
    )
    digital = models.BooleanField(default=False, null=True, blank=False)
    image = models.ImageField(null=True, blank=True)
    description = models.TextField(max_length=1000, null=True, blank=False)

    def __str__(self):
        return self.name

    @property
    def imageURL(self):
        try:
            url = self.image.url
        except:
            url = ''
        return url

# in order to display multiple images of a product.
class ProductImage(models.Model):
    product = models.ForeignKey(
        Product, default=None, 
        on_delete=models.CASCADE
    )
    image = models.ImageField(upload_to='images/')

    def __str__(self):
        return self.product.name

class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, blank=True, null=True)
    date_ordered = models.DateTimeField(auto_now_add=True)
    complete = models.BooleanField(default=False, null=True, blank=False)  
    transaction_id =  models.CharField(max_length=100, null=True)

    def __str__(self):
        return str(self.id)

    @property
    def get_cart_total(self):
        orderitems =self.orderitem_set.all()
        total = sum([item.get_total for item in orderitems])
        return total

    @property
    def get_cart_items(self):
        orderitems = self.orderitem_set.all()
        total = sum([item.quantity for item in orderitems])
        return total

    @property
    def shipping(self):
        shipping = False
        orderitems = self.orderitem_set.all()
        for i in orderitems:
            if not i.product.digital:
                shipping = True

        return shipping

class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, blank=True, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, blank=True, null=True)
    quantity = models.IntegerField(default=0, null=True, blank=True)
    date_added = models.DateTimeField(auto_now_add=True)

    @property
    def get_total(self):
        total = self.product.price * self.quantity
        return total

class ShippingAddress(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, blank=True, null=True)
    address = models.CharField(max_length=200, null=False)
    city = models.CharField(max_length=200, null=False)
    dpto = models.CharField(max_length=200, null=False)
    c_i = models.CharField(max_length=20, blank=True)
    phone_number = models.CharField(max_length=20, null=False, default='')
    date_added = models.DateTimeField(auto_now_add=True)
    ruc = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return f'Pedido nro: {self.order} - Ubicación: {self.dpto}, {self.city}.'





