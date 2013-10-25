# coding: utf-8
import json
import functools
import tornado.web
from tornado.log import app_log
from tornado.util import import_object
from .base import Base
from tt.model.user import User


def load_model(func):
    """注入一个Model参数给函数."""
    @functools.wraps(func)
    def wrapper(self, *args, **kwargs):
        #setattr(self, 'session', "session")
        print "revice args {0} kwargs {1}".format(args, kwargs)
        model_class = "tt.model.{0}".format(args[0])
        try:
            model = import_object(model_class)
            print "import object {0}".format(model)
            setattr(self, 'model', model)
        except Exception as ex:
            app_log.error(ex)
            print ex
            raise tornado.web.HTTPError(404)
        print 'revice request args: {0} kwargs: {1}'.format(args, kwargs)
        return func(self, *args, **kwargs)
    return wrapper


class BackboneHandler(Base):

    def initialize(self, auth=True):
        self.auth = auth

    def prepare(self):
        if self.auth:
            if not self.get_current_user():
                raise tornado.web.HTTPError(403)

    def encode(self, data):
        return json.dumps(data)

    def decode(self, data):
        return json.loads(data)

    def get(self, *args, **kwargs):
        self.set_header("Content-Type", "application/json; charset=UTF-8")
        if self.is_get_collection(*args):
            self.write(self.encode(self.get_collection(*args)))
        else:
            self.write(self.encode(self.get_model(*args)))

    def post(self, *args,  **kwargs):
        resp = self.encode(self.create_model(*args))
        self.write(resp)

    def put(self, *args,  **kwargs):
        resp = self.encode(self.update_model(*args))
        self.write(resp)

    def delete(self, *args,  **kwargs):
        self.delete_model(*args)

    def is_get_collection(self, *args):
        return len(args) == 1

    def create_model(self, obj, *args):
        raise tornado.web.HTTPError(404)

    def get_collection(self, *args,  **kwargs):
        raise tornado.web.HTTPError(404)

    def get_model(self, *args):
        raise tornado.web.HTTPError(404)

    def update_model(self, obj, *args):
        raise tornado.web.HTTPError(404)

    def delete_model(self, *args):
        raise tornado.web.HTTPError(404)


class MongoBackboneHandler(BackboneHandler):

    def encode(self, data):
        return data.to_json()

    @load_model
    def get_model(self, *args):
        try:
            instance = self.model.objects(id=args[1])[0]
        except Exception as ex:
            app_log.error(ex)
            raise tornado.web.HTTPError(404)
        else:
            return instance

    @load_model
    def get_collection(self, *args, **kwargs):
        params = {}
        if self.current_user:
            user = User.objects(email=self.current_user).first()
            params['user'] = user
        return self.model.objects(**params)

    @load_model
    def delete_model(self, *args):
        try:
            instance = self.model.objects(id=args[1])[0]
            instance.delete()
        except Exception, e:
            raise e
        else:
            return instance

    @load_model
    def create_model(self, *args):
        params = self.decode(self.request.body)
        if self.current_user:
            user = User.objects(email=self.current_user).first()
            params['user'] = user
        obj = self.model(**params)
        obj.save()
        return obj

    @load_model
    def update_model(self, *args):
        obj = self.decode(self.request.body)
        instance = self.model.objects(id=args[1])[0]
        for key in obj:
            print key
            if hasattr(instance, key):
                setattr(instance, key, obj[key])
        instance.save()
        return instance