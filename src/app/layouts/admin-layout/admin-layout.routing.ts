import { ItemComponent } from './../../pages/nota/conferencia/item/item.component';

import { NotaComponent } from './../../pages/nota/nota.component';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';

import { ConferenciaComponent } from 'src/app/pages/nota/conferencia/conferencia.component';
import { AuthGuard } from '../../auth.guard';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthGuard] },
    {path : 'conferencia',    component:ItemComponent, canActivate: [AuthGuard] },
    {path : 'conferencia/:codigo',    component:ItemComponent , canActivate: [AuthGuard]},
    {path : 'conferencia/:codigo/:filialId',    component:ItemComponent, canActivate: [AuthGuard]},
    { path: 'notas',          component: NotaComponent, canActivate: [AuthGuard]},
    { path: 'notas/:notaId',      component: ConferenciaComponent , canActivate: [AuthGuard]},
    { path: 'notas/filial/:idFilial',          component: NotaComponent, canActivate: [AuthGuard]}
    
   
   
];
