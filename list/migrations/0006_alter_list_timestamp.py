# Generated by Django 4.0.4 on 2022-05-04 18:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('list', '0005_alter_list_timestamp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='list',
            name='timestamp',
            field=models.CharField(default='01/01/2001 01:01', max_length=300),
        ),
    ]
