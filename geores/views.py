from django.http import HttpResponse
from django.shortcuts import render
from django.conf.urls.static import static
from geores.models import Res_table
from django.core.serializers import serialize
import json


def index_page(request):
    row = Res_table.objects.all()
    context = {
        'all_object': 'Все объекты',
        'list_object': 'Список',
        'maps': 'Leaflet',
        'rows': row
    }
    return render(request, 'pages/index.html', context)

def feature_list(request):
    row = Res_table.objects.all()
    context = {
        'all_object': 'Все объекты',
        'list_object': 'Список',
        'maps': 'Leaflet',
        'alias_name': 'Название',
        'alias_id': '#',
        'rows': row}
    return render(request, 'pages/feature_row.html', context)

# def feature_row(request, pk):
#     row = Res_table.objects.get(id=pk)
#     feature = serialize('geojson', [row])
#     return HttpResponse(feature,content_type='application/json')
#
# def feature_rows(request):
#     rows = Res_table.objects.all()
#     feature = serialize('geojson', rows)
#     return HttpResponse(feature,content_type='application/json')

def feature_map(request, pk):
    row = Res_table.objects.get(id=pk)
    feature = serialize('geojson', [row])
    context = {
        'all_object': 'Все объекты',
        'list_object': 'Список',
        'maps': 'Leaflet',
        'feature': feature}
    return render(request, 'pages/map.html', context)

def features_map(request):
    rows = Res_table.objects.all()
    feature = serialize('geojson', rows)
    context = {
        'all_object': 'Все объекты',
        'list_object': 'Список',
        'maps': 'Leaflet',
        'feature': feature,
    }
    return render(request, 'pages/map.html', context)

def maps_view(request):
    context = {
        'all_object': 'Все объекты',
        'list_object': 'Список',
        'maps': 'Leaflet',
        }
    return render(request, 'pages/map.html', context)
