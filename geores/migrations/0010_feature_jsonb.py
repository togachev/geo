# Generated by Django 4.0 on 2022-01-08 18:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('geores', '0009_rename_hstore_data_feature_preferences'),
    ]

    operations = [
        migrations.AddField(
            model_name='feature',
            name='jsonb',
            field=models.JSONField(blank=True, null=True),
        ),
    ]