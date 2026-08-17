import { ModuleProvider, Modules } from '@medusajs/framework/utils';
import ZitadelAuthProviderService from './service';

export default ModuleProvider(Modules.AUTH, {
  services: [ZitadelAuthProviderService],
});
