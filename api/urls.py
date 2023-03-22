from django.urls import path
from .views import FightView,CreateFightView, LoginView, LogoutView, RegisterView, UserView, GetFight

urlpatterns = [
    path('', FightView.as_view()),
    path('create-fight', CreateFightView.as_view()),
    path('login', LoginView.as_view()),
    path('logout', LogoutView.as_view()),
    path('register', RegisterView.as_view()),
    path('view', UserView.as_view()),
    path('get-fight', GetFight.as_view()),
]
