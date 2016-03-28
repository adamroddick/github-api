FROM ubuntu:14.04

RUN apt-get update \
	&& apt-get install -y apache2 \
	&& apt-get install -y vim \
	$$ apt-get clean

EXPOSE 80

CMD ["apache2ctl","-D","FOREGROUND"]
