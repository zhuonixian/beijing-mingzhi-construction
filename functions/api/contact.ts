interface Env {
  FEISHU_APP_ID: string;
  FEISHU_APP_SECRET: string;
  FEISHU_CHAT_ID: string;
  FEISHU_AT_USER_ID?: string;
}

interface ContactPayload {
  name: string;
  phone?: string;
  email?: string;
  message: string;
}

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  record.count++;
  return record.count > 5;
}

function validateInput(data: ContactPayload): string | null {
  if (!data.name || data.name.trim().length === 0 || data.name.length > 50) {
    return '请输入有效的姓名（1-50字符）';
  }
  if (!data.message || data.message.trim().length === 0 || data.message.length > 2000) {
    return '请输入有效的留言内容（1-2000字符）';
  }
  if (data.phone && !/^[\d\s\-+()]{5,20}$/.test(data.phone)) {
    return '电话格式不正确';
  }
  if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) {
    return '邮箱格式不正确';
  }
  return null;
}

async function getFeishuToken(appId: string, appSecret: string): Promise<string> {
  const resp = await fetch('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ app_id: appId, app_secret: appSecret }),
  });
  const data = await resp.json() as any;
  if (data.code !== 0) throw new Error(`Token error: ${data.msg}`);
  return data.tenant_access_token;
}

async function sendFeishuMessage(token: string, chatId: string, text: string): Promise<void> {
  const resp = await fetch('https://open.feishu.cn/open-apis/im/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      receive_id: chatId,
      msg_type: 'text',
      content: JSON.stringify({ text }),
    }),
    params: { receive_id_type: 'chat_id' },
  });
  const data = await resp.json() as any;
  if (data.code !== 0) throw new Error(`Send error: ${data.msg}`);
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': new URL(context.request.url).origin,
  };

  // CSRF check
  const origin = context.request.headers.get('Origin') || '';
  const referer = context.request.headers.get('Referer') || '';
  const allowedOrigin = new URL(context.request.url).origin;
  if (origin && origin !== allowedOrigin && referer && !referer.startsWith(allowedOrigin)) {
    return new Response(JSON.stringify({ ok: false, message: '请求来源验证失败' }), { status: 403, headers: corsHeaders });
  }

  // Rate limit
  const ip = context.request.headers.get('CF-Connecting-IP') || 'unknown';
  if (isRateLimited(ip)) {
    return new Response(JSON.stringify({ ok: false, message: '请求过于频繁，请稍后重试' }), { status: 429, headers: corsHeaders });
  }

  // Parse body
  let data: ContactPayload;
  try {
    data = await context.request.json() as ContactPayload;
  } catch {
    return new Response(JSON.stringify({ ok: false, message: '请求数据格式错误' }), { status: 400, headers: corsHeaders });
  }

  // Validate
  const validationError = validateInput(data);
  if (validationError) {
    return new Response(JSON.stringify({ ok: false, message: validationError }), { status: 400, headers: corsHeaders });
  }

  // Send to Feishu
  try {
    const { FEISHU_APP_ID, FEISHU_APP_SECRET, FEISHU_CHAT_ID, FEISHU_AT_USER_ID } = context.env;
    if (!FEISHU_APP_ID || !FEISHU_APP_SECRET || !FEISHU_CHAT_ID) {
      return new Response(JSON.stringify({ ok: false, message: '留言服务暂未配置' }), { status: 500, headers: corsHeaders });
    }

    const token = await getFeishuToken(FEISHU_APP_ID, FEISHU_APP_SECRET);
    const atPart = FEISHU_AT_USER_ID ? `@user_${FEISHU_AT_USER_ID}` : '@所有人';
    const now = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });

    const text = [
      `${atPart} 📬 铭挚建筑官网收到新留言`,
      '',
      `👤 姓名：${data.name}`,
      data.phone ? `📱 电话：${data.phone}` : '',
      data.email ? `📧 邮箱：${data.email}` : '',
      '',
      `💬 留言：${data.message}`,
      '',
      `🕐 时间：${now}`,
    ].filter(Boolean).join('\n');

    await sendFeishuMessage(token, FEISHU_CHAT_ID, text);

    return new Response(JSON.stringify({ ok: true, message: '留言提交成功' }), { status: 200, headers: corsHeaders });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, message: '提交失败，请稍后重试' }), { status: 500, headers: corsHeaders });
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
