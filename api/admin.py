from django.urls import path, include

urlpatterns = [
    path('', include('trivia.urls')),
    path('', include('accounts.urls'))
]