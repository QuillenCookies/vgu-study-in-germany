
# Environment setting for Python Django Backend Server

## Installing environment

- Install and activate venv:
```shell
cd backend
python -m venv venv
./venv/Scripts/Activate.ps1
```

- Install dependencies
```shell
pip install requirements.txt
```

## Installing Django

- Init project with the `backend` name.
```shell
django-admin startproject backend
cd backend
python manage.py startapp devserver
```
- To make a blueprint of changes and apply them:
```shell
python manage.py makemigrations
python manage.py migrate
```

# Django

## Views:

- Go into `./devserver/views.py` and hover over the yellow underline of `from django.shortcuts import ...` to choose another interpreter.
- Do stuff there.

## Models:

- Go into `./devserver/models.py` to make database models.
- Example:
```shell
class MenuItem(Model):
    name = CharField(max_length = 255)
    price = IntegerField()
```

# 