from django.forms import ModelForm, TextInput, Textarea
from geores.models import Res_table


class Res_tableForm(ModelForm):
    class Meta:
        model = Res_table
        # Описываем поля, которые будем заполнять в форме
        fields = ['id', 'name']
