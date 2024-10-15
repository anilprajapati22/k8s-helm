# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /usr/src/app

COPY requirements.txt requirements.txt

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt


# Copy the current directory contents into the container
COPY . .


# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define environment variable for Flask
ENV FLASK_APP=app.py

# Set environment variables for MongoDB URL and Flask port
# ENV MONGO_DB_URL=mongodb://192.168.1.2:27017/my-database
ENV PORT=80

# Run the application when the container launches
CMD ["python", "app.py"]
