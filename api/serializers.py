from rest_framework import serializers
from .models import Fight


class FightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fight
        fields = ('id', 'code', 'host', 'opponent','section', 'created_at')

class CreateFightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fight
        fields = ('section',)