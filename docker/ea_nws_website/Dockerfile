# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=17.9.1

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

# Set working directory for all build stages.
WORKDIR /usr/src/app

################################################################################
# Create a stage for building the application.
FROM base as frontend_build

ARG REACT_APP_DOMAIN
ENV REACT_APP_DOMAIN $REACT_APP_DOMAIN

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
RUN --mount=type=bind,source=frontend/package.json,target=frontend/package.json \
    --mount=type=bind,source=frontend/package-lock.json,target=frontend/package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --prefix frontend

# Copy the rest of the source files into the image.
COPY frontend frontend
# Run the build script.
RUN npm run build --prefix frontend

################################################################################
# Create a stage for building the application.
FROM base as backend_build

# Copy the rest of the source files into the image.
COPY backend backend

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
RUN --mount=type=bind,source=backend/package.json,target=backend/package.json \
    --mount=type=bind,source=backend/package-lock.json,target=backend/package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --prefix backend

# Run the build script.
RUN npm run build --prefix backend

################################################################################
# Create a stage for building the application.
FROM base as api_build

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
RUN --mount=type=bind,source=api/package.json,target=api/package.json \
    --mount=type=bind,source=api/package-lock.json,target=api/package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --prefix api

# Copy the rest of the source files into the image.
COPY api api

################################################################################
# Create a new stage to run the application with minimal runtime dependencies
# where the necessary files are copied from the build stage.
FROM base as final

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV


# Copy package.json so that package manager commands can be used.
COPY frontend/package.json frontend/
COPY backend/package.json backend/
COPY backend/index.js backend/
COPY api/package.json api/
COPY api/index.ts api/

# Copy the production dependencies from the deps stage and also
# the built application from the build stage into the image.
# frontend
COPY --from=frontend_build /usr/src/app/frontend/node_modules ./frontend/node_modules
COPY --from=frontend_build /usr/src/app/frontend/build ./frontend/build
COPY --from=frontend_build /usr/src/app/frontend/public ./frontend/public
COPY --from=frontend_build /usr/src/app/frontend/src ./frontend/src

# backend
COPY --from=backend_build /usr/src/app/backend/node_modules ./backend/node_modules
COPY --from=backend_build /usr/src/app/backend/bin ./backend/bin
COPY --from=backend_build /usr/src/app/backend/client ./backend/client
COPY --from=backend_build /usr/src/app/backend/server ./backend/server

# api
COPY --from=api_build /usr/src/app/api/node_modules ./api/node_modules
COPY --from=api_build /usr/src/app/api/handlers ./api/handlers
COPY --from=api_build /usr/src/app/api/openapi ./api/openapi

# Expose the port that the application listens on (frontend).
EXPOSE 3000
# Expose the port that the application listens on (backend).
EXPOSE 5000
# Expose the port that the application listens on (api).
EXPOSE 9000

RUN chown -R node /usr/src/app/frontend/node_modules
RUN chown -R node /usr/src/app/backend/node_modules
RUN chown -R node /usr/src/app/api/node_modules

USER node
# Run the application.
COPY docker/start.sh start.sh
CMD ./start.sh
