from django.db import models

class QuestionnaireManager(models.Manager):
    def get_by_natural_key(self, name):
        return self.get(name = name)

class Questionnaire(models.Model):
    """
    """
    objects = QuestionnaireManager()
    
    name = models.CharField(max_length=200)
    slug = models.SlugField()

    def __str__(self):
        return self.name

class Message(models.Model):
    """
    """
    text = models.CharField(max_length=300)


class QuestionnaireStructure(models.Model):
    questionnaire = models.ForeignKey(Questionnaire, on_delete=models.CASCADE)
    question_id = models.PositiveIntegerField()
    response_id = models.PositiveIntegerField()

    class Meta:
        unique_together = (("questionnaire", "question_id", "response_id"), )
