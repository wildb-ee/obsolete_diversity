from django.urls import path

from .views import index

urlpatterns = [
    path('', index),
    path('join',index),
    path('create',index),
    path('fight/<str:fightCode>',index),
    path('register', index),
    path('login', index)
]
