from django.utils import timezone
import datetime
from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly
from .models import Question, Score, Score_Hard
from .serializers import QuestionSerializer, UserQuestionSerializer, QuestionAdminSerializer, ScoreSerializer, ScoreHardSerializer
from .permissions import IsAuthorOrReadOnly, IsUserOrReadOnly


@api_view()
def get_question_list(request):

    today = datetime.date.today()

    if Score.objects.filter(user=request.user, date=today).exists():
        return Response({'score': Score.objects.get(user=request.user, date=today).score})

    questions = Question.objects.filter(date=datetime.date.today())

    if(len(questions) == 0):
        questions = Question.objects.filter(
            phase='ACCEPTED', date=None)[:10]
        for question in questions:
            question.date = datetime.date.today()
            question.save()

    serializer = QuestionSerializer(questions, many=True)
    return Response(serializer.data)


# class QuestionListAPIView(generics.ListAPIView):
#     serializer_class = QuestionSerializer
#     permission_classes = (IsAuthenticatedOrReadOnly,)

#     def get_queryset(self):

#         user_record = Score.objects.filter(
#             user=self.request.user, date=datetime.date.today())

#         if user_record:
#             serializer_class = ScoreSerializer
#             return user_record

#         questions = Question.objects.filter(date=datetime.date.today())
    # if(len(questions) == 0):
    #     questions = Question.objects.filter(
    #         phase='ACCEPTED', date=None)[:10]
    #     for question in questions:
    #         question.date = datetime.date.today()
    #         question.save()
    #     return questions

    # return questions


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

    def perform_create(self, serializer):
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

    def perform_create(self, serializer):
        serializer.save(self.request.user)


class UserScoreListAPIView(generics.ListCreateAPIView):

    serializer_class = ScoreSerializer

    def get_queryset(self):
        return Score.objects.filter(user=self.request.user.id)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserScoreDetailListAPIView(generics.RetrieveUpdateDestroyAPIView):

    serializer_class = ScoreSerializer

    def get_queryset(self):
        return Score.objects.filter(user=self.request.user.id)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ScoreHardListAPIView(generics.ListCreateAPIView):

    serializer_class = ScoreHardSerializer

    def get_queryset(self):
        return Score_Hard.objects.filter(user=self.request.user.id)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UserScoreHardListAPIView(generics.ListCreateAPIView):

    serializer_class = ScoreHardSerializer

    def get_queryset(self):
        return Score_Hard.objects.filter(user=self.request.user.id)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

