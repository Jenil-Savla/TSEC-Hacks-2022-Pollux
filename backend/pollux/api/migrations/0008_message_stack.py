# Generated by Django 4.0.2 on 2022-03-09 10:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_message_seen'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='stack',
            field=models.CharField(default='none', max_length=255),
            preserve_default=False,
        ),
    ]
