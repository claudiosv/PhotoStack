import redis
import json
from minio import Minio
from minio.error import ResponseError


def my_handler(message):
    print('MY HANDLER: ', message['data'])


def main():
    print("Hello World!1")
    # print("Hello World!")
    r = redis.Redis(host='redis', port=6379)
    p = r.pubsub()
    # p.subscribe(**{'lowlight': my_handler})
    # thread = p.run_in_thread(sleep_time=0.001)
    p.subscribe('hdr', 'lowlight')
    # print(p.get_message())
    r.publish('hdr', 'some data')
    # for message in p.listen():
    while True:
        message = p.get_message()
        if message:
            print(message)
    # >>>     time.sleep(0.001)  # be nice to the system :)
    minioClient = Minio('minio:9000',
                        access_key='minio',
                        secret_key='minio123',
                        secure=False)


main()
