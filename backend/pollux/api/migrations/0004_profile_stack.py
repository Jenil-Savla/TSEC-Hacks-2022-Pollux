# Generated by Django 4.0.2 on 2022-03-09 08:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_remove_stack_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='stack',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.stack'),
        ),
    ]
