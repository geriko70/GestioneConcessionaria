from django.shortcuts import render
from rest_framework import generics
from rest_framework.generics import RetrieveUpdateAPIView, RetrieveUpdateDestroyAPIView
from .serializer import VeicoloSerializer, VenditaSerializer
from .models import Veicolo, Vendita

class VeicoloListCreateView(generics.ListCreateAPIView):
    queryset = Veicolo.objects.all()
    serializer_class = VeicoloSerializer
class VenditaListCreateView(generics.ListCreateAPIView):
    queryset = Vendita.objects.all()
    serializer_class = VenditaSerializer
class VeicoloUpdateView(RetrieveUpdateAPIView):
    queryset = Veicolo.objects.all()
    serializer_class = VeicoloSerializer
class VenditaDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Vendita.objects.all()
    serializer_class = VenditaSerializer
