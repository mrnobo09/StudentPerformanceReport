# Generated by Django 5.0.4 on 2024-05-21 18:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='result',
            name='total_marks',
            field=models.FloatField(default=0.0),
        ),
    ]
