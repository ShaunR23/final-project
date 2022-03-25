from cProfile import Profile
from rest_framework import serializers
from .models import Profile
from dj_rest_auth.serializers import UserDetailsSerializer
from dj_rest_auth.models import TokenModel


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'user','questions_right', 'questions_total' )


class UserDetailsSerializer(UserDetailsSerializer):
    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + ('is_superuser',)


class TokenSerializer(serializers.ModelSerializer):
    is_superuser = serializers.ReadOnlyField(source='user.is_superuser')
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = TokenModel
        fields = ('key', 'username', 'is_superuser')
