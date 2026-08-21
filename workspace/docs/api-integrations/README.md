# FFA-X API 架构报告门禁

每次新增、删除或修改 API、连接器、事件通道、数据库边界、鉴权、同步协议、网关、部署拓扑时，必须同步更新一份报告清单并生成报告。

报告必须包含：详细功能介绍、Mermaid 架构图、API 清单、关键数据流、故障隔离、依赖和许可证、已完成内容、详细变更日志、后续任务、验收标准、安全边界和回滚说明。

## 强制流程

1. 复制或更新 `docs/api-integrations/manifests/` 中对应的 JSON 清单。
2. 生成报告：

   ```powershell
   npm run api:report -- docs/api-integrations/manifests/<文件>.json
   ```

3. 报告会同时写入：

   - 主线：`docs/api-integrations/reports/`
   - 公司资料：`C:\Users\Administrator\Desktop\FFAX公司信息`

4. `npm run build` 会自动执行 `api:report:check`。如果架构源码与最近报告的 SHA-256 指纹不一致，构建会停止。
5. 正式部署脚本在启动和切换服务前执行同一门禁；服务器端不要求存在 Windows 桌面副本，但必须包含主线报告。

## 禁止事项

- 报告不得写入密码、Token、私钥、API Key、客户端密钥或 `.env` 内容。
- 不得手工修改 `latest.json` 绕过门禁。
- 不得只更新架构图而省略后续任务、阻塞条件和验收标准。
- 不得把未来规划写成已经上线的能力。
