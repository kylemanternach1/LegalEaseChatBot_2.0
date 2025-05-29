from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, generate_story

router = DefaultRouter()
router.register(r'posts', PostViewSet, basename='post')

urlpatterns = [
    path('chat/', generate_story, name='generate_story'),
    *router.urls,
]
