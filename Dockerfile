# Build Stage
FROM node:20-alpine AS build

# Setting working directory
WORKDIR /app

# Copy only dependency files first -- (better caching)
COPY package.json package-lock.json ./

# Clean & reliable install
RUN npm ci

# Copy rest of the project
COPY . .

# Build the Vite app
RUN npm run build


# ----------- Production Stage -----------
FROM nginx:alpine

# Remove default nginx config
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]