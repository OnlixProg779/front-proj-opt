import { Injectable, HostListener, Inject } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { WINDOW } from "./windows.service";
// Menu
export interface Menu {
	path?: string;
	title?: string;
	icon?: string;
	type?: string;
	badgeType?: string;
	badgeValue?: string;
	active?: boolean;
	bookmark?: boolean;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService {

	public screenWidth: any
	public collapseSidebar: boolean = false

	constructor(@Inject(WINDOW) private window) {
		this.onResize();
		if (this.screenWidth < 991) {
			this.collapseSidebar = true
		}
	}

	// Windows width
	@HostListener("window:resize", ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}

	MENUITEMS: Menu[] = [
		{
			path: '/dashboard/default', title: 'Dashboard', icon: 'home', type: 'link', badgeType: 'primary', active: false
		},
		{
			title: 'Clients', icon: 'users', type: 'sub', active: false, children: [
				{ path: '/clients/list-client', title: 'Client List', type: 'link' },
				{ path: '/clients/create-client', title: 'Create Client', type: 'link' },
			]
		},

		
		{
			title: 'Deposits', icon: 'dollar-sign', type: 'sub', active: false, children: [
				{ path: '/deposits/list-deposit', title: 'Deposit Lists', type: 'link' },
				{ path: '/deposits/create-deposit', title: 'Create Deposit', type: 'link' },
				{ path: '/deposits/upload-credmov-import', title: 'Credit Movements Imported', type: 'link' },
			]
		},

		{
			title: 'Settings', icon: 'settings', type: 'sub', children: [
				{ path: '/settings/profile', title: 'Profile', type: 'link' },
				{ path: '/settings/menus', title: 'Menus', type: 'link' },
			]
		},

		{
			title: 'Login',path: '/auth/login', icon: 'log-in', type: 'link', active: false
		}
	]
	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);


}