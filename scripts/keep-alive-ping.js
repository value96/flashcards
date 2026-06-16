// node keep-alive-ping.js https://your-backend-url.com
// PING_INTERVAL_MS=600000 node keep-alive-ping.js https://your-backend-url.com

const DEFAULT_INTERVAL_MS = 12 * 60 * 1000

const baseUrl = process.argv[2] || process.env.PING_BASE_URL
const intervalMs = Number(process.env.PING_INTERVAL_MS || DEFAULT_INTERVAL_MS)

if (!baseUrl) {
  console.error('Usage: node keep-alive-ping.js <backend-url>')
  console.error('Or set PING_BASE_URL=https://your-backend-url.com')
  process.exit(1)
}

if (!Number.isFinite(intervalMs) || intervalMs <= 0) {
  console.error('PING_INTERVAL_MS must be a positive number')
  process.exit(1)
}

const pingUrl = new URL('/ping', baseUrl).toString()

const ping = async () => {
  const startedAt = Date.now()

  try {
    const response = await fetch(pingUrl)
    const durationMs = Date.now() - startedAt

    if (!response.ok) {
      console.error(
        `[${new Date().toISOString()}] ping failed: ${response.status} ${response.statusText} (${durationMs}ms)`,
      )
      return
    }

    console.log(`[${new Date().toISOString()}] ping ok (${durationMs}ms)`)
  } catch (error) {
    console.error(`[${new Date().toISOString()}] ping error:`, error.message)
  }
}

console.log(`Pinging ${pingUrl} every ${intervalMs}ms`)

ping()
setInterval(ping, intervalMs)
