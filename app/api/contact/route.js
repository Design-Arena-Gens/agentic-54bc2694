export async function POST(request) {
  const contentType = request.headers.get('content-type') || '';
  let body = {};
  if (contentType.includes('application/json')) {
    body = await request.json();
  } else if (contentType.includes('application/x-www-form-urlencoded')) {
    const form = await request.formData();
    body = Object.fromEntries(form);
  } else {
    try {
      const form = await request.formData();
      body = Object.fromEntries(form);
    } catch {}
  }

  const { name, phone, email, service, message } = body;
  const ok = Boolean(name && phone && email && service);

  // In a real app, send to CRM or email service here.
  return new Response(JSON.stringify({ ok, received: { name, phone, email, service, message } }), {
    status: ok ? 200 : 400,
    headers: { 'content-type': 'application/json' }
  });
}
