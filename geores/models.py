from django.db import models
from django.contrib.gis.db import models
from rest_framework_mvt.managers import MVTManager
from django.db.models import JSONField

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

    def __str__(self):
        return self.name
    def __unicode__(self):
        return self.name

class Feature(models.Model):
    geom = models.GeometryField(srid=4326)
    name = models.CharField(max_length=250, null=True)
    les_name = models.CharField(max_length=250, null=True)
    uch_les_name = models.CharField(max_length=250, null=True)
    uroch_name = models.CharField(max_length=250, null=True)
    type_les = models.IntegerField(null=True)
    # preferences = JSONField(default=dict)
    layer = models.ForeignKey(Layer, on_delete=models.CASCADE, related_name='features')
