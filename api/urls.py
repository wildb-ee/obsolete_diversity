from django.urls import path
from .views import FightView

urlpatterns = [
    path('', FightView.as_view())
]
