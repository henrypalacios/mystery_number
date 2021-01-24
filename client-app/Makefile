current-dir := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))
SHELL = /bin/sh

.PHONY: build
build: 
	make npm/install 
	

npm/start:
	@echo "🔌️ Starting React Application..." 
	npm start

npm/install:
	@echo "📦 Installing dependencies in client-app..." 
	npm install

save-the-world:
	@rm -rf node_modules

pull-contract:
		cp ../build_contract/contracts/Gaming.json src/contracts-api/artifacts/Gaming.json
