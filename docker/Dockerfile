# Date: 2023-04-07
# Version: 1.0

# Set the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json file to the working directory inside the container
COPY package.json .

# Set the environment variables
ENV ACCEPT_EULA=Y

# Install system dependencies
RUN apt-get update -y && apt-get update \
  && apt-get install -y --no-install-recommends curl gcc g++ gnupg unixodbc-dev

# Install MySQL ODBC driver
ADD https://dev.mysql.com/get/Downloads/Connector-ODBC/8.0/mysql-connector-odbc-8.0.26-linux-glibc2.12-x86-64bit.tar.gz .
RUN tar -C . -xzvf mysql-connector-odbc-8.0.26-linux-glibc2.12-x86-64bit.tar.gz
RUN cd mysql-connector-odbc-8.0.26-linux-glibc2.12-x86-64bit \
  && cp -r lib/* /usr/local/lib \
  && cp -r bin/* /usr/local/bin \
  && myodbc-installer -a -d -n "MySQL ODBC 8.0 Driver" -t "Driver=/usr/local/lib/libmyodbc8w.so" \
  && myodbc-installer -a -d -n "MySQL ODBC 8.0" -t "Driver=/usr/local/lib/libmyodbc8a.so"

# Install Node.js dependencies
RUN npm install

# Copy the rest of the code to the working directory inside the container
COPY . .

# Set the port that the application will be exposed on
EXPOSE 3000

# Set the default command to be executed when the container is started
CMD ["npm", "run", "dev"]
