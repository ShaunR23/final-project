import requests
import json
from .models import Profile
from .serializers import ProfileSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.views import APIView
from .permissions import isUserOnly
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from allauth.socialaccount.providers.twitter.views import TwitterOAuthAdapter
from dj_rest_auth.registration.views import SocialLoginView
from dj_rest_auth.social_serializers import TwitterLoginSerializer
from requests_oauthlib import OAuth1Session
from rest_framework.response import Response
from django.shortcuts import redirect
from django.urls import reverse


class ProfileListAPIView(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserAccount(generics.ListAPIView):
    serializer_class = ProfileSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user.id
        return Profile.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserAccountDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = (isUserOnly,)


class TwitterLogin(SocialLoginView):
    serializer_class = TwitterLoginSerializer
    adapter_class = TwitterOAuthAdapter


@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def twitter_request_token(request):
    request_token_url = 'https://api.twitter.com/oauth/request_token'
    oauth_session = OAuth1Session(
        settings.TWITTER_API_KEY,
        client_secret=settings.TWITTER_API_SECRET_KEY,
        signature_type='auth_header',
        callback_uri=settings.TWITTER_URL_CALLBACK)
    fetch_response = oauth_session.fetch_request_token(request_token_url)
    return Response({"oauth_token": fetch_response['oauth_token']})


@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def twitter_receive_callback(request):
    access_token_url = 'https://api.twitter.com/oauth/access_token'

    oauth_session = OAuth1Session(
        settings.TWITTER_API_KEY,
        client_secret=settings.TWITTER_API_SECRET_KEY,
        signature_type='auth_header',
        callback_uri=settings.TWITTER_URL_CALLBACK)

    redirect_response = request.get_full_path()
    oauth_session.parse_authorization_response(redirect_response)
    token = oauth_session.fetch_access_token(access_token_url)
    params = {'access_token': token['oauth_token'],
              'token_secret': token['oauth_token_secret']}

    result = requests.post(settings.DOMAIN + reverse('twitter_login'),
                           data=params).text
    result = json.loads(result)
    return Response({'key': result.get('key')})
