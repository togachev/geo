# Generated by Django 4.0 on 2022-01-10 10:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('geores', '0044_remove_feature_les_name_remove_feature_uch_les_name_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='feature',
            old_name='type_les',
            new_name='type_data',
        ),
    ]
