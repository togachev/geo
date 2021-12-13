from django.http import Http404
from django.shortcuts import render
from django.conf.urls.static import static
from geores.models import Res_table

# Create your views here.
def res_data(request):
    row = Res_table.objects.all()
    context = {
        'pagename': '',
        "data": row,
    }
    return render(request, 'pages/index.html', context)
