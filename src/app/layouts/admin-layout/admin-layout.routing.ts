import { PrecosalteraadosComponent } from './../../pages/precosalteraados/precosalteraados.component';
import { ManualItemComponent } from './../../pages/nota/conferencia-manual/item/item.component';

import { ConferenciaManualComponent } from './../../pages/nota/conferencia-manual/conferencia-manual.component';
import { MenuDashComponent } from './../../pages/menu-dash/menu-dash.component';
import { ItemComponent } from './../../pages/nota/conferencia/item/item.component';

import { NotaComponent } from './../../pages/nota/nota.component';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';

import { ConferenciaComponent } from 'src/app/pages/nota/conferencia/conferencia.component';
import { AuthGuard } from '../../auth.guard';
import { LoteComponent } from 'src/app/pages/lote/lote.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'menu-dash',      component: MenuDashComponent, canActivate: [AuthGuard] },
    { path: 'menu-dash/filial/:idFilial/:filialNome',      component: MenuDashComponent, canActivate: [AuthGuard] },
    {path : 'conferencia',    component:ItemComponent, canActivate: [AuthGuard] },
    {path : 'conferencia/:codigo',    component:ItemComponent , canActivate: [AuthGuard]},
    {path : 'conferencia/:codigo/:filialId',    component:ItemComponent, canActivate: [AuthGuard]},
    { path: 'notas',          component: NotaComponent, canActivate: [AuthGuard]},
    { path: 'notas/manual/filial/:idFilial/:filialNome',          component: ConferenciaManualComponent, canActivate: [AuthGuard]},
    { path: 'notas/conferencia/manual/:idConferencia/:fornecedor',          component: ManualItemComponent, canActivate: [AuthGuard]},
    { path: 'notas/:notaId',      component: ConferenciaComponent , canActivate: [AuthGuard]},
    { path: 'notas/filial/:idFilial',          component: NotaComponent, canActivate: [AuthGuard]},
    { path: 'remarcacao',          component: PrecosalteraadosComponent, canActivate: [AuthGuard]},

    { path: 'lotes',          component: LoteComponent, canActivate: [AuthGuard]},
    { path: 'lotes/filial/:idFilial',          component: LoteComponent, canActivate: [AuthGuard]}
   
   
];
