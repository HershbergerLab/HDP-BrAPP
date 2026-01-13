from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return HttpResponse("This is the transcriptomics index")

def transcriptomics_page(request):
    return