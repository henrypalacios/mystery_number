current-dir := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))
SHELL = /bin/sh

.PHONY: build
build: 
	@echo "📃️ Compiling a contract..." && truffle compile
	cd client-app && make build
	
start:
	@echo "🚀 Compile, Migrate and Deploy!!!"
	make update-contract
	cd client-app && make npm/install && make npm/start

.PHONY: test
test:
	@echo "🏃 Running tests"
	truffle test

update-contract:
	truffle migrate
	cp ./build_contract/contracts/Gaming.json ./client-app/src/contracts-api/artifacts/Gaming.json
