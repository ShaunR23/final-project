from django.urls import path
from .views import ProfileListAPIView, UserAccount, UserAccountDetail
from . import views
urlpatterns = [
    path('profiles/', ProfileListAPIView.as_view()),
    path('user/', UserAccount.as_view()),
    path('user/<int:pk>/', UserAccountDetail.as_view()),
    
   
]