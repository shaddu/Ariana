from django.shortcuts import render
from quest.models import *
from quest.serializers import *
from rest_framework import generics


class QuestionnaireListCreate(generics.ListCreateAPIView):
    queryset = Questionnaire.objects.all()
    serializer_class = QuestionnaireSerializer


class MessageListCreate(generics.ListCreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

class QuestionnaireStart(generics.ListAPIView):
    serializer_class = QuestionnaireSerializer
    
    def get_queryset(self):
        slug = self.kwargs['slug']
        return Questionnaire.objects.filter(slug = slug)

class getMessages(generics.ListAPIView):
    serializer_class = MessageSerializer
    
    def get_queryset(self):
        questionnaireID = (self.kwargs['questionnaireID'])
        qID = (self.kwargs['qID'])
        questionnaireStructure_obj = QuestionnaireStructure.objects.filter(question_id = qID, questionnaire__id = questionnaireID).values_list('response_id', flat=True)
        print(questionnaireStructure_obj)
        return Message.objects.filter(id__in = questionnaireStructure_obj)


class getMessage(generics.ListAPIView):
    serializer_class = MessageSerializer
    
    def get_queryset(self):
        mID = (self.kwargs['mID'])
        return Message.objects.filter(id = mID)