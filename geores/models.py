from django.db import models
from django.contrib.gis.db import models
from rest_framework_mvt.managers import MVTManager

class Res_table(models.Model):
    name = models.CharField(max_length=100, null=True)
    geom = models.MultiPolygonField()
    objects = models.Manager()
    vector_tiles = MVTManager()

class Example(models.Model):
    geom = models.PointField()
    my_column = models.CharField(max_length=100, null=True)
    objects = models.Manager()
    vector_tiles = MVTManager()

class smoothed_border(models.Model):
    area = models.FloatField()
    geom = models.MultiPolygonField()
    objects = models.Manager()
    vector_tiles = MVTManager()

class Layer(models.Model):
    name = models.CharField(max_length=250)


class Feature(models.Model):
    geom = models.GeometryField(srid=4326)
    name = models.CharField(null=True, max_length=250)
    type_geometry = models.CharField(null=True, max_length=250)
    lesnichestvo = models.CharField(null=True, max_length=250)
    uch_lesnichestvo = models.CharField(null=True, max_length=250)
    urochishe = models.CharField(null=True, max_length=250)
    kvartal = models.IntegerField(blank=True, null=True)
    layer = models.ForeignKey(Layer, on_delete=models.CASCADE, related_name='features')
    objects = models.Manager()
    vector_tiles = MVTManager()
