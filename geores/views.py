from django.http import HttpResponse
from django.shortcuts import render
from django.conf.urls.static import static
from geores.models import Res_table
from django.core.serializers import serialize


def index_page(request):
    row = Res_table.objects.all()
    context = {'pagename': 'Записи из БД', 'rows': row}
    return render(request, 'pages/index.html', context)

def feature_row(request, pk):
    feature = serialize('geojson',[Res_table.objects.get(id=pk)])
    return HttpResponse(feature,content_type='application/json')


