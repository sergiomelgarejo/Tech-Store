from django import forms
from django.forms import ModelForm
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

class RegistrationForm(UserCreationForm):

    class Meta:
        model = User
        fields = [
            'username',
            'first_name',
            'last_name',
            'email',
            'password1',
            'password2'
        ]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'].widget.attrs.update({'class': 'form__input', 'placeholder': 'JohnCarpenter'})
        self.fields['first_name'].widget.attrs.update({'class': 'form__input', 'placeholder': 'John'})
        self.fields['last_name'].widget.attrs.update({'class': 'form__input', 'placeholder': 'Carpenter'})
        self.fields['email'].widget.attrs.update({'class': 'form__input', 'placeholder': 'johncarpenter@gmail.com'})
        self.fields['password1'].widget.attrs.update({'class': 'form__input', 'placeholder': '********'})
        self.fields['password2'].widget.attrs.update({'class': 'form__input', 'placeholder': '********'})


        



