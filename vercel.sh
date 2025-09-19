#!/bin/bash

npm i -g vercel
vercel login
vercel --prod
vercel dev