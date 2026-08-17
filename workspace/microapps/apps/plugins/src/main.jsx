import { useState } from 'react';
import { createMicroAppLifecycle } from '../../../shared/microapp.jsx';
import '../../../shared/styles.css';
import { usePlatformData } from '../../../shared/usePlatformData.js';

const fallbackPlugins = [];
const nextAction = {
  available: 'purchase',
  purchased: 'install',
  active: 'disable',
  disabled: 'enable',
  failed: 'retry',
};
const actionLabel = {
  purchase: '获得授权',
  install: '安装',
  enable: '启用',
  disable: '停用',
  retry: '重试',
};

const PluginsApp = ({ platform }) => {
  const {
    data: plugins,
    setData: setPlugins,
    loading,
    error,
  } = usePlatformData(platform, '/v1/plugins', fallbackPlugins);
  const [workingId, setWorkingId] = useState(null);

  const runAction = async (plugin) => {
    const lifecycle = plugin.lifecycle || 'available';
    const action = nextAction[lifecycle];
    if (!action || !platform?.apiRequest) return;
    setWorkingId(plugin.id);
    try {
      const updated =
        action === 'purchase'
          ? await platform.apiRequest(`/v1/plugins/${plugin.id}/purchase`, {
              method: 'POST',
              body: '{}',
            })
          : await platform.apiRequest(`/v1/plugins/${plugin.id}/${action}`, {
              method: 'POST',
              body: '{}',
            });
      setPlugins((current) =>
        current.map((item) => (item.id === plugin.id ? { ...item, ...updated } : item)),
      );
      platform.notify?.({ type: 'success', message: `${plugin.name}：${actionLabel[action]}成功` });
    } finally {
      setWorkingId(null);
    }
  };

  return (
    <main className="ffax-micro">
      <header className="ffax-micro-header">
        <div>
          <span className="ffax-badge">租户插件生命周期</span>
          <h1>企业插件中心</h1>
          <p>购买、安装、启用、停用、升级和失败重试均按当前企业隔离。</p>
        </div>
      </header>
      {error ? <p className="ffax-error">插件目录暂时不可用。</p> : null}
      <section className="ffax-grid">
        {loading ? (
          <p>正在加载…</p>
        ) : (
          plugins.map((plugin) => {
            const lifecycle = plugin.lifecycle || 'available';
            const action = nextAction[lifecycle];
            return (
              <article className="ffax-card" key={plugin.id}>
                <span className="ffax-badge">{lifecycle}</span>
                <h2 style={{ marginTop: 14 }}>{plugin.name}</h2>
                <p>{plugin.description}</p>
                <div className="ffax-list">
                  <div className="ffax-list-row">
                    <span>版本</span>
                    <strong>{plugin.version}</strong>
                  </div>
                  <div className="ffax-list-row">
                    <span>授权</span>
                    <strong>{plugin.price_minor > 0 ? '企业付费' : '免费'}</strong>
                  </div>
                  {action ? (
                    <button
                      className={`ffax-button ${action === 'disable' ? 'ffax-button-secondary' : ''}`}
                      disabled={workingId === plugin.id}
                      onClick={() => runAction(plugin)}
                    >
                      {workingId === plugin.id ? '处理中…' : actionLabel[action]}
                    </button>
                  ) : null}
                </div>
              </article>
            );
          })
        )}
      </section>
    </main>
  );
};

const lifecycle = createMicroAppLifecycle(PluginsApp);
export const { bootstrap, mount, unmount, update } = lifecycle;
if (!window.__POWERED_BY_QIANKUN__) mount({ container: document });
