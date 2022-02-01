from django.db import connection
from django.http import Http404, HttpResponse
from django.shortcuts import render
from django.conf import settings
from django.conf.urls.static import static
from geores.models import Feature, Layer, style
from django.core.serializers import serialize
from rest_framework_mvt.views import mvt_view_factory


from django.views.generic import ListView, DetailView
from vectortiles.postgis.views import MVTView
from vectortiles.mixins import BaseVectorTileView


count_layers = Layer.objects.count()


def index_page(request):
    row = Layer.objects.all()
    context = {
        'rows': row,
        'count_layers': count_layers,
    }
    return render(request, 'pages/index.html', context)

class FeatureTileView(MVTView, ListView):
    model = Feature
    vector_tile_layer_name = "features"
    vector_tile_fields = ('name', )


class LayerTileView(MVTView, DetailView):
    model = Layer
    vector_tile_fields = ('id', 'jsonb_data' )
    vector_tile_content_type = "application/x-protobuf"
    # vector_tile_queryset = None
    # vector_tile_queryset_limit = None
    # # vector_tile_layer_name = None  # name for data layer in vector tile
    # vector_tile_geom_name = "geom"  # geom field to consider in qs
    # # vector_tile_fields = None  # other fields to include from qs
    # vector_tile_generation = None  # use mapbox if you installed [mapbox] subdependencies
    vector_tile_extent = 512  # define tile extent
    vector_tile_buffer = 64  # define buffer around tiles (intersected polygon display without borders)
    # vector_tile_clip_geom = True  # define if feature geometries should be clipped in tile

    def get_vector_tile_layer_name(self):
        return self.get_object().name

    def get_vector_tile_queryset(self):
        return self.get_object().features.all()

    def get(self, request, *args, **kwargs):
        self.object = self.get_object()
        return BaseVectorTileView.get(self,request=request, z=kwargs.get('z'), x=kwargs.get('x'), y=kwargs.get('y'))

def feature_list(request):
    row = Layer.objects.all()
    context = {
        'rows': row,
    }
    return render(request, 'pages/feature_list.html', context)

def feature_ol(request):
    row = Layer.objects.all()
    styles = style.objects.all()
    context = {
        'rows': row,
        'styles': styles,
    }
    return render(request, 'pages/map.html', context)
