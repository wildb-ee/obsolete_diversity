import random
import string
from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

MAX_CODE_LENGTH = 8

def generate_unique_code():

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=MAX_CODE_LENGTH))
        if Fight.objects.filter(code=code).count() == 0:
            break

    return code

# НЕ УВЕРЕН , ВРОДЕ КАК РАБОТАЕТ. ПРОШУ ПОСМОТРЕТЬ
def get_all_questions(section = 'all'):
    all_questions = {}

    sections = [Section.objects.get(name=section)]
    if None in sections:
        sections = Section.objects.all()
    for sec in sections:
        for question in sec.get_question():
            answers = []
            for ans in question.get_answers():
                answers.append(ans)
            all_questions[str(question)]= answers
    return all_questions        

# Create your models here.
class Fight(models.Model):
    code = models.CharField(max_length=MAX_CODE_LENGTH, default=generate_unique_code, unique=True)
    host = models.CharField(max_length=50, default='none')
    opponent = models.CharField(max_length=50, default='')
    section = models.CharField(max_length=50, default='all')
    created_at = models.DateTimeField(auto_now_add=True)

    number_of_questions_per_section = models.IntegerField(default=0)
    time_minutes = models.IntegerField(default=0)


    def get_random_questions(self):
        # СДЕЛАЙ ЧТОБЫ ОН ДОСТАВАЛ ВСЕ ВОПРОСЫ И СЛАЛ ИХ ВМЕСТЕ С ОТВЕТАМИ КАК-ТО
        # get_all_questions(section=self.section)
        pass 

           


class Section(models.Model):
    name = models.CharField(max_length=50) 

    def get_questions(self):
        return self.questions.all()

class Question(models.Model):
    text = models.CharField(max_length=500)
    section = models.ForeignKey(Section, on_delete=models.CASCADE, related_name='questions')
    created_at = models.DateTimeField(auto_now_add=True)

    def get_answers(self):
        return self.answers.all()
    
    def __str__(self) -> str:
        return self.text

class Answer(models.Model):
    text = models.CharField(max_length=200)
    is_correct = models.BooleanField(default=False)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answers')
    created_at = models.DateTimeField(auto_now_add=True)