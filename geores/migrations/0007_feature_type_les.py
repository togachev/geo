# Generated by Django 4.0 on 2022-01-07 01:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('geores', '0006_feature_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='feature',
            name='type_les',
            field=models.IntegerField(null=True),
        ),
    ]