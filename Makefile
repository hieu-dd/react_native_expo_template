run:
	cp .env.staging.sample .env
	npx expo start

lint:
	yarn lint:fix

format:
	yarn format
	yarn lint:fix