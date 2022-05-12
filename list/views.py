from os import listdir
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse, request
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
from django.db import IntegrityError
import json
from datetime import datetime, timedelta

from .models import *

# Create your views here.
def index(request):
    return render(request, 'list/homepage.html')


def login_view(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("todo_list"))
        else:
            return render(request, "list/login.html", {
                "message": "Usuário e/ou senha inválidos."
            })

    return render(request, 'list/login.html')


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register_view(request):
    if request.method == "POST":
        complete_name = request.POST['nome_completo']
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "list/register.html", {
                "message": "As senhas devem ser iguais."
            })
        try:
            user = User.objects.create_user(username, email, password)
            user.complete_name = complete_name
            user.save()
        except IntegrityError:
            return render(request, "list/register.html", {
                "message": "Este username ou/e email já cadastrado."
            })
        login(request, user)
        return render(request, "list/welcome_redirect.html")

    return render(request, "list/register.html")


def todo_list_view(request):
    all_todo_user = List.objects.filter(user=request.user.id, situation="To Do")
    all_doing_user = List.objects.filter(user=request.user.id, situation="Doing")
    all_done_user = List.objects.filter(user=request.user.id, situation="Done")

    for done in all_done_user:
        timestamp = datetime.strptime(done.timestamp, "%d/%m/%Y %H:%M")
        expirationDay = timestamp + timedelta(days=1)
        if datetime.now() > expirationDay:
            print('é maior')
            List.objects.get(id=done.id).delete()

    return render(request, "list/list.html", {
        'all_todo_user': all_todo_user,
        'all_doing_user': all_doing_user,
        'all_done_user': all_done_user,
    })


def save_list(request):
    if request.method == "POST":
        data = json.loads(request.body)
        user_id = data.get("user_id", "")
        user = User.objects.get(id=user_id)
        todo = data.get('todo', "")
        timestamp = datetime.now().strftime('%d/%m/%Y %H:%M')
        ListAdd = List(
            user = user,
            todo = todo,
            situation = "To Do",
            timestamp = timestamp
        )
        ListAdd.save()
    return HttpResponseRedirect(reverse("todo_list"))


def save_list_edit(request, id):
    if request.method == "PUT":
        data = json.loads(request.body)
        situation = data.get("situation", "")
        print(data)
        print(situation)
        list_change_situation = List.objects.get(id=id)
        print(list_change_situation)
        list_change_situation.situation = situation
        if situation == "Done":
            list_change_situation.timestamp = datetime.now().strftime('%d/%m/%Y %H:%M')
        list_change_situation.save()

    return HttpResponseRedirect(reverse("todo_list"))


def last_id(request):
    all_todo_list = List.objects.all()
    maior_id = 0
    for todo_list in all_todo_list:
        if todo_list.id >= maior_id:
            maior_id = todo_list.id + 1
    return JsonResponse({'id': maior_id}, safe=False)