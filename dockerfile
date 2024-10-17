FROM oven/bun:1
WORKDIR /app
COPY . .

# Install dependencies
RUN bun install

# Build the Next.js app
RUN bun run build

ARG PORT
EXPOSE ${PORT:-3000}

# Start the Next.js server using Bun
CMD ["bun", "run", "start"]
