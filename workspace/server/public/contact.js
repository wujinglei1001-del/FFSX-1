import { query } from '../db/index.js';

const requiredText = (value, field, max) => {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > max) {
    const error = new Error(`invalid_${field}`);
    error.status = 400;
    throw error;
  }

  return value.trim();
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const createContactRequest = async (req, res) => {
  const firstName = requiredText(req.body?.firstName, 'first_name', 200);
  const lastName = requiredText(req.body?.lastName, 'last_name', 200);
  const email = requiredText(req.body?.email, 'email', 320).toLowerCase();
  const phone = requiredText(req.body?.phone, 'phone', 80);
  const company = requiredText(req.body?.company, 'company', 300);
  const purpose = requiredText(req.body?.purpose, 'purpose', 5000);
  const topic = req.body?.topic === 'subscription' ? 'subscription' : 'general';
  const locale =
    typeof req.body?.locale === 'string' && req.body.locale.trim().length <= 20
      ? req.body.locale.trim()
      : null;

  if (!emailPattern.test(email) || req.body?.policyAccepted !== true) {
    return res.status(400).json({ error: 'invalid_contact_request' });
  }

  const result = await query(
    `INSERT INTO ffax_contact_request
      (first_name,last_name,email,phone,company,purpose,topic,locale,consent_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,now())
     RETURNING id,status,created_at`,
    [firstName, lastName, email, phone, company, purpose, topic, locale],
  );

  res.status(201).set('Cache-Control', 'no-store').json({ data: result.rows[0] });
};
