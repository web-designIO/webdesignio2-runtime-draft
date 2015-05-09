node_modules: package.json
	docker-compose run --rm web npm install

install: node_modules

server: install
	docker-compose up -d
	docker attach webdesignio2_web_1
