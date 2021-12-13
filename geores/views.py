from django.http import Http404
from django.shortcuts import render
from django.conf.urls.static import static
from geores.models import Res_table
from django.core.serializers import serialize


# Create your views here.
def res_data(request):
    row = Res_table.objects.all()
    row_geojson = serialize('geojson', Res_table.objects.all(),
          geometry_field='mpoly',
          fields=('name',))
    context = {
        'pagename': '',
        "data": row,
        "data_json": row_geojson,
    }
    return render(request, 'pages/index.html', context)
