# About

Debugging redis connection errors with BullMQ. I was getting:

```
[ioredis] Unhandled error event: Error: connect ECONNREFUSED 127.0.0.1:6379
    at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1146:16)
```

Note that the port `6379` is not the port provided in `REDIS_URL`.

This is because the `QueueEvents` constructor requires `connection` options. This seems obvious in retrospect, but it's not mentioned in the docs. 

The API docs mention that option, but it's tucked away in [`QueueEvents.(constructor)`](https://github.com/taskforcesh/bullmq/blob/57b37ea886c9d86912f49d2d8d77cf3f97eda265/docs/gitbook/api/bullmq.queueevents._constructor_.md) --> [`QueueEventsOptions interface`](https://github.com/taskforcesh/bullmq/blob/57b37ea886c9d86912f49d2d8d77cf3f97eda265/docs/gitbook/api/bullmq.queueeventsoptions.md) --> [`QueueBaseOptions interface`](https://github.com/taskforcesh/bullmq/blob/57b37ea886c9d86912f49d2d8d77cf3f97eda265/docs/gitbook/api/bullmq.queuebaseoptions.md)

## Requirements

- A local redis server running on a non-standard port. 5555 is used in this demo.
- Node.js v14+ (for esm support)

## Getting started

- `npm install`
- `npm run start`

## Output 

```
❯ npm run start

> bull-redis@1.0.0 start /Users/mike/d/temp/bull-redis
> REDIS_URL=redis://127.0.0.1:5555 node index.js

redis is:  ready
```