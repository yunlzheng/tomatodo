# -*- coding : utf-8 -*-
from datetime import datetime
from mongoengine import *


class User(Document):
    name = StringField(required=True, min_length=1)
    email = EmailField(required=True, default=False)
    password = StringField(required=True, min_length=6)
    created_at = DateTimeField(required=True, default=datetime.now())
