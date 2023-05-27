from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import EmailSerializer


class SendEmailsView(APIView):
    def post(self, request, format=None):
        print('request data = ', request.data)
        serializer = EmailSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Emails sent successfully'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
