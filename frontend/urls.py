from django.urls import path
from .views import IndexView


app_name = 'frontend'

urlpatterns = [
path('<path:resource>', IndexView.as_view()),
path('',IndexView.as_view(), name='index')
]