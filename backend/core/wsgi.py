"""
WSGI config for core project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/6.0/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

application = get_wsgi_application()


from django.contrib.auth import get_user_model
User = get_user_model()
try:
    if not User.objects.filter(username='admin_veloce').exists():
        User.objects.create_superuser('admin_veloce', 'admin@test.it', 'PasswordSicura123!')
        print("✅ UTENTE CREATO SU RENDER!")
except:
    pass # Serve per evitare errori durante le migrazioni iniziali