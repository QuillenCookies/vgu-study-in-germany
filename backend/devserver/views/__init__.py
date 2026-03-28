from .base import *
from .train import *

def health_check(request):
    data = {"status": "success", "mesage": "Health check good"}
    return JsonResponse(data)