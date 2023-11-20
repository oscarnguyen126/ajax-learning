from django.shortcuts import render
from .serializers import TodoSerializer
from .models import Todo
from rest_framework import viewsets
from django.http import JsonResponse


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer


def index(request, *args, **kwargs):
    todos = Todo.objects.all()[0:5]
    total = Todo.objects.count()
    return render(request, 'index.html', {'todos': todos, 'total': total})


def load_more(request):
    total_todo = int(request.GET.get('total_todo'))
    limit = 2
    todos = list(Todo.objects.values()[total_todo:total_todo+limit])
    data = {
        'todos': todos
    }
    return JsonResponse(data=data)