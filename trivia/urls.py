from django.urls import path
from . import views

urlpatterns = [
    path('trivia/<int:pk>/admin/', views.QuestionApproveChangeAPIView.as_view()),
    path('admin/', views.QuestionApproveListAPIView.as_view()),
    path('user/trivia/<int:pk>/', views.UserQuestionDetailAPIView.as_view(),),
    path('user/trivia/', views.UserQuestionListAPIView.as_view()),
    path('trivia/', views.QuestionListAPIView.as_view()),
]