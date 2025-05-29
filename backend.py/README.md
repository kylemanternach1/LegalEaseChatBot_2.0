# Steps for Setting up Django Backend

_Refer to the YouTube walkthrough for details:_  
https://www.youtube.com/watch?v=eXrwF4LXF5c

## 1. Clone the repository
    git clone https://github.com/your-org/your-backend.git
    cd your-backend

## 2. Create & Activate Virtual Environment
    # create a new virtual environment named "env"
    virtualenv env

    # enter it and activate (macOS/Linux)
    cd env
    source bin/activate

    # (Windows PowerShell)
    .\Scripts\Activate.ps1

## 3. Install Dependencies
    pip install django djangorestframework django-cors-headers

    # (Optional) Lock dependencies once everything works
    pip freeze > requirements.txt

## 4. Configure CORS (in `settings.py`), this should be in the code
Add to `INSTALLED_APPS`:
    INSTALLED_APPS += [
        'rest_framework',
        'corsheaders',
    ]

Insert at top of `MIDDLEWARE`:
    MIDDLEWARE = [
        'corsheaders.middleware.CorsMiddleware',
        # ...
    ]

Define allowed origins:
    CORS_ALLOWED_ORIGINS = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]

## 5. Apply Migrations
    python manage.py migrate

## 6. (Optional) Create Superuser
    python manage.py createsuperuser

## 7. Run the Development Server
    python manage.py runserver

You can now access:  
- **API root:** http://127.0.0.1:8000/  
- **Admin panel:** http://127.0.0.1:8000/admin/
