# coding: utf-8
from datetime import datetime
from mongoengine import *


class Tomoto(Document):
    title = StringField(required=True, default="")
    created_at = DateTimeField(required=True, default=datetime.now())
