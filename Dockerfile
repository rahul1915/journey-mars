FROM node:18.12.0 AS journey-mars

WORKDIR /usr/local/client

# Bundle app source
COPY . .

RUN make build

FROM node:18.12.0 AS journey-mars-server

WORKDIR /usr/local/server/

COPY --from=journey-mars /usr/local/client/server/ ./server/
COPY --from=journey-mars /usr/local/client/build/ ./build/
COPY --from=journey-mars /usr/local/client/scripts/ ./scripts/

EXPOSE 3000

CMD ["./scripts/init.sh"]