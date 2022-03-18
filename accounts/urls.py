from django.urls import path, include
from .views import ProfileListAPIView, UserAccount, UserAccountDetail
from . import views
urlpatterns = [
    path('profiles/', ProfileListAPIView.as_view()),
    path('user/', UserAccount.as_view()),
    path('user/<int:pk>/', UserAccountDetail.as_view()),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls'))
   
]