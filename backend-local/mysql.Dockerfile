FROM mysql:8.0
COPY /sql/ /docker-entrypoint-initdb.d/
CMD ["mysqld", "--character-set-server=utf16", "--collation-server=utf16_unicode_ci", "--init-connect='SET NAMES UTF16;'"]