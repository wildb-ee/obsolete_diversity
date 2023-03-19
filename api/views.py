from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics

from api.models import Fight
from api.serializers import FightSerializer


# Create your views here.
class FightView(generics.ListAPIView):
    queryset = Fight.objects.all()
    serializer_class = FightSerializer
