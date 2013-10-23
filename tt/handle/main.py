# coding: utf-8
from .base import Base
__author__ = 'zheng'


class MainHandler(Base):

    def get(self):
        self.render('application.html')