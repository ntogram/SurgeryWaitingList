# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Set environment variables
ENV FLASK_APP=app.py
ENV FLASK_ENV=development




# Make port 5000 available to the world outside this container
EXPOSE 5000

# Run the application
CMD ["python", "app.py"]