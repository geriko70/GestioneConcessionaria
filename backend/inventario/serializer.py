from rest_framework import serializers
from .models import Veicolo, Vendita

class VeicoloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Veicolo
        fields = '__all__'
class VenditaSerializer(serializers.ModelSerializer):
    # La verità tecnica: "Nested Serializer". 
    # Invece di mandare solo l'ID, mandiamo tutto l'oggetto Veicolo 
    # così React ha subito marca, modello e prezzo_acquisto per il calcolo del margine.
    veicolo = VeicoloSerializer(read_only=True)
    
    # Questo serve per poter ancora inviare l'ID quando crei una vendita (POST)
    veicolo_id = serializers.PrimaryKeyRelatedField(
        queryset=Veicolo.objects.all(), 
        source='veicolo', 
        write_only=True
    )

    # Campo calcolato: Il margine reale (Prezzo Vendita - Prezzo Acquisto)
    margine = serializers.SerializerMethodField()
    class Meta:
        model = Vendita
        fields = [
            'id', 'veicolo', 'veicolo_id', 'prezzo_vendita_effettivo', 
            'data_vendita', 'venditore', 'margine'
        ]
        
    def get_margine(self, obj):
        # La logica matematica: Prezzo Vendita - Prezzo Acquisto del veicolo collegato
        return obj.prezzo_vendita_effettivo - obj.veicolo.prezzo_acquisto