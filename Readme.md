# Microservices example using NodeJS

## Build each docker image, push then pull inside minikube

## Start the services
1. Build images
2. Run `skaffold dev`
3. Edit your hosts file and add either the ip in `minikube ip` or `127.0.0.1` to map the url posts.com
4. Go to the posts.com url and use the react frontend

# Description

Using minikube, docker, kubectl and skaffold I created a small example of an application based on the microservices architecture.
Each service has its own yaml file for deployment and service.
There is no storage all posts and comments are saved in memory.

## The app has 4 services:

- The posts service which saves all posts of format `{ id, name }`.
- The comments service which saves all comments of format `{ postId: { id, content, status }}`.
- The moderation service which moderates all comments that have the word "orange" in them.
- The events bus service which intercepts and dispatches events on all services whenever posts are created, moderated or commented on.