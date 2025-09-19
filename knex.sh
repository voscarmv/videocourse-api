#!/bin/bash

npm install knex -g
knex init
NODE_ENV=development knex migrate:make mig1