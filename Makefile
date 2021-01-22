SHELL = /bin/sh

update-contract:
	truffle migrate
	cp ./build_contract/contracts/Gaming.json ./client-app/src/contracts-api/artifacts/Gaming.json
