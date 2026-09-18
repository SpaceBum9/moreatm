/**
 * moreatm.com ATM edge — serve static surface only.
 * No send, no withdraw, no credential storage.
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === "www.moreatm.com") {
      url.hostname = "moreatm.com";
      return Response.redirect(url.toString(), 301);
    }

    if (url.pathname === "/health") {
      return Response.json({
        surface: "atm",
        hold: true,
        execution: "denied",
        proposal_equals_execution: false,
        checked: new Date().toISOString(),
      });
    }

    if (url.pathname === "/api" || url.pathname.startsWith("/api/")) {
      return Response.json(
        {
          status: "hold",
          reason: "ATM surface is observe/document only",
        },
        { status: 403 }
      );
    }

    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response("HOLD moreatm.com", {
      status: 200,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  },
};
