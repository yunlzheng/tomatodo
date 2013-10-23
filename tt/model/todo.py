# -*- coding : utf-8 -*-
from datetime import datetime
from mongoengine import *


class Todo(Document):
    title = StringField(required=True, default="")
    completed =BooleanField(required=True, default=False)
    created_at = DateTimeField(required=True, default=datetime.now())
    completed_at = DateTimeField(required=False)
