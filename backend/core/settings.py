"""
Django settings for core project.
"""

from pathlib import Path
import os
import dj_database_url  # Aggiunto per gestire l'URL del database di Render

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# --- CONFIGURAZIONE DEPLOY (Aggiunta) ---
# Se siamo su Render, usiamo le variabili d'ambiente, altrimenti i default per il locale
SECRET_KEY = os.environ.get('SECRET_KEY', 'd57bf6e121f968e71b495b0f2a6f62d6')

# In produzione DEBUG deve essere False. Su Render imposteremo la variabile d'ambiente DEBUG=True se serve testare.
DEBUG = os.environ.get('DEBUG', 'True') == 'True'

# Permettiamo l'accesso da Render e localhost
ALLOWED_HOSTS = ['*'] 

# --- FINE CONFIGURAZIONE DEPLOY ---

# CORS_ALLOWED_ORIGINS: Aggiungiamo il futuro URL di Vercel qui quando sarà pronto
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:3000",
]
# Se vuoi essere sicuro che funzioni subito con Vercel, aggiungi anche:
CORS_ALLOW_ALL_ORIGINS = True # Usalo solo temporaneamente per il primo deploy!

CORS_ALLOW_METHODS = [
    "DELETE",
    "GET",
    "OPTIONS",
    "PATCH",
    "POST",
    "PUT",
]

# Application definition
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'inventario',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware', # Aggiunto per gestire i file statici su Render
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'

# Database
# Verità: Se c'è DATABASE_URL (su Render), usa Postgres. Altrimenti SQLite.
DATABASES = {
    'default': dj_database_url.config(
        default=f'sqlite:///{BASE_DIR / "db.sqlite3"}',
        conn_max_age=600
    )
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = 'static/'

# Aggiunto per il deploy: dove Django raccoglie i file statici
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
# Ottimizzazione per servire file statici
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'