# Generated by Django 4.0 on 2022-01-09 16:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('geores', '0037_feature_jsonb_data'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='feature',
            name='jsonb_data',
        ),
    ]