import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'button',
                data: { breadcrumb: 'Button' },
                loadChildren: () =>
                    import('./button/buttondemo.module').then(
                        (m) => m.ButtonDemoModule
                    ),
            },
            {
                path: 'actividades',
                data: { breadcrumb: 'actividades' },
                loadChildren: () =>
                    import('./actividades/actividades.module').then(
                        (m) => m.ActividadesModule
                    ),
            },
            {
                path: 'alumnos',
                data: { breadcrumb: 'alumnos' },
                loadChildren: () =>
                    import('./alumnos/alumnos.module').then(
                        (m) => m.AlumnosModule
                    ),
            },
            {
                path: 'grupos',
                data: { breadcrumb: 'grupos' },
                loadChildren: () =>
                    import('./grupos/grupos.module').then(
                        (m) => m.GruposModule
                    ),
            },
            {
                path: 'docentes',
                data: { breadcrumb: 'docentes' },
                loadChildren: () =>
                    import('./docentes/docentes.module').then(
                        (m) => m.DocentesModule
                    ),
            },
            {
                path: 'jefes',
                data: { breadcrumb: 'jefes' },
                loadChildren: () =>
                    import('./jefes/jefes.module').then((m) => m.JefesModule),
            },
            {
                path: 'periodos',
                data: { breadcrumb: 'periodos' },
                loadChildren: () =>
                    import('./periodos/periodos.module').then(
                        (m) => m.PeriodosModule
                    ),
            },
            {
                path: 'evalucaciones',
                data: { breadcrumb: 'evalucaciones' },
                loadChildren: () =>
                    import('./evaluaciones/evaluaciones.module').then(
                        (m) => m.EvaluacionesModule
                    ),
            },
            {
                path: 'encuestas',
                data: { breadcrumb: 'encuestas' },
                loadChildren: () =>
                    import('./encuestas/encuestas.module').then(
                        (m) => m.EncuestasModule
                    ),
            },
            {
                path: 'informes',
                data: { breadcrumb: 'informes' },
                loadChildren: () =>
                    import('./informes/informes.module').then(
                        (m) => m.InformesModule
                    ),
            },
            {
                path: 'boletas',
                data: { breadcrumb: 'boletas' },
                loadChildren: () =>
                    import('./boletas/boletas.module').then(
                        (m) => m.BoletasModule
                    ),
            },
            {
                path: 'liberaciones',
                data: { breadcrumb: 'liberaciones' },
                loadChildren: () =>
                    import('./liberaciones/liberaciones.module').then(
                        (m) => m.LiberacionesModule
                    ),
            },
            {
                path: 'bajas',
                data: { breadcrumb: 'bajas' },
                loadChildren: () =>
                    import('./bajas/bajas.module').then((m) => m.BajasModule),
            },
            {
                path: 'alumnos-admin',
                data: { breadcrumb: 'alumno' },
                loadChildren: () =>
                    import('./alumnos-admin/alumnos.module').then(
                        (m) => m.AlumnosAdminModule
                    ),
            },
            {
                path: 'alumno/datos',
                data: { breadcrumb: 'datos-alumno' },
                loadChildren: () =>
                    import('./alumnos/alumnos.module').then(
                        (m) => m.AlumnosModule
                    ),
            },
            {
                path: 'alumno/encuestas',
                data: { breadcrumb: 'encuestas-alumno' },
                loadChildren: () =>
                    import('./horario-student/horario-student.module').then(
                        (m) => m.HorarioStudentModule
                    ),
            },
            {
                path: 'alumno/horario',
                data: { breadcrumb: 'horario-alumno' },
                loadChildren: () =>
                    import('./encuestas-student/encuestas-student.module').then(
                        (m) => m.EncuestasStudentModule
                    ),
            },

            // { path: 'charts', data: { breadcrumb: 'Charts' }, loadChildren: () => import('./charts/chartsdemo.module').then(m => m.ChartsDemoModule) },
            //  { path: 'file', data: { breadcrumb: 'File' }, loadChildren: () => import('./file/filedemo.module').then(m => m.FileDemoModule) },
            // { path: 'floatlabel', data: { breadcrumb: 'Float Label' }, loadChildren: () => import('./floatlabel/floatlabeldemo.module').then(m => m.FloatlabelDemoModule) },
            // { path: 'formlayout', data: { breadcrumb: 'Form Layout' }, loadChildren: () => import('./formlayout/formlayoutdemo.module').then(m => m.FormLayoutDemoModule) },
            //  { path: 'input', data: { breadcrumb: 'Input' }, loadChildren: () => import('./input/inputdemo.module').then(m => m.InputDemoModule) },
            // { path: 'invalidstate', data: { breadcrumb: 'Invalid State' }, loadChildren: () => import('./invalid/invalidstatedemo.module').then(m => m.InvalidStateDemoModule) },
            // { path: 'list', data: { breadcrumb: 'List' }, loadChildren: () => import('./list/listdemo.module').then(m => m.ListDemoModule) },
            // { path: 'media', data: { breadcrumb: 'Media' }, loadChildren: () => import('./media/mediademo.module').then(m => m.MediaDemoModule) },
            // { path: 'message', data: { breadcrumb: 'Message' }, loadChildren: () => import('./messages/messagesdemo.module').then(m => m.MessagesDemoModule) },
            // { path: 'misc', data: { breadcrumb: 'Misc' }, loadChildren: () => import('./misc/miscdemo.module').then(m => m.MiscDemoModule) },
            // { path: 'overlay', data: { breadcrumb: 'Overlay' }, loadChildren: () => import('./overlays/overlaysdemo.module').then(m => m.OverlaysDemoModule) },
            // { path: 'panel', data: { breadcrumb: 'Panel' }, loadChildren: () => import('./panels/panelsdemo.module').then(m => m.PanelsDemoModule) },
            // { path: 'table', data: { breadcrumb: 'Table' }, loadChildren: () => import('./table/tabledemo.module').then(m => m.TableDemoModule) },
            // { path: 'tree', data: { breadcrumb: 'Tree' }, loadChildren: () => import('./tree/treedemo.module').then(m => m.TreeDemoModule) },
            {
                path: 'menu',
                data: { breadcrumb: 'Menu' },
                loadChildren: () =>
                    import('./menus/menus.module').then((m) => m.MenusModule),
            },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class UIkitRoutingModule {}
