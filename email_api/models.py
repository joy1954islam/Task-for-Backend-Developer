from django.core.mail import EmailMessage
from django.db import models
from email_sender.settings import EMAIL_HOST_USER
from django.conf import settings


class Email(models.Model):
    email = models.TextField()
    subject = models.CharField(max_length=255)
    body = models.TextField()
    attachment = models.FileField(upload_to='attachments/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def send_email(self):
        # Implement the email sending logic using Django's built-in email functionality
        # Here's a basic example using Django's EmailMessage:
        email_list = self.email.split(',')  # Assuming email addresses are comma-separated
        attachment_data = self.attachment

        # Create and send the email
        email = EmailMessage(
            subject=self.subject,
            body=self.body,
            from_email=EMAIL_HOST_USER,  # Replace with your email
            to=email_list
        )
        print('sda = ', settings.BASE_DIR)

        if self.attachment:
            email.attach(attachment_data.name, attachment_data.read(), 'application/pdf')
        email.send()

    def save(self, *args, **kwargs):
        # Override the save method to send the email when the model is saved
        self.send_email()
        super().save(*args, **kwargs)
