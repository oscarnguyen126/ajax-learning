from django.shortcuts import render
from django.utils.translation import gettext as _
from django.utils.translation import get_language, activate


def home(request):
    trans = translate(language='en')
    return render(request, 'home.html', {'trans': trans})


def translate(language):
    cur_language = get_language()
    try:
        activate(language)
        text = _('xin chào')
    finally:
        activate(cur_language)
    return text
