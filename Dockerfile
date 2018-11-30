FROM nginx:alpine

COPY build /usr/share/nginx/html

COPY conf/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

ENTRYPOINT [ "nginx" ]