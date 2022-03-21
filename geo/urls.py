from django.contrib import admin
from django.conf import settings
from django.urls import path
from django.conf.urls.static import static

from geores import views
from rest_framework_mvt.views import mvt_view_factory

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index_page, name="home"),
    path('tiles/<int:z>/<int:x>/<int:y>', views.FeatureTileView.as_view(), name="feature-tile"),
    path('layer/<int:pk>/tile/<int:z>/<int:x>/<int:y>', views.LayerTileView.as_view(), name="layer-tile"),
    path('list', views.feature_list, name="feature-list"),
    path('ol', views.feature_ol, name="feature-ol"),
    path('olmap', views.feature_olmap, name="feature-olmap"),
    path('olmap_a', views.feature_olmap_a, name="feature-olmap_a"),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)