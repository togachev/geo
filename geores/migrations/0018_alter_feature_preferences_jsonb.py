# Generated by Django 4.0 on 2022-01-08 19:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('geores', '0017_feature_preferences_jsonb'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feature',
            name='preferences_jsonb',
            field=models.JSONField(blank=True, default=list, null=True),
        ),
    ]
