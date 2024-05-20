
from django.contrib import admin
from django.urls import path,include
from api import urls


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include(urls)),
    path('auth/',include('djoser.urls')),
    path('auth/',include('djoser.urls.jwt')),
]
