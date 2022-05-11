from django.contrib import admin

from .models import allModels

# Register your models here.
for model in allModels:
    admin.site.register(model)