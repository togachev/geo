# Generated by Django 4.0 on 2022-01-09 15:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('geores', '0026_alter_feature_jsonb_data'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feature',
            name='jsonb_data',
            field=models.JSONField(blank=True, default=list, null=True),
        ),
    ]