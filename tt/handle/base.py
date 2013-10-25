# coding: utf-8
import tornado.web
__author__ = 'zheng'


class Base(tornado.web.RequestHandler):

    def get_current_user(self):
        return self.get_secure_cookie('email')

    def get_sigup_url(self):
        return self.settings['regist_url']