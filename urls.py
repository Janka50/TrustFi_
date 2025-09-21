from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path("owner/", views.get_contract_owner, name="get_contract_owner"),
    path("verified/", views.check_verified, name="check_verified"),
]
