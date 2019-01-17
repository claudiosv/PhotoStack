#PhotoStack PYTHON image
# References: 
# [1] http://flask.pocoo.org/docs/1.0/installation/#virtual-environments

FROM tensorflow/tensorflow:latest-py3

WORKDIR /usr/src/python_server

# RUN python3 -m venv venv && . venv/bin/activate

COPY requirements.txt ./

#Install modules
RUN pip3 install --no-cache-dir -r requirements.txt
RUN pip3 install --no-cache-dir https://github.com/OlafenwaMoses/ImageAI/releases/download/2.0.2/imageai-2.0.2-py3-none-any.whl
# RUN pip3 install --ignore-installed --upgrade https://github.com/lakshayg/tensorflow-build/releases/download/tf1.12.0-macOS-mojave-ubuntu16.04-py2-py3/tensorflow-1.12.0-cp35-cp35m-linux_x86_64.whl

ENTRYPOINT [ "python3", "engine.py" ]
# ENTRYPOINT [ "/bin/sh" ]
# ENTRYPOINT watchmedo shell-command -p "*.py" -c 'python3 engine.py'