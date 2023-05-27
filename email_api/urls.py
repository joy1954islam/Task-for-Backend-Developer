from django.urls import path
from .views import SendEmailsView

urlpatterns = [
    path('send-emails/', SendEmailsView.as_view(), name='send_emails'),
]

