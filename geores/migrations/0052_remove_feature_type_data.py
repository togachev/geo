# Generated by Django 4.0 on 2022-01-11 12:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('geores', '0051_alter_feature_jsonb_data'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='feature',
            name='type_data',
        ),
    ]
