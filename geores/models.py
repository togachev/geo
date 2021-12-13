from django.db import models


class Res_table(models.Model):
    name = models.CharField(max_length=100)
