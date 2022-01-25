from django.db import models
from django.contrib.gis.db import models
from rest_framework_mvt.managers import MVTManager

from django.db.models import JSONField

class Layer(models.Model):
    name = models.CharField(max_length=250)

    def __str__(self):
        return self.name
    def __unicode__(self):
        return self.name

class Feature(models.Model):
    geom = models.GeometryField(null=True, srid=4326)
    # name = models.CharField(max_length=250, null=True)
    jsonb_data = JSONField(null=True, blank=True, default=dict, db_index=True)
    # type_data = models.IntegerField(blank=True, null=True)
    layer = models.ForeignKey(Layer, on_delete=models.CASCADE, related_name='features')

    class Meta:
        ordering = ('id', )
