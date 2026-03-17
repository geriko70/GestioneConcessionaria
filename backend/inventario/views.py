from django.shortcuts import render
from rest_framework import generics
from .serializer import VeicoloSerializer, VenditaSerializer
from .models import Veicolo, Vendita

class VeicoloListCreateView(generics.ListCreateAPIView):
    queryset = Veicolo.objects.all()
    serializer_class = VeicoloSerializer
class VenditaListCreateView(generics.ListCreateAPIView):
    queryset = Vendita.objects.all()
    serializer_class = VenditaSerializer