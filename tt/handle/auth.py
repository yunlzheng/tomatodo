# coding: utf-8
from .base import Base
__author__ = 'zheng'


class LoginHandler(Base):

    def get(self):
        self.render("login.html")