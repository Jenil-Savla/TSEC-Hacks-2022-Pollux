# Generated by Django 4.0.2 on 2022-03-09 09:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_remove_profile_stack_stack_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='experience',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='photo',
            field=models.ImageField(blank=True, upload_to=''),
        ),
    ]
