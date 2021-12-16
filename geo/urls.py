"""geo URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf import settings
from django.urls import path
from django.conf.urls.static import static

from geores import views
from rest_framework_mvt.views import mvt_view_factory
from geores.models import Example

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index_page, name="home"),
    path('maps', views.maps_view, name="maps-view"),
    path('list', views.feature_list, name="feature-list"),
    path('feature/<int:pk>',views.feature_map,name='feature-map'),
    path('features',views.features_map,name='features-map'),
    path("api/v1/data/example.mvt", mvt_view_factory(Example)), # http://127.0.0.1:8000/api/v1/data/example.mvt?tile={z}/{x}/{y}
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
