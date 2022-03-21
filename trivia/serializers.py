import random
from django.forms import ValidationError
from rest_framework import serializers
from .models import Question, Score
from datetime import date, datetime


class QuestionSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source='author.username')
    shuffled_answers = serializers.SerializerMethodField()

    class Meta:
        model = Question
        exclude = ('phase', 'author',)

    def get_shuffled_answers(self, obj):
        answers = [{obj.incorrectAnswer1: False}, {obj.incorrectAnswer2: False},
                   {obj.incorrectAnswer3: False}, {obj.correctAnswer: True}]

        random.shuffle(answers)
        return answers

    # def clean(self):
    #     if self.date == date.today():
    #         raise ValidationError("You've played your round for today.")


class UserQuestionSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Question
        exclude = ('author',)


class QuestionAdminSerializer(serializers.ModelSerializer):
    creator = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Question
        fields = '__all__'


class ScoreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Score
        fields = ('__all__')

    def get_highest_score(self, obj):
        highScores = obj.score.sort(reverse=True)
        return highScores
