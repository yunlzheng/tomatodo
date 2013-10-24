# coding: utf-8
import tornado.web
from .base import Base
__author__ = 'zheng'


class MainHandler(Base):

    @tornado.web.authenticated
    def get(self):
        self.render('application.html')

