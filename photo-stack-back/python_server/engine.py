import redis
import json
from minio import Minio
from minio.error import ResponseError
from imageai.Prediction import ImagePrediction
import os
import time

def objdetection_handler(message):
    print('Object detection task received: ', message['data'])
    data = json.loads(message['data'])
    print(data);
    if(data["type"] != "todo"):
        return

    execution_path = os.getcwd()
    minioClient = Minio('minio:9000',
                        access_key='minio',
                        secret_key='minio123',
                        secure=False)
    img_path = os.path.join(execution_path, "tmp", data['object_id'])
    minioClient.fget_object('photostack', data['object_id'], img_path, request_headers=None)
    prediction = ImagePrediction()
    prediction.setModelTypeAsSqueezeNet()
    prediction.setModelPath(os.path.join(execution_path, "squeezenet_weights_tf_dim_ordering_tf_kernels.h5"))
    prediction.loadModel()
    predictions, probabilities = prediction.predictImage(img_path, result_count=3)
    pred_list = list()

    for eachPrediction, eachProbability in zip(predictions, probabilities):
        if eachProbability > 0:
           pred_list.append(eachPrediction)
    result = { 'type': "done", "photo_id": data['photo_id'], "object_id": data['object_id'], "objects": pred_list }
    json_string = json.dumps(result)
    r = redis.Redis(host='redis', port=6379)
    r.publish('objdetection', json_string)

def main():
    print("Engine started")
    r = redis.Redis(host='redis', port=6379, charset="utf-8", decode_responses=True)
    p = r.pubsub()
    p.subscribe(**{'objdetection': objdetection_handler})
    thread = p.run_in_thread(sleep_time=0.001)

if __name__ == "__main__":
    main()
