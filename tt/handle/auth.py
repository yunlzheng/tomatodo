# coding: utf-8
from .base import Base
from tt.model.user import User
from tt.util import make_password
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
        user = User.objects(email=email)
        if user:
            errors.append('email already.')

        if errors:
            self.redirect(self.get_sigup_url(), errors)
            return

        user = User(email=email, password=make_password(), name=email)
        user.save()
        self.set_secure_cookie('email', email)
        self.redirect('/')
