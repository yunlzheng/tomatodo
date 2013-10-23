# coding: utf-8
import tornado.web
__author__ = 'zheng'


class Base(tornado.web.RequestHandler):
    def get_current_user(self):
        pass