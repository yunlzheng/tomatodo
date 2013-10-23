# coding: utf-8
import os
from os.path import abspath, dirname
import tornado.web
import tornado.httpserver
import tornado.ioloop
from tornado.log import app_log
from tornado.options import define, options

from tt.handle import MainHandler

PROJECT_DIR = dirname(dirname(abspath(__file__)))
TEMPLATE_DIR = os.path.join(PROJECT_DIR, 'templates')
STATIC_DIR = os.path.join(PROJECT_DIR, 'static')
CONF_DIR = os.path.join(PROJECT_DIR, 'conf')
CONF_FILE = CONF_DIR+os.path.sep+"application.conf"


define("debug", default=True, type=bool)
define("port", default=8181, type=int)


class Application(tornado.web.Application):

    def __init__(self):

        handlers = {
            (r'/', MainHandler),
        }

        settings = dict(
            template_path=TEMPLATE_DIR,
            static_path=STATIC_DIR,
            login_url="/",
            debug=options.debug,
            cookie_secret="123456"
        )
        tornado.web.Application.__init__(self, handlers, **settings)


def run():
    tornado.options.parse_command_line()
    tornado.options.parse_config_file(CONF_FILE)
    port = os.environ.get("PORT", options.port)
    http_server = tornado.httpserver.HTTPServer(Application())
    http_server.listen(port)
    app_log.info("application run on {0}".format(port))
    tornado.ioloop.IOLoop.instance().start()