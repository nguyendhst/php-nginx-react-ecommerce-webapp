FROM mysql:8.0
COPY /sql/ /docker-entrypoint-initdb.d/

