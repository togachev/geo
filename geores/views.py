from django.http import HttpResponse
from django.shortcuts import render
from django.conf.urls.static import static
from geores.models import Res_table
from django.core.serializers import serialize
import json


def index_page(request):
    row = Res_table.objects.all()
    context = {
        'pagename': 'Записи из БД',
        'all_object': 'Все объекты',
        'list_object': 'Список объектов',
        'maps': 'Просмотр объектов на карте',
        'rows': row
    }
    return render(request, 'pages/index.html', context)

def feature_list(request):
    row = Res_table.objects.all()
    context = {
        'pagename': 'Список объектов',
        'alias_name': 'Название',
        'alias_id': '#',
        'rows': row}
    return render(request, 'pages/feature_row.html', context)

def feature_row(request, pk):
    row = Res_table.objects.get(id=pk)
    feature = serialize('geojson', [row])
    return HttpResponse(feature,content_type='application/json')

def features(request):
    rows = Res_table.objects.all()
    feature = serialize('geojson', rows)
    return HttpResponse(feature,content_type='application/json')

def maps_view(request):
    context = {
        'pagename': 'Leaflet maps',
        }
    return render(request, 'pages/map.html', context)