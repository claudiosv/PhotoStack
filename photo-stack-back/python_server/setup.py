from setuptools import setup 

with open("README", 'r') as f:
    long_description = f.read()

setup(
   name='photoengine',
   version='1.0',
   description='Photo processing engine for PhotoStack',
   license="MIT",
   long_description=long_description,
   author='Claudio Spiess and Riccardo Felluga',
   packages=['photoengine'],  #same as name
   install_requires=['minio', 'redis'], #external packages as dependencies
)