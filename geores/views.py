from django.http import HttpResponse
from django.shortcuts import render
from django.conf.urls.static import static
from geores.models import Res_table
from django.core.serializers import serialize


def index_page(request):
    row = Res_table.objects.all()
    context = {
        'pagename': 'Записи из БД',
        'all_object': 'Все объекты',
        'list_object': 'Список объектов',
        'rows': row
    }
    return render(request, 'pages/index.html', context)

def feature_list(request):
    row = Res_table.objects.all()
    context = {
        'pagename': 'Список объектов',
        'object': 'Объект',
        'rows': row}
    return render(request, 'pages/feature_row.html', context)

def feature_row(request, pk):
    feature = serialize('geojson',[Res_table.objects.get(id=pk)])
    return HttpResponse(feature,content_type='application/json')

def features(request):
    feature = serialize('geojson',Res_table.objects.all())
    return HttpResponse(feature,content_type='application/json')
