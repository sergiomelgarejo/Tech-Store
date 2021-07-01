from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from .forms import RegistrationForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages

def registerPage(request):
    form = RegistrationForm()

    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            user = form.cleaned_data.get('username')
            messages.success(request, 'Cuenta creada para ' + user + '. Ya podes logearte.')
            return redirect('login')
        else:
            messages.error(request, 'Maestro, rellená el formulario correctamente.')

    context = {'form':form}
    return render(request, 'users/register.html', context)

def loginPage(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password1')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('store')
        else:
            messages.error(request, 'Username or password is incorrect')

    context = {}
    return render(request, 'users/login.html', context)

def logoutUser(request):
    logout(request)
    return redirect('store')

@login_required
def UserAccount(request):

    context = {}
    return render(request, 'users/account.html', context)
