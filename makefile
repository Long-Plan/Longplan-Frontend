REMOTE_HOST=longplan@10.10.182.135
APP_NAME=longplan-frontend

build-deploy:
	docker build --platform linux/amd64 -t ${APP_NAME} .
	docker save ${APP_NAME} > ${APP_NAME}.tar
	docker rmi ${APP_NAME}
	scp ./${APP_NAME}.tar ${REMOTE_HOST}:/home/longplan/
	rm ./${APP_NAME}.tar
	ssh -t ${REMOTE_HOST} 'sudo docker rm $$(sudo docker ps -aqf "name=${APP_NAME}") -f \
    &&  sudo docker rmi $$(sudo docker images -aqf "reference=${APP_NAME}") \
    &&  sudo docker load < /home/longplan/${APP_NAME}.tar \
    &&  rm /home/longplan/${APP_NAME}.tar \
    &&  sudo docker run -d -p 3000:80 --name ${APP_NAME} ${APP_NAME}'
init-deploy:
	docker build --platform linux/amd64 -t ${APP_NAME} .
	docker save ${APP_NAME} > ${APP_NAME}.tar
	docker rmi ${APP_NAME}
	scp ./${APP_NAME}.tar ${REMOTE_HOST}:/home/longplan/
	rm ./${APP_NAME}.tar
	ssh -t ${REMOTE_HOST} 'sudo docker load < /home/longplan/${APP_NAME}.tar \
    &&  rm /home/longplan/${APP_NAME}.tar \
    &&  sudo docker run -d -p 3000:80 --name ${APP_NAME} ${APP_NAME}'