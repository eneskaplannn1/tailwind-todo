import ListItem from "../templates/ListTemplate";

interface List {
  list: ListItem[];
  load(): void;
  save(): void;
  clearList(): void;
  addItem(itemObj: ListItem): void;
  removeItem(id: string): void;
}

export default class FullList implements List {
  static instance: FullList = new FullList();

  private constructor(private _list: ListItem[] = []) {}

  get list(): ListItem[] {
    return this._list;
  }

  load(): void {
    const storedListItems: null | string = localStorage.getItem("myList");

    if (typeof storedListItems !== "string") return;

    const parsedList: { _id: string; _checked: boolean; _item: string }[] =
      JSON.parse(storedListItems);

    parsedList.forEach((item) => {
      const newListItem = new ListItem(item._id, item._item, item._checked);
      FullList.instance.addItem(newListItem);
    });
  }

  save(): void {
    localStorage.setItem("myList", JSON.stringify(this._list));
  }

  clearList(): void {
    this._list = [];
    this.save();
  }

  addItem(itemObj: ListItem): void {
    this._list.push(itemObj);
    this.save();
  }

  removeItem(id: string): void {
    this._list = this._list.filter((item) => item.id !== id);
    this.save();
  }
}