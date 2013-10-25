# coding: utf-8
from .base import Base
__author__ = 'zheng'


class LoginHandler(Base):

    def get(self):
        self.render("login.html")


class LogoutHandler(Base):

    def get(self):
        self.clear_all_cookies()
        self.redirect('/')


class RegisterHandler(Base):

    def get(self):
        self.render("regist.html")

    def post(self):
        errors = []
        email = self.get_argument('email', None)
        #未输入邮箱地址
        if not email:
            errors.append('reqired field email.')
        if errors:
            self.redirect(self.get_sigup_url(), errors)
        self.set_secure_cookie('email', email)
        self.redirect('/')
