import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { registerLicense } from '@syncfusion/ej2-base';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

registerLicense('Ngo9BigBOggjHTQxAR8/V1NGaF1cXGNCd0x0Qnxbf1xzZFxMYVhbR3NPMyBoS35RdUVrW3deeXVQRmBYV0Jz');