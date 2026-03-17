from django.db import models

class Veicolo(models.Model):
    # --- IDENTITÀ (Per i filtri e i grafici Top Makes) ---
    marca = models.CharField(max_length=50)
    modello = models.CharField(max_length=50)
    anno = models.PositiveIntegerField()
    targa = models.CharField(max_length=10, unique=True) # La verità SQL: deve essere unica!
    km = models.PositiveIntegerField(default=0)
    ALIMENTAZIONE_CHOICES = [
        ('benzina', 'Benzina'),
        ('diesel', 'Diesel'),
        ('gpl', 'GPL'),
        ('metano', 'Metano'),
        ('ibrida', 'Ibrida'),
        ('elettrica', 'Elettrica'),
    ]
    alimentazione = models.CharField(max_length=20, choices=ALIMENTAZIONE_CHOICES, default='benzina')

    CAMBIO_CHOICES = [
        ('manuale', 'Manuale'),
        ('automatico', 'Automatico'),
    ]
    cambio = models.CharField(max_length=20, choices=CAMBIO_CHOICES, default='manuale')

    CLASSE_CHOICES = [
        ('euro4', 'Euro 4'),
        ('euro5', 'Euro 5'),
        ('euro6', 'Euro 6'),
        ('elettrico', 'Elettrico/Zero'),
    ]
    classe_ambientale = models.CharField(max_length=20, choices=CLASSE_CHOICES, default='euro6')
    # --- ECONOMIA (Per il grafico Margine e Vendite) ---
    # Usiamo DecimalField perché i soldi non si gestiscono mai con i Float (approssimativi)
    prezzo_acquisto = models.DecimalField(max_digits=10, decimal_places=2)
    prezzo_listino = models.DecimalField(max_digits=10, decimal_places=2)

    # --- STATO (Per sapere cosa mostrare in Inventario o Sales) ---
    STATO_CHOICES = [
        ('disponibile', 'In Stock'),
        ('venduto', 'Venduto'),
        ('officina', 'In Preparazione'),
        ('transito', 'In Transito'),
    ]
    stato = models.CharField(max_length=20, choices=STATO_CHOICES, default='disponibile')
    n_proprietari = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.marca} {self.modello} - {self.targa}"

class Vendita(models.Model):
    # Relazione 1 a 1: un veicolo specifico può avere una sola vendita
    veicolo = models.OneToOneField(Veicolo, on_delete=models.CASCADE, related_name='vendita_effettuata')
    
    prezzo_vendita_effettivo = models.DecimalField(max_digits=10, decimal_places=2)
    data_vendita = models.DateField()
    venditore = models.CharField(max_length=100) # Qui andranno i famosi "Marco" o "Laura"

    def __str__(self):
        return f"Venduta da {self.venditore} il {self.data_vendita}"    