import random

from rest_framework import serializers
from .models import LeaderBoard, Question


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

class LeaderBoardSerializer(serializers.ModelSerializer):

    class Meta:
        model = LeaderBoard
        fields = ('__all__')

    def get_highest_score(self, obj):
        obj.score.sort(reverse = True)

