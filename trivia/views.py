from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly
from .models import  Question, Score
from .serializers import  QuestionSerializer, UserQuestionSerializer, QuestionAdminSerializer, ScoreSerializer
from .permissions import IsAuthorOrReadOnly

class QuestionListAPIView(generics.ListAPIView):
    serializer_class = QuestionSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        return Question.objects.filter(phase='ACCEPTED')

class UserQuestionListAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    serializer_class = UserQuestionSerializer
    

    def get_queryset(self):
        return Question.objects.filter(author=self.request.user, phase="DRAFT")

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class UserQuestionDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    serializer_class = UserQuestionSerializer

    def get_queryset(self):
        return Question.objects.filter(author=self.request.user.id)

class QuestionAuthorListAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    serializer_class = UserQuestionSerializer

    def get_queryset(self):
        user = self.request.user
        return Question.objects.filter(author=user)

    def perform_create(self,serializer):
        serializer.save(author=self.request.user)

class QuestionApproveListAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAdminUser,)
    serializer_class = QuestionAdminSerializer

    def get_queryset(self):
        return Question.objects.filter(phase='SUBMITTED')

class QuestionApproveChangeAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAdminUser,)
    serializer_class = QuestionAdminSerializer

    def get_queryset(self):
        
        return Question.objects.all()

class QuestionGameListAPIView(generics.ListAPIView):
    serializer_class = QuestionSerializer
    def get_queryset(self):
        return Question.objects.all()[0:10]

class ScoreListAPIView(generics.ListAPIView):
    serializer_class = ScoreSerializer
    def get_queryset(self):
        return Score.objects.all()

