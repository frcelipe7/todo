from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("register", views.register_view, name="register"),
    path("logout", views.logout_view, name="logout"),
    path("todo_list", views.todo_list_view, name="todo_list"),
    path("save_list/save", views.save_list, name="save_list"),
    path("save_list/edit_situation/<int:id>", views.save_list_edit, name="save_list_edit"),
    path("last_id", views.last_id, name="last_id"),
]
