# coding: utf-8
from datetime import datetime
from mongoengine import *
from .user import User


class Tomato(Document):
    title = StringField(required=True, default="")
    created_at = DateTimeField(required=True, default=datetime.now())
    user = ReferenceField(User, reverse_delete_rule=CASCADE)