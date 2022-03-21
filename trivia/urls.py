from django.urls import path
from . import views

urlpatterns = [
    path('admin-view/<int:pk>', views.QuestionApproveChangeAPIView.as_view()),
    path('admin-view/', views.QuestionApproveListAPIView.as_view()),
    path('user/trivia/<int:pk>/', views.UserQuestionDetailAPIView.as_view(),),
    path('user/trivia/', views.UserQuestionListAPIView.as_view()),
    path('trivia/', views.QuestionListAPIView.as_view()),
    path('daily-trivia/', views.QuestionGameListAPIView.as_view()),

    path('user/score/', views.UserScoreListAPIView.as_view()),
    path('score/', views.ScoreListAPIView.as_view()),
    path('user/score/<int:pk>', views.UserScoreDetailListAPIView.as_view()),
]