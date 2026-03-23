import random
from datetime import datetime, date, timedelta
from django.core.management.base import BaseCommand
from inventario.models import Veicolo, Vendita
from decimal import Decimal



class Command(BaseCommand):

    help = 'Popola il database con vendite reali negli ultimi 12 mesi'

    def handle(self, *args, **kwargs):

        marche_modelli = {

            'Fiat': ['500', 'Panda', 'Tipo'],

            'Audi': ['A3', 'Q3', 'A4'],

            'BMW': ['Serie 1', 'X1', 'Serie 3'],

            'Alfa Romeo': ['Giulia', 'Stelvio'],

            'Volkswagen': ['Golf', 'T-Roc'],

            'Toyota': ['Yaris', 'RAV4'],

            'Ford': ['Puma', 'Focus']

        }

        venditori = ['Marco', 'Laura', 'Giuseppe', 'Elena', 'Riccardo', 'Giulia']
        alimentazioni = ['benzina','diesel','gpl','metano','ibrida','elettrica']
        cambi=['manuale','automatico']
        classi=['euro4','euro5','euro6']

        self.stdout.write("Svuotamento database...")

        Vendita.objects.all().delete()

        Veicolo.objects.all().delete()



        self.stdout.write("Generazione di 120 veicoli con datazione retroattiva...")



        oggi = date.today()



        for i in range(120):

            marca = random.choice(list(marche_modelli.keys()))

            modello = random.choice(marche_modelli[marca])

            prezzo_acq = Decimal(random.randint(9000, 32000))

           

            # 60% vendute, 40% altri stati
            anno_vettura=random.randint(2018, 2024)
            eta_auto = oggi.year - anno_vettura
            km_base = eta_auto * 15000
            km_reali = max(5000, km_base + random.randint(-10000, 20000)) if marca != 'Tesla' else random.randint(5000, 80000)
            alimentazione_casuale=random.choice(alimentazioni)
            if alimentazione_casuale=="elettrica":
                classe="elettrico"
            else:
                classe=random.choice(classi)

            if i < 72:
                stato_scelto = 'venduto'
            else:
                stato_scelto = random.choice(['disponibile', 'officina', 'transito'])

            veicolo = Veicolo.objects.create(
            marca=marca,
            modello=modello,
            anno=anno_vettura,
            targa=f"DX{i:03}ZZ",
            prezzo_acquisto=prezzo_acq,
            prezzo_listino=prezzo_acq + Decimal(random.randint(3000, 8000)),
            stato=stato_scelto,
            alimentazione=alimentazione_casuale,
            classe_ambientale=classe,
            cambio=random.choice(cambi),
            km=km_reali,
            n_proprietari=random.randint(1,3),
            )



            if veicolo.stato == 'venduto':

                # LOGICA "ROLLING 12 MONTHS":

                # Distribuiamo le 72 vendite negli ultimi 12 mesi

                # Ogni mese riceverà circa 6 vendite (72/12)

                mesi_indietro = i % 12

               

                # Calcoliamo l'anno e il mese andando a ritroso

                anno_v = oggi.year

                mese_v = oggi.month - mesi_indietro

               

                # Se il mese diventa <= 0, dobbiamo scalare l'anno

                while mese_v <= 0:

                    mese_v += 12

                    anno_v -= 1

               

                giorno_v = random.randint(1, 28)

                data_v = date(anno_v, mese_v, giorno_v)

               

                # Evitiamo comunque date nel futuro rispetto a oggi (es. oggi è il 28, non mettiamo il 29)

                if data_v > oggi:

                    data_v = oggi



                margine = Decimal(random.randint(1500, 6000))

               

                Vendita.objects.create(

                    veicolo=veicolo,

                    prezzo_vendita_effettivo=veicolo.prezzo_acquisto + margine,

                    data_vendita=data_v,

                    venditore=random.choice(venditori)
                    
                )



        self.stdout.write(self.style.SUCCESS(f'Database popolato! Creati 120 record. Le vendite coprono dal {oggi.month}/{oggi.year-1} ad oggi.'))

