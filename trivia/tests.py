from django.test import TestCase, Client
from .models import Question
from urllib import response
from rest_framework import status
import json
from django.urls import reverse
from .serializers import QuestionSerializer


client = Client()

class QuestionTestModels(TestCase):
    def setUp(self):
    
        Question.objects.create(
            question = 'Game question',
            incorrectAnswer1 = 'incorrect answer',
            incorrectAnswer2 = 'incorrect answer',
            incorrectAnswer3 = 'incorrect answer',
            correctAnswer = 'correct answer',
            phase = 'DRAFT'
        )

    def test_question_content(self):
        questions = Question.objects.get()
        self.assertEqual(questions.question, 'Game question'),
        self.assertEqual(questions.incorrectAnswer1, 'incorrect answer'),
        self.assertEqual(questions.incorrectAnswer2, 'incorrect answer'),
        self.assertEqual(questions.incorrectAnswer3, 'incorrect answer'),
        self.assertEqual(questions.correctAnswer, 'correct answer')

    