from django.contrib import admin
from django.conf import settings
from django.urls import path
from django.conf.urls.static import static

from geores import views
from rest_framework_mvt.views import mvt_view_factory
from geores.models import Example, Res_table, smoothed_border

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index_page, name="home"),
    path('maps', views.maps_view, name="maps-view"),
    path('mvt_smoothed', views.mvt_smoothed, name="mvt-smoothed"),
    path('list', views.feature_list, name="feature-list"),
    path('feature/<int:pk>',views.feature_map,name='feature-map'),
    path('features',views.features_map,name='features-map'),
    path('api/v1/data/example.mvt', mvt_view_factory(Example)),
    path('api/v1/data/res_table.mvt', mvt_view_factory(Res_table)),
    path('api/v1/data/smoothed_border.mvt', mvt_view_factory(smoothed_border)),
    path('tiles/<int:z>/<int:x>/<int:y>', views.FeatureTileView.as_view(), name="feature-tile"),
    path('layer/<int:pk>/tile/<int:z>/<int:x>/<int:y>', views.LayerTileView.as_view(), name="layer-tile"),
    path('mvt_kvartal', views.mvt_kvartal, name="mvt-kvartal"),
    path('mvt', views.mvt_url, name="mvt-url"),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
