# Generated by Django 4.1.7 on 2023-03-20 20:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='fight',
            old_name='player1',
            new_name='host',
        ),
        migrations.RenameField(
            model_name='fight',
            old_name='player2',
            new_name='opponent',
        ),
        migrations.AddField(
            model_name='fight',
            name='section',
            field=models.CharField(default='all', max_length=50),
        ),
    ]
