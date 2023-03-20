from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import generics,status
from rest_framework.views import  APIView
from rest_framework.response import  Response
from .models import Fight
from .serializers import CreateFightSerializer, FightSerializer



# Create your views here.
class FightView(generics.ListAPIView):
    queryset = Fight.objects.all()
    serializer_class = FightSerializer

class CreateFightView(APIView):
    serializer_class = CreateFightSerializer

    def post(self, request, format= None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data =request.data)

        if serializer.is_valid():
            section = serializer.data.get('section')
            host = self.request.session.session_key
            queryset = Fight.objects.filter(host= host)
            if queryset.exists():
                fight = queryset[0]
                fight.section =section
                fight.save(update_fields=['section'])
            else:
                fight = Fight(host= host, section = section)
                fight.save()

            return Response(FightSerializer(fight).data, status= status.HTTP_202_ACCEPTED)