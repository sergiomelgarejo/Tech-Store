# Generated by Django 3.0.6 on 2020-08-02 18:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0003_customer_spell_check'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='categorie',
            field=models.CharField(choices=[('SMARTPHONES', 'Smartphones'), ('ELECTRONICS', 'Electronics'), ('COMPUTERS', 'Computers'), ('VIDEOGAMES', 'Videogames')], default=False, max_length=12),
        ),
    ]
