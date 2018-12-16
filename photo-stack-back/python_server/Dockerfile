#PhotoStack PYTHON image
# References: 
# [1] http://flask.pocoo.org/docs/1.0/installation/#virtual-environments

FROM python:latest

WORKDIR /usr/src/python_server

# Create virtual env [1]
RUN python3 -m venv venv && . venv/bin/activate

COPY requirements.txt ./

#Install modules
RUN pip3 install --no-cache-dir -r requirements.txt

ENTRYPOINT [ "python3", "engine.py" ]
