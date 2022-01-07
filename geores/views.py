from django.http import Http404, HttpResponse
from django.shortcuts import render
from django.conf import settings
from django.conf.urls.static import static
from geores.models import Res_table, smoothed_border, Feature, Layer
from django.core.serializers import serialize
from rest_framework_mvt.views import mvt_view_factory


from django.views.generic import ListView, DetailView
from vectortiles.postgis.views import MVTView
from vectortiles.mixins import BaseVectorTileView



count_res_table = Res_table.objects.count()
all_object = 'Все объекты'
list_object = 'Список'
link_name = {'surgut': 'Границы освещённых участков', 'surgut_lf': 'Границы освещённых участков (Leaflet)', 'kvartal_les': 'Квартальная сеть'}
surgut = 'Границы освещённых участков'
surgut_lf = 'Границы освещённых участков (Leaflet)'
maps = 'Openlayers'
mapboxgl_accessToken = 'pk.eyJ1IjoidG9nYWNoZXYiLCJhIjoiY2pxdzkxNGppMDBqdTN4cjdneHZwMXYzYSJ9.dsqYTRrIFaX-d06mZlR1Cw'

def index_page(request):
    row = Res_table.objects.all()
    context = {
        'all_object': all_object,
        'list_object': 'Список',
        'maps': maps,
        'maps_mvt': link_name,
        'rows': row,
        'count_res_table': count_res_table,
    }
    return render(request, 'pages/index.html', context)

def feature_list(request):
    row = Res_table.objects.all()
    context = {
        'all_object': all_object,
        'list_object': list_object,
        'maps': maps,
        'maps_mvt': link_name,
        'alias_name': 'Название',
        'alias_id': '#',
        'rows': row,
        'count_res_table': count_res_table,
    }
    return render(request, 'pages/feature_row.html', context)


def feature_map(request, pk):
    row = Res_table.objects.get(id=pk)
    feature = serialize('geojson', [row])
    context = {
        'all_object': all_object,
        'list_object': list_object,
        'maps': maps,
        'maps_mvt': link_name,
        'feature': feature,
        'count_res_table': count_res_table,
        }
    return render(request, 'pages/map.html', context)

def features_map(request):
    rows = Res_table.objects.all()
    feature = serialize('geojson', rows)
    count = Res_table.objects.count()
    context = {
        'all_object': all_object,
        'list_object': list_object,
        'maps': maps,
        'maps_mvt': link_name,
        'feature': feature,
        'count_res_table': count_res_table,
    }
    return render(request, 'pages/map.html', context)

def maps_view(request):

    context = {
        'all_object': all_object,
        'list_object': list_object,
        'maps': maps,
        'maps_mvt': link_name,
        'count_res_table': count_res_table,
        }
    return render(request, 'pages/openlayers.html', context)

def mvt_smoothed(request):
    context = {
        'all_object': all_object,
        'list_object': list_object,
        'maps': maps,
        'maps_mvt': link_name,
        'count_res_table': count_res_table,
        'token': mapboxgl_accessToken,
        }
    return render(request, 'pages/mapbox.html', context)

class FeatureTileView(MVTView, ListView):
    model = Feature
    vector_tile_layer_name = "features"
    vector_tile_fields = ('name', )

class LayerTileView(MVTView, DetailView):
    model = Layer
    vector_tile_fields = ('id', 'name', 'type_les', 'les_name', 'uch_les_name', 'uroch_name' )

    def get_vector_tile_layer_name(self):
        return self.get_object().name

    def get_vector_tile_queryset(self):
        return self.get_object().features.all()

    def get(self, request, *args, **kwargs):
        self.object = self.get_object()
        return BaseVectorTileView.get(self,request=request, z=kwargs.get('z'), x=kwargs.get('x'), y=kwargs.get('y'))

def mvt_kvartal(request):
    context = {
        'all_object': all_object,
        'list_object': list_object,
        'maps': maps,
        'maps_mvt': link_name,
        'count_res_table': count_res_table,
        'token': mapboxgl_accessToken,
        }
    return render(request, 'pages/mapbox_test.html', context)

def mvt_url(request):
    domain = request.build_absolute_uri('/')[:-1]
    layer = Layer.objects.all()
    # layers = domain + '/geo/layer/' + str(layer.id) + '/tile/{z}/{x}/{y}'
    context = {
        'all_object': all_object,
        'list_object': list_object,
        'maps': maps,
        'maps_mvt': link_name,
        'count_res_table': count_res_table,
        'layers': layer,
        'token': mapboxgl_accessToken,
        }
    return render(request, 'pages/layer_detail.html', context)
