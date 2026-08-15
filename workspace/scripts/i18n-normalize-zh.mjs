import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const projectRoot = process.cwd();
const enFile = path.join(projectRoot, 'src', 'locales', 'langs', 'en.json');
const zhFile = path.join(projectRoot, 'src', 'locales', 'langs', 'zh.json');
const en = JSON.parse(fs.readFileSync(enFile, 'utf8'));
const zh = JSON.parse(fs.readFileSync(zhFile, 'utf8'));

const exactTechnicalValue = (value) =>
  /^(?:https?:\/\/|www\.)\S+$/i.test(value) ||
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
  /^[A-Za-z0-9_.+-]+\.(?:com|net|org|io|dev|app|co|docs?|pdf|png|jpe?g|svg|json|tsx?|jsx?|css|html?|zip)$/i.test(
    value,
  ) ||
  /^\d+(?:\.\d+)?px(?:\s*!important)?$/.test(value);

const explicit = new Map([
  ['set_how_you_are_going_to_receive_opt_b6121b8a', '设置您接收 OTP 的方式'],
  ['touch_id_54983019', 'Touch ID'],
  ['shippingdetails_isphysicalproduct_59b632b3', '是否为实物商品'],
  ['ticketpricing_options_7782aaf4', '票价选项'],
  ['ticketpricing_tickettype_afe7ac88', '票种'],
  ['progressweight_subgoals_0115a568', '子目标'],
  ['progressweight_addsubgoal_18de0c4f', '添加子目标'],
  ['powerful_apis_0df425bb', '强大的 API'],
  ['nextjs_16_a94cc4a6', 'Next.js 16'],
  ['whohaventconfirmedemail_43f2e9aa', '尚未确认邮箱的用户'],
  ['whohaventconfirmedphonenumber_6aa152ba', '尚未确认手机号码的用户'],
  ['lorem_ipsum_dolor_sit_amet_consectetur_0a15b7b7', '这是用于预览字体效果的示例文字。'],
  [
    'laboris_nam_asperiores_reiciendis_volutpat_nostrum_v_fdf1df18',
    '创作者在本期节目中分享实践经验、关键发现与后续思考。',
  ],
  [
    'nostrum_laoreet_quis_dolorum_libero_reprehenderit_na_77075364',
    '本期内容围绕真实经历展开，并讨论值得继续关注的问题。',
  ],
  [
    'pulvinar_faucibus_pretium_nascetur_harum_orci_tempor_4f934c5c',
    '这是一段搜索结果摘要，用于展示较长内容在列表中的排版和阅读效果。',
  ],
  [
    'how_to_not_click_on_perfectly_innocent_looking_links_ab207acf',
    '如何避免点击看似正常的链接并下载恶意软件.pdf',
  ],
]);

let normalized = 0;
const visit = (enNode, zhNode, segments = []) => {
  for (const [key, enValue] of Object.entries(enNode)) {
    const zhValue = zhNode[key];
    if (typeof enValue === 'object' && enValue && !Array.isArray(enValue)) {
      visit(enValue, zhValue, [...segments, key]);
      continue;
    }
    if (typeof enValue !== 'string' || typeof zhValue !== 'string') continue;

    let next = zhValue;
    if (exactTechnicalValue(enValue)) next = enValue;
    if (segments.includes('aurora') || key.toLowerCase().includes('aurora')) {
      next = next.replaceAll('Aurora', 'FFA-X').replaceAll('aurora', 'FFA-X');
      next = next.replaceAll('奥罗拉', 'FFA-X').replaceAll('极光', 'FFA-X');
    }
    if (explicit.has(key)) next = explicit.get(key);
    if (next !== zhValue) {
      zhNode[key] = next;
      normalized += 1;
    }
  }
};

visit(en, zh);
fs.writeFileSync(zhFile, `${JSON.stringify(zh, null, 2)}\n`);
process.stdout.write(`${JSON.stringify({ normalized }, null, 2)}\n`);
