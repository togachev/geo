# Generated by Django 4.0 on 2022-01-24 04:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('geores', '0003_alter_feature_jsonb_data'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feature',
            name='jsonb_data',
            field=models.JSONField(blank=True, default=dict, null=True),
        ),
    ]
