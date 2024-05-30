.DEFAULT_GOAL := build

build:
	sh scripts/build.sh

install:
	sh scripts/install.sh

start:
	sh scripts/start.sh