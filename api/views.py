from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import generics,status,views
from rest_framework.views import  APIView
from rest_framework.response import  Response
from rest_framework.authentication import SessionAuthentication
from api.validations import custom_validation
from .models import Fight
from .serializers import CreateFightSerializer, FightSerializer, UserRegisterSerializer, UserSerializer
from rest_framework import permissions
from django.contrib.auth import login,logout

from . import serializers



# Create your views here.
class FightView(generics.ListAPIView):
    queryset = Fight.objects.all()
    serializer_class = FightSerializer


class GetFight(APIView):
      serializer_class = FightSerializer
      lookup_url_kwarg = 'code'

      def get(self, request, format=None):
            code = request.GET.get(self.lookup_url_kwarg)
            if code != None:
                fight = Fight.objects.filter(code=code)
                if len(fight) > 0:
                    data = FightSerializer(fight[0]).data
                    data['is_host'] = self.request.session.session_key == fight[0].host
                    return Response(data, status=status.HTTP_200_OK)
                return Response({'Fight Not Found': 'Invalid Fight Code'}, status=status.HTTP_404_NOT_FOUND)
            return Response({'Bad Request': 'Code parameter not found in request'}, status=status.HTTP_400_BAD_REQUEST)

class CreateFightView(APIView):
    serializer_class = CreateFightSerializer

    def post(self, request, format= None):
        # if not self.request.session.exists(self.request.session.session_key):
        #     self.request.session.create()

        serializer = self.serializer_class(data =request.data)

        if serializer.is_valid():
            section = serializer.data.get('section')
            IsRanked = serializer.data.get('guest_chose_ranked')
            host =  request.user.username # self.request.session.session_key
            
            queryset = Fight.objects.filter(host= host)
            if queryset.exists():
                fight = queryset[0]
                fight.section =section
                fight.save(update_fields=['section', 'IsRanked'])
            else:
                fight = Fight(host= host, section = section, IsRanked = IsRanked)
                fight.save()

            return Response(FightSerializer(fight).data, status= status.HTTP_202_ACCEPTED)
        


#COPIED DKB
class LoginView(views.APIView):
    # This view should be accessible also for unauthenticated users.
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = serializers.LoginSerializer(data=self.request.data,
            context={ 'request': self.request })
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return Response(None, status=status.HTTP_202_ACCEPTED)
    

class LogoutView(APIView):
	#permission_classes = (permissions.AllowAny,)
	#authentication_classes = ()
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)

class RegisterView(APIView):
	permission_classes = (permissions.AllowAny,)
        
	def post(self, request):
		clean_data = custom_validation(request.data)
		serializer = UserRegisterSerializer(data=clean_data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.create(clean_data)
			if user:
				return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(status=status.HTTP_400_BAD_REQUEST)
 
class UserView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	##
	def get(self, request):
		serializer = UserSerializer(request.user)
		return Response({'user': serializer.data}, status=status.HTTP_200_OK)