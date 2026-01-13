from django.db import models

class ObservationUnit(models.Model):
    name = models.CharField(max_length=200)


class Protocol(models.Model):
    name = models.CharField(max_length=200)