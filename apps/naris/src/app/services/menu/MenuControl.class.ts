import { EventEmitter } from "@angular/core";
import { IMenuControl } from "./menu.interfaces";

export class MenuControl implements IMenuControl{
    public fire: EventEmitter<Record<string, any>> = new EventEmitter<Record<string, any>>();
    constructor(public title: string, public icon: string, public cb: () => void) {}
}