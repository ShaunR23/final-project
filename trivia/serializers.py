from rest_framework import serializers
from .models import Question


class QuestionSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Question
        exclude = ('phase', 'author')


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