from django.urls import path
from .views import VeicoloListCreateView, VenditaListCreateView,VeicoloUpdateView,VenditaDeleteView

urlpatterns = [
    # Quando React cercherà i veicoli
    path('veicoli/', VeicoloListCreateView.as_view(), name='veicolo-list'),
    
    # Quando React cercherà le vendite per i tuoi grafici
    path('vendite/', VenditaListCreateView.as_view(), name='vendita-list'),

    path('veicoli/<int:pk>/', VeicoloUpdateView.as_view(), name='veicolo-update'),
    path('vendite/<int:pk>/', VenditaDeleteView.as_view(), name='vendita-delete'),
]