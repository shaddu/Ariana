from django.test import TestCase
from .models import *
from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework.views import status
from quest.serializers import QuestionnaireSerializer

# Create your tests here.

class QuestionnareTest(TestCase):

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

class BaseViewTest(APITestCase):
    client = APIClient()

    @staticmethod
    def create_questionnaire(name="", slug=""):
        if name != "" and slug != "":
            Questionnaire.objects.create(name=name, slug=slug)

    def setUp(self):
        # add test data
        self.create_questionnaire("Are you hungry ?", "Are-you-hungry")
        self.create_questionnaire("simple list", "simple-list")
       


class GetAllQuestionnairesTest(BaseViewTest):

    def test_get_all_questionnaire(self):
        """
        This test ensures that all Questionnaire added in the setUp method
        exist when we make a GET request to the Questionnaire/ endpoint
        """
        # hit the API endpoint
        response = self.client.get("/api/questionnaire/")
        # fetch the data from db
        expected = Questionnaire.objects.all()
        serialized = QuestionnaireSerializer(expected, many=True)
        self.assertEqual(response.data, serialized.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
