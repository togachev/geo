# Generated by Django 4.0 on 2022-01-21 22:28

import django.contrib.gis.db.models.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Layer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250)),
            ],
        ),
        migrations.CreateModel(
            name='Feature',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('geom', django.contrib.gis.db.models.fields.GeometryField(null=True, srid=4326)),
                ('name', models.CharField(max_length=250, null=True)),
                ('jsonb_data', models.JSONField(blank=True, default=dict, null=True)),
                ('type_data', models.IntegerField(blank=True, null=True)),
                ('layer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='features', to='geores.layer')),
            ],
            options={
                'ordering': ('id',),
            },
        ),
    ]
