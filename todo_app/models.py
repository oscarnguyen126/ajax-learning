from django.db import models


class Todo(models.Model):
    description = models.CharField(max_length=200)
    is_done = models.BooleanField(
        default=True,
        editable=True,
        null=False,
        help_text='trạng thái',
    )

    def __str__(self):
        return self.description
