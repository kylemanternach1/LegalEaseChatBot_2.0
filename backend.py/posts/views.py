from rest_framework.viewsets import ModelViewSet
from .serializers      import PostSerializer
from ..models         import Post
from rest_framework.decorators import api_view
from rest_framework.response   import Response
from rest_framework            import status
from capitol_api              import create_story

class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()

serializer_class = PostSerializer

@api_view(['POST'])
def generate_story(request):
    prompt = request.data.get('prompt')
    if not prompt:
        return Response(
            {'detail': "Missing 'prompt' in request body."},
            status=status.HTTP_400_BAD_REQUEST
        )

    result = create_story(prompt)
    if not result:
        return Response(
            {'detail': 'AI call failed.'},
            status=status.HTTP_503_SERVICE_UNAVAILABLE
        )
    external_id, draft_id, socket_address, story_url = result

    return Response({
        'externalId':    external_id,
        'draftId':       draft_id,
        'socketAddress': socket_address,
        'url':           story_url,
    })