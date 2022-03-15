from django.urls import path
from . import views

urlpatterns = [
    path('admin/<int:pk>', views.QuestionApproveChangeAPIView.as_view()),
    path('admin/', views.QuestionApproveListAPIView.as_view()),
    path('user/trivia/<int:pk>/', views.UserQuestionDetailAPIView.as_view(),),
    path('user/trivia/', views.UserQuestionListAPIView.as_view()),
    path('trivia/', views.QuestionListAPIView.as_view()),
    path('daily-trivia/', views.QuestionGameListAPIView.as_view()),
    path('leaderboard/', views.LeaderBoardListAPIView.as_view()),
]