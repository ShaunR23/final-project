from django.urls import path, include
from .views import ProfileListAPIView, UserAccount, UserAccountDetail,  twitter_request_token, twitter_receive_callback
from . import views
urlpatterns = [
    path('profiles/', ProfileListAPIView.as_view()),
    path('user/', UserAccount.as_view()),
    path('user/<int:pk>/', UserAccountDetail.as_view()),
    path('twitter/login/callback/', twitter_receive_callback),
    path('twitter/request_token/', twitter_request_token),

]
