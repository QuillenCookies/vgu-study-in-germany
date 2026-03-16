from django.shortcuts import render
from django.http import HttpResponse
from django.views import View

# Create your views here.
def hallo_Welt(request):
    return HttpResponse("Hallo Welt.")

class HalloVietnam(View):
    def get(self, request):
        return HttpResponse("Hello Vietnam")