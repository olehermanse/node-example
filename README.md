# Node-example

http://node-example.oleherman.com

## Development server

Start the development server:
```
npm run dev-server
```

For development purposes it defaults to port 3000:

http://127.0.0.1:3000

## Containers

### docker

```
docker build --tag node-example .
docker run -p 80:80 --name node-example --rm node-example
```

http://127.0.0.1:80
