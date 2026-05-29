// Cloudflare Worker entry for EasyTier WebSocket relay backed by Durable Object
// Module syntax is required for Durable Objects.
import { RelayRoom } from './worker/relay_room.js';
import { serveAdminDashboard } from './admin_html.js';

export { RelayRoom };

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname, searchParams } = url;

    // 1. Health check
    if (pathname === '/healthz') {
      return new Response('ok', { status: 200 });
    }

    // 2. Admin dashboard frontend static asset
    if (pathname === '/' || pathname === '/admin' || pathname === '/admin/') {
      return new Response(serveAdminDashboard, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          // Prevent caching for dynamic updates
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });
    }

    // 3. Admin API routing (all proxied to the central __directory__ Durable Object)
    if (pathname.startsWith('/api/')) {
      const dirStub = env.RELAY_ROOM.get(env.RELAY_ROOM.idFromName('__directory__'));
      return dirStub.fetch(request);
    }

    // 4. WebSocket routing to EasyTier peer rooms
    const wsPath = '/' + (env.WS_PATH || 'ws');
    if (pathname === wsPath || pathname === wsPath + '/') {
      if (request.headers.get('Upgrade') !== 'websocket') {
        return new Response('Expected WebSocket upgrade', { status: 400 });
      }

      const roomId = searchParams.get('room') || 'default';
      
      // Prevent clients from connecting directly to the directory room as a peer
      if (roomId === '__directory__') {
        return new Response('Invalid room name', { status: 400 });
      }

      const options = env.LOCATION_HINT ? { locationHint: env.LOCATION_HINT } : {};
      const roomStub = env.RELAY_ROOM.get(env.RELAY_ROOM.idFromName(roomId), options);
      return roomStub.fetch(request);
    }

    // 5. Fallback 404
    return new Response('Not found', { status: 404 });
  },
};
