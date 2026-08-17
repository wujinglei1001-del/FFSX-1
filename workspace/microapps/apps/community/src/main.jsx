import { useState } from 'react';
import { createMicroAppLifecycle } from '../../../shared/microapp.jsx';
import '../../../shared/styles.css';
import { usePlatformData } from '../../../shared/usePlatformData.js';

const fallbackDemands = [];

const CommunityApp = ({ platform }) => {
  const {
    data: demands,
    setData: setDemands,
    loading,
    error,
  } = usePlatformData(platform, '/v1/demands?limit=30', fallbackDemands);
  const [form, setForm] = useState({ title: '', description: '' });
  const [submitting, setSubmitting] = useState(false);

  const publish = async (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.description.trim() || !platform?.apiRequest) return;
    setSubmitting(true);
    try {
      const created = await platform.apiRequest('/v1/demands', {
        method: 'POST',
        body: JSON.stringify({ ...form, status: 'published', customFields: {} }),
      });
      setDemands((current) => [created, ...current]);
      setForm({ title: '', description: '' });
      platform.notify?.({ type: 'success', message: '贸易需求已发布' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="ffax-micro">
      <header className="ffax-micro-header">
        <div>
          <span className="ffax-badge">可信准入社区</span>
          <h1>需求、议价与企业连接</h1>
          <p>需求发布、收藏、报价、还价、会话、评价和举报形成完整协作闭环。</p>
        </div>
      </header>
      {error ? <p className="ffax-error">社区数据暂时不可用。</p> : null}
      <section className="ffax-grid">
        <article className="ffax-card">
          <h2>发布贸易需求</h2>
          <form className="ffax-form" onSubmit={publish}>
            <input
              className="ffax-field"
              aria-label="需求标题"
              placeholder="需求标题"
              value={form.title}
              onChange={(e) => setForm((current) => ({ ...current, title: e.target.value }))}
            />
            <textarea
              className="ffax-field"
              aria-label="需求说明"
              rows="5"
              placeholder="说明品类、地区、数量和履约要求"
              value={form.description}
              onChange={(e) => setForm((current) => ({ ...current, description: e.target.value }))}
            />
            <button className="ffax-button" disabled={submitting} type="submit">
              {submitting ? '发布中…' : '发布需求'}
            </button>
          </form>
        </article>
        <article className="ffax-card ffax-card-wide">
          <h2>企业需求</h2>
          <div className="ffax-list">
            {loading ? (
              <p>正在加载…</p>
            ) : demands.length === 0 ? (
              <p>暂无需求，您可以发布第一条。</p>
            ) : (
              demands.map((demand) => (
                <div key={demand.id} className="ffax-list-row">
                  <div>
                    <strong>{demand.title}</strong>
                    <p>{demand.description}</p>
                  </div>
                  <span className="ffax-badge">{demand.status}</span>
                </div>
              ))
            )}
          </div>
        </article>
      </section>
    </main>
  );
};

const lifecycle = createMicroAppLifecycle(CommunityApp);
export const { bootstrap, mount, unmount, update } = lifecycle;
if (!window.__POWERED_BY_QIANKUN__) mount({ container: document });
