from rest_framework import serializers
from .models import Fight

class FightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fight
        fields =('id','code','first_user', 'second_user', 'created_at')