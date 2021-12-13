from django.db import models
from django.contrib.gis.db import models

class Res_table(models.Model):
    name = models.CharField(max_length=100)
    mpoly = models.MultiPolygonField(srid=3857, null=True, blank=True)
