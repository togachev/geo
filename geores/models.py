from django.db import models
from django.contrib.gis.db import models
from rest_framework_mvt.managers import MVTManager

class Res_table(models.Model):
    name = models.CharField(max_length=100)
    mpoly = models.MultiPolygonField(srid=3857, null=True, blank=True)

class Example(models.Model):
    geom = models.PointField()
    my_column = models.CharField(max_length=100, null=True)
    objects = models.Manager()
    vector_tiles = MVTManager()