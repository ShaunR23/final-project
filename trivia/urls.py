from django.urls import path
from . import views

urlpatterns = [
    path('admin-view/<int:pk>', views.QuestionApproveChangeAPIView.as_view()),
    path('admin-view/', views.QuestionApproveListAPIView.as_view()),
    path('user/trivia-list/<int:pk>/', views.UserQuestionDetailAPIView.as_view(),),
    path('user/trivia-list/', views.UserQuestionListAPIView.as_view()),
    path('trivia/', views.get_question_list),
    path('trivia-list/', views.QuestionGameListAPIView.as_view()),
    path('user/score/', views.UserScoreListAPIView.as_view()),
    path('scores/', views.ScoreListAPIView.as_view()),
    path('leaderboard/', views.get_leaderboard),
    path('user/score/<int:pk>', views.UserScoreDetailListAPIView.as_view()),
    path('score-hard/', views.ScoreHardListAPIView.as_view()),
    path('user/score-hard/<int:pk>', views.UserScoreHardListAPIView.as_view()),
]
