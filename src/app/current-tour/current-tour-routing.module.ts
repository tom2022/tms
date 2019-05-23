import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CurrentTourPage} from "./current-tour.page";

const routes: Routes = [
    {
        path: 'tabs',
        component: CurrentTourPage,
        children: [
            {
                path: 'current-tour-overview/:tourNumber',
                children: [
                    {
                        path: '',
                        loadChildren: './tour-overview/tour-overview.module#TourOverviewPageModule'
                    }
                ]
            }
        ]
    },
    {
        path: 'receiver-handover/:parcelID/:tourNumber',
        loadChildren: './receiver-handover/receiver-handover.module#ReceiverHandoverPageModule'
    },
    {
        path: 'depot-handover/:depotParcelIDs/:tourNumber',
        loadChildren: './depot-handover/depot-handover.module#DepotHandoverPageModule'
    },
    {
        path: '',
        redirectTo: '/current-tour/tabs/tour-overview/0',
        pathMatch: 'full'
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CurrentTourRoutingModule {

}