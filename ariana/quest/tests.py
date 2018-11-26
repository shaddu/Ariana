from django.test import TestCase
from .models import *
# Create your tests here.

class QuestionnareModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Questionnaire.objects.create(name='Test Questionnaire')
        Questionnaire.objects.create(slug='Test-Questionnaire-2')
    

    def test_name_content(self):
        questionnaire = Questionnaire.objects.get(id=1)
        expected_object_name = f'{questionnaire.name}'
        self.assertEquals(expected_object_name, 'Test Questionnaire')
    
    def test_slug_content(self):
        questionnaire = Questionnaire.objects.get(id=2)
        expected_object_slug = f'{questionnaire.slug}'
        self.assertEquals(expected_object_slug, 'Test-Questionnaire-2')


