from django.urls import path
from . import views

urlpatterns = [
    path("function", views.hallo_Welt),
    path("class", view = views.HalloVietnam.as_view()),
]