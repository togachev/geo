# Generated by Django 4.0 on 2021-12-31 00:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('geores', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='feature',
            old_name='lesnichestvo',
            new_name='les',
        ),
        migrations.RenameField(
            model_name='feature',
            old_name='uch_lesnichestvo',
            new_name='uch_les',
        ),
        migrations.RenameField(
            model_name='feature',
            old_name='urochishe',
            new_name='uroch',
        ),
    ]
