FROM node:18

WORKDIR /app

COPY package.json .

ENV ACCEPT_EULA=Y

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

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
