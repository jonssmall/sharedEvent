function sharedEventFactory<T>(eventName: string): ISharedEvent<T> {
    const elementList: Element[] = [];
    return {
        subscribe(element: Element, callback: (e: CustomEvent<T>) => void): void {
            element.addEventListener(eventName, (e: Event) => {
                callback(e as CustomEvent<T>);
            });
            elementList.push(element);
        },
        remove(element: Element): void {
            const index = elementList.findIndex((listItem: Element) => listItem === element);
            elementList.splice(index, 1);
        },
        notify(detail: T): void {
            const e = new CustomEvent(eventName, { detail });
            elementList.forEach((element: Element) => {
                element.dispatchEvent(e);
            });
        },
        getListeners(): Element[] {
            return elementList;
        }
    };
}

interface ISharedEvent<T> {
    subscribe: (element: Element, callback: (e: CustomEvent<T>) => void) => void;
    remove: (element: Element) => void;
    notify: (detail: T) => void;
    getListeners: () => Element[];
}

export default {
    sharedEventFactory
}
