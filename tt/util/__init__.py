# coding: utf-8
import string,random


def make_password(min_length=6, max_length=10):
    length = random.randint(min_length, max_length)
    letters = string.ascii_letters+string.digits
    return ''.join([random.choice(letters) for _ in range(length)])

if __name__ == "__main__":
    print make_password(6, 10)
