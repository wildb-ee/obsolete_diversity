from django.urls import path
from .views import FightView,CreateFightView

urlpatterns = [
    path('', FightView.as_view()),
    path('create-fight', CreateFightView.as_view())
]
