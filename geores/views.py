from django.http import Http404, HttpResponse
from django.shortcuts import render
from django.conf.urls.static import static
from geores.models import Res_table, smoothed_border
from django.core.serializers import serialize

count_res_table = Res_table.objects.count()
all_object = 'Все объекты'
list_object = 'Список'
surgut = 'Границы освещённых участков'
maps = 'Leaflet'

def index_page(request):
    row = Res_table.objects.all()
    context = {
        'all_object': all_object,
        'list_object': 'Список',
        'maps': maps,
        'maps_mvt': surgut,
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
        'maps_mvt': surgut,
        'alias_name': 'Название',
        'alias_id': '#',
        'rows': row,
        'count_res_table': count_res_table,
    }
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
        'all_object': all_object,
        'list_object': list_object,
        'maps': maps,
        'maps_mvt': surgut,
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
        'maps_mvt': surgut,
        'feature': feature,
        'count_res_table': count_res_table,
    }
    return render(request, 'pages/map.html', context)

def maps_view(request):

    context = {
        'all_object': all_object,
        'list_object': list_object,
        'maps': maps,
        'maps_mvt': surgut,
        'count_res_table': count_res_table,
        }
    return render(request, 'pages/map.html', context)

def mvt_smoothed(request):
    context = {
        'all_object': all_object,
        'list_object': list_object,
        'maps': maps,
        'maps_mvt': surgut,
        'count_res_table': count_res_table,
        }
    return render(request, 'pages/mapbox.html', context)
