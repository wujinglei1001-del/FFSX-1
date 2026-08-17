import { useEffect, useMemo, useState } from 'react';
import { createMicroAppLifecycle } from '../../../shared/microapp.jsx';
import '../../../shared/styles.css';
import { usePlatformData } from '../../../shared/usePlatformData.js';

const fallbackDemands = [];

const MarketplaceApp = ({ platform }) => {
  const [sso, setSso] = useState({ state: 'connecting', token: null });
  const { data: status } = usePlatformData(platform, '/v1/marketplace/status', {});
  const {
    data: demands,
    loading,
    error,
  } = usePlatformData(platform, '/v1/demands?status=published&limit=12', fallbackDemands);
  const tenantLabel = useMemo(
    () => (platform?.tenantId ? `企业 ${platform.tenantId.slice(0, 8)}` : '当前企业'),
    [platform?.tenantId],
  );
  useEffect(() => {
    let active = true;
    const connect = async () => {
      if (!platform?.marketplaceRequest) {
        if (active) setSso({ state: 'unavailable', token: null });
        return;
      }
      const actorType = platform.roles?.some((role) =>
        ['seller', 'tenant-admin', 'marketplace-admin', 'admin'].includes(role),
      )
        ? 'member'
        : 'customer';
      try {
        const response = await platform.marketplaceRequest(`/auth/${actorType}/zitadel`, {
          method: 'POST',
        });
        if (active)
          setSso({
            state: response?.token ? 'connected' : 'unavailable',
            token: response?.token || null,
          });
      } catch {
        if (active) setSso({ state: 'unavailable', token: null });
      }
    };
    connect();
    return () => {
      active = false;
    };
  }, [platform]);
  return (
    <main className="ffax-micro">
      <header className="ffax-micro-header">
        <div>
          <span className="ffax-badge">跨境电商 · Mercur 交易核心</span>
          <h1>需求市场</h1>
          <p>集中展示真实采购、物流、仓储、清关与企业服务需求，并承接报价和履约。</p>
        </div>
        <div className="ffax-badge">{tenantLabel}</div>
      </header>
      {error ? <p className="ffax-error">市场数据暂时不可用。</p> : null}
      <section className="ffax-grid">
        <article className="ffax-card">
          <h2>市场连接状态</h2>
          <div className="ffax-list">
            <div className="ffax-list-row">
              <span>Mercur API</span>
              <span className="ffax-badge">{status?.baseUrl ? '已配置' : '待配置'}</span>
            </div>
            <div className="ffax-list-row">
              <span>ZITADEL 单点登录</span>
              <span className="ffax-badge">
                {sso.state === 'connected'
                  ? '已连接'
                  : sso.state === 'connecting'
                    ? '连接中'
                    : '暂不可用'}
              </span>
            </div>
            <div className="ffax-list-row">
              <span>真实资金扣款</span>
              <span className="ffax-badge">
                {status?.paymentsEnabled ? '已启用' : 'KYC 后启用'}
              </span>
            </div>
          </div>
        </article>
        <article className="ffax-card ffax-card-wide">
          <h2>最新贸易需求</h2>
          <div className="ffax-list">
            {loading ? (
              <p>正在加载…</p>
            ) : demands.length === 0 ? (
              <p>暂无已发布需求。</p>
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

const lifecycle = createMicroAppLifecycle(MarketplaceApp);
export const { bootstrap, mount, unmount, update } = lifecycle;
if (!window.__POWERED_BY_QIANKUN__) mount({ container: document });
